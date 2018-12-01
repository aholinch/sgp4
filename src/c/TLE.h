#ifndef __sgp4tleheader__
#define __sgp4tleheader__  

#include "SGP4.h"


typedef struct TLE {
    ElsetRec rec;
    char line1[70];
    char line2[70];
    char intlid[12];
    int objectNum;
    long epoch;
    double ndot;
    double nddot;
    double bstar;
    int elnum;
    double incDeg;
    double raanDeg;
    double ecc;
    double argpDeg;
    double maDeg;
    double n;
    int revnum;
    int sgp4Error;
} TLE;

void parseLines(TLE *tle, char *line1, char *line2);

long parseEpoch(ElsetRec *rec, char *str);

void getRVForDate(TLE *tle, long millisSince1970, double r[3], double v[3]);

void getRV(TLE *tle, double minutesAfterEpoch, double r[3], double v[3]);

#endif
