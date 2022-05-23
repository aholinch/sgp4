#include <stdio.h>
#include <math.h>
#include <string.h>
#include <stdlib.h>
#include "TLE.h"
#include "SGP4.h"

// parse the double
static double gd(char *str, int ind1, int ind2);

// parse the double with implied decimal
static double gdi(char *str, int ind1, int ind2);

static void setValsToRec(TLE *tle, ElsetRec *rec);

void parseLines(TLE *tle, char *line1, char *line2)
{
    int i=0;
    tle->rec.whichconst=wgs72;
    // copy the lines
    strncpy(tle->line1,line1,69);
    strncpy(tle->line2,line2,69);
    tle->line1[69]=0;
    tle->line2[69]=0;

           //          1         2         3         4         5         6
               //0123456789012345678901234567890123456789012345678901234567890123456789
    //line1="1 00005U 58002B   00179.78495062  .00000023  00000-0  28098-4 0  4753";
    //line2="2 00005  34.2682 348.7242 1859667 331.7664  19.3264 10.82419157413667";

    // intlid
    strncpy(tle->intlid,&line1[9],8);

    tle->rec.classification=line1[7];

    //tle->objectNum = (int)gd(line1,2,7);
    strncpy(tle->objectID,&line1[2],5);
    tle->objectID[5]=0;

    tle->ndot = gdi(line1,35,44);
    if(line1[33]=='-') tle->ndot *= -1.0;

    tle->nddot = gdi(line1,45,50);
    if(line1[44]=='-') tle->nddot *= -1.0;
    tle->nddot *= pow(10.0, gd(line1,50,52));

    tle->bstar = gdi(line1,54,59);
    if(line1[53]=='-') tle->bstar *= -1.0;
    tle->bstar *= pow(10.0, gd(line1,59,61));

    tle->elnum = (int)gd(line1,64,68);

    tle->incDeg = gd(line2,8,16);
    tle->raanDeg = gd(line2,17,25);
    tle->ecc = gdi(line2,26,33);
    tle->argpDeg = gd(line2,34,42);
    tle->maDeg = gd(line2,43,51);
    tle->n = gd(line2,52,63);
    tle->revnum = (int)gd(line2,63,68);

    tle->sgp4Error = 0;

    tle->epoch = parseEpoch(&tle->rec,&line1[18]);

    setValsToRec(tle, &tle->rec);
}

bool isLeap(int year)
{
    if(year % 4 != 0)
    {
        return FALSE;
    }

    if(year % 100 == 0)
    {
        if(year % 400 == 0)
        {
            return TRUE;
        }
        else
        {
            return FALSE;
        }
    }

    return TRUE;
}

long parseEpoch(ElsetRec *rec, char *str)
{
    char tmp[16];
    strncpy(tmp,str,14);
    tmp[15]=0;

    char tmp2[16];
    strncpy(tmp2,tmp,2);
    tmp2[2]=0;

    int year = atoi(tmp2);

    rec->epochyr=year;
    if(year > 56)
    {
        year += 1900;
    }
    else
    {
        year += 2000;
    }

    strncpy(tmp2,&tmp[2],3);
    tmp2[3]=0;

    int doy = atoi(tmp2);

    tmp2[0]='0';
    strncpy(&tmp2[1],&tmp[5],9);
    tmp2[11]=0;
    double dfrac = strtod(tmp2,NULL);
    double odfrac = dfrac;
    rec->epochdays = doy;
    rec->epochdays += dfrac;


    dfrac *= 24.0;
    int hr = (int)dfrac;
    dfrac = 60.0*(dfrac - hr);
    int mn = (int)dfrac;
    dfrac = 60.0*(dfrac - mn);
    int sc = (int)dfrac;



    dfrac = 1000.0*(dfrac-sc);
    int milli = (int)dfrac;

    double sec = ((double)sc)+dfrac/1000.0;

    int mon = 0;
    int day = 0;

    // convert doy to mon, day
    int days[12] = {31,28,31,30,31,30,31,31,30,31,30,31};
    if(isLeap(year)) days[1]=29;

    int ind = 0;
    while(ind < 12 && doy > days[ind])
    {
        doy -= days[ind];
        ind++;
    }
    mon = ind+1;
    day = doy;
    jday(year, mon, day, hr, mn, sec, &rec->jdsatepoch, &rec->jdsatepochF);

    double diff = rec->jdsatepoch - 2440587.5;
    double diff2 = 86400000.0*rec->jdsatepochF;
    diff*=86400000.0;

    long epoch = (long)diff2;
    epoch+=(long)diff;
    return epoch;
}

void getRVForDate(TLE *tle, long millisSince1970, double r[3], double v[3])
{
    double diff = millisSince1970-tle->epoch;
    diff/=60000.0;
    getRV(tle,diff,r,v);
}

void getRV(TLE *tle, double minutesAfterEpoch, double r[3], double v[3])
{
    tle->rec.error = 0;
    sgp4(&tle->rec, minutesAfterEpoch, r, v);
    tle->sgp4Error = tle->rec.error;
}

double gd(char *str, int ind1, int ind2)
{
    double num = 0;
    char tmp[50];
    int cnt = ind2-ind1;
    strncpy(tmp,&str[ind1],cnt);
    tmp[cnt]=0;
    num = strtod(tmp,NULL);
    return num;
}

// parse with an implied decimal place
double gdi(char *str, int ind1, int ind2)
{
    double num = 0;
    char tmp[52];
    tmp[0]='0';
    tmp[1]='.';
    int cnt = ind2-ind1;
    strncpy(&tmp[2],&str[ind1],cnt);
    tmp[2+cnt]=0;
    num = strtod(tmp,NULL);
    return num;
}

void setValsToRec(TLE *tle, ElsetRec *rec)
{
    double xpdotp = 1440.0 / (2.0 * pi);  // 229.1831180523293

    rec->elnum = tle->elnum;
    rec->revnum = tle->revnum;
    strncpy(rec->satid,tle->objectID,5);
    //rec->satnum = tle->objectNum;
    rec->bstar = tle->bstar;
    rec->inclo = tle->incDeg*deg2rad;
    rec->nodeo = tle->raanDeg*deg2rad;
    rec->argpo = tle->argpDeg*deg2rad;
    rec->mo = tle->maDeg*deg2rad;
    rec->ecco = tle->ecc;
    rec->no_kozai = tle->n/xpdotp;
    rec->ndot = tle->ndot / (xpdotp*1440.0);
    rec->nddot = tle->nddot / (xpdotp*1440.0*1440.0);

    sgp4init('a', rec);
}
