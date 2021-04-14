using System;
using System.Globalization;

namespace sgp4
{


/**
 * This class knows how to parse two line element sets and access the individual elements.
 * 
 * @author aholinch
 *
 */
public class TLE 
{
    protected ElsetRec rec = null;
    
    protected String line1 = null;
    protected String line2 = null;
    
    protected String intlid = null;
    protected String objectID = null;
    protected DateTime epoch;
    protected double ndot = 0;
    protected double nddot = 0;
    protected double bstar = 0;
    protected int elnum = 0;
    protected double incDeg = 0;
    protected double raanDeg = 0;
    protected double ecc = 0;
    protected double argpDeg = 0;
    protected double maDeg = 0;
    protected double n = 0;
    protected int revnum = 0;
    
    protected String parseErrors = null;
    
    protected int sgp4Error = 0;
    
    public TLE()
    {
        
    }
    
    public TLE(String line1, String line2)
    {
        parseLines(line1,line2);
    }

    public double[][] getRV(DateTime d)
    {
        double t = d.Ticks;
        t -= epoch.Ticks;
        t/=(60000.0*10000.0);
        
        return getRV(t);
    }

    public double[][] getRV(double minutesAfterEpoch)
    {
        double []r = new double[3];
        double []v = new double[3];
        
        rec.error = 0;
        SGP4.sgp4(rec, minutesAfterEpoch, r, v);
        sgp4Error = rec.error;
        double [][] outv = new double[2][];
        outv[0]=r;
        outv[1]=v;
        return outv;
    }
    
    public int getSgp4Error()
    {
        return sgp4Error;
    }
    
    public ElsetRec getElsetRec()
    {
        return rec;
    }
    
    public void setElsetRec(ElsetRec er)
    {
        rec = er;
    }
    
    public String getParseErrors()
    {
        return parseErrors;
    }
    
    public String getIntlID()
    {
        return intlid;
    }
    
    public void setIntlID(String id)
    {
        intlid = id;
    }
    
    public String getObjectID()
    {
        return objectID;
    }
    
    public void setObjectID(String id)
    {
        objectID = id;
    }
    
    public DateTime getEpoch()
    {
        return epoch;
    }
    
    public void setEpoch(DateTime d)
    {
        epoch = d;
    }
    
    public double getNDot()
    {
        return ndot;
    }
    
    public void setNDot(double val)
    {
        ndot = val;
    }
    
    public double getNDDot()
    {
        return nddot;
    }
    
    public void setNDDot(double val)
    {
        nddot = val;
    }
    
    public double getBstar()
    {
        return bstar;
    }
    
    public void setBstar(double val)
    {
        bstar = val;
    }
    
    public int getElNum()
    {
        return elnum;
    }
    
    public void setElNum(int num)
    {
        elnum = num;
    }
    
    public double getIncDeg()
    {
        return incDeg;
    }
    
    public void setIncDeg(double val)
    {
        incDeg = val;
    }
    
    public double getRaanDeg()
    {
        return raanDeg;
    }
    
    public void setRaanDeg(double val)
    {
        raanDeg = val;
    }
    
    public double getEcc()
    {
        return ecc;
    }
    
    public void setEcc(double val)
    {
        ecc = val;
    }
    
    public double getArgpDeg()
    {
        return argpDeg;
    }
    
    public void setArgpDeg(double val)
    {
        argpDeg = val;
    }
    
    public double getMaDeg()
    {
        return maDeg;
    }
    
    public void setMaDeg(double val)
    {
        maDeg = val;
    }
    
    public double getN()
    {
        return n;
    }
    
    public void setN(double val)
    {
        n = val;
    }
    
    public int getRevNum()
    {
        return revnum;
    }
    
    public void setRevNum(int val)
    {
        revnum = val;
    }
    
    public String getLine1()
    {
        return line1;
    }
    
    public String getLine2()
    {
        return line2;
    }
    
    /**
     * Parses the two lines optimistically.  No exceptions are thrown but some parse errors will
     * be accumulated as a string.  Call getParseErrors() to see if there are any.
     * 
     * @param line1
     * @param line2
     */
    public void parseLines(String line1, String line2)
    {
        parseErrors = null;
        rec = new ElsetRec();

        this.line1 = line1;
        this.line2 = line2;
        
        if(line1 == null || line1.Trim().Length<68) // we can live without checksum
        {
            addParseError("line1 too short");
        }
        
        if(line2 == null || line2.Trim().Length<68) // we can live without checksum
        {
            addParseError("line2 too short");
        }
        
        if(parseErrors != null) return;
        

        
        //objectNum = (int)gd(line1,2,7);
        //if(objectNum != (int)gd(line2,2,7))addParseError("ids don't match");
        objectID = line1.Substring(2,5).Trim();
        
        rec.classification = line1[7];
           //          1         2         3         4         5         6
           //0123456789012345678901234567890123456789012345678901234567890123456789
    //line1="1 00005U 58002B   00179.78495062  .00000023  00000-0  28098-4 0  4753";
    //line2="2 00005  34.2682 348.7242 1859667 331.7664  19.3264 10.82419157413667";

        intlid = line1.Substring(9, 17-9).Trim();
        epoch = parseEpoch(line1.Substring(18,32-18).Trim());
        ndot = gdi(line1[33],line1,35,44);
        nddot = gdi(line1[44],line1,45,50);
        nddot *= Math.Pow(10.0, gd(line1,50,52));
        bstar = gdi(line1[53],line1,54,59);
        bstar *= Math.Pow(10.0d, gd(line1,59,61));
        
        elnum = (int)gd(line1,64,68);
        
        incDeg = gd(line2,8,16);
        raanDeg = gd(line2,17,25);
        ecc = gdi('+',line2,26,33);
        argpDeg = gd(line2,34,42);
        maDeg = gd(line2,43,51);
        
        n = gd(line2,52,63);
        
        revnum = (int)gd(line2,63,68);
        
        setValsToRec();
    }
    
    /**
     * Set the values to the ElsetRec object.
     */
    protected void setValsToRec()
    {
        double deg2rad = Math.PI / 180.0;          //   0.0174532925199433
        double xpdotp = 1440.0 / (2.0 * Math.PI);  // 229.1831180523293

        rec.elnum = elnum;
        rec.revnum = revnum;
        rec.satid = objectID;
        rec.bstar = bstar;
        rec.inclo = incDeg*deg2rad;
        rec.nodeo = raanDeg*deg2rad;
        rec.argpo = argpDeg*deg2rad;
        rec.mo = maDeg*deg2rad;
        rec.ecco = ecc;
        rec.no_kozai = n/xpdotp;
        rec.ndot = ndot / (xpdotp*1440.0d);
        rec.nddot = nddot / (xpdotp*1440.0d*1440.0d);
        
        SGP4.sgp4init('a', rec);
    }
    
    /**
     * Parse the tle epoch format to a date.  
     * 
     * @param str
     * @return
     */
    protected DateTime parseEpoch(String str)
    {
        int year = (int)Double.Parse(str.Substring(0,2).Trim());
        
        rec.epochyr=year;
        if(year > 56)
        {
            year += 1900;
        }
        else
        {
            year += 2000;
        }
        
        int doy = (int)Double.Parse(str.Substring(2,5-2).Trim());
        double dfrac = Double.Parse("0"+str.Substring(5).Trim(),CultureInfo.InvariantCulture);
        
        rec.epochdays = doy;
        rec.epochdays += dfrac;
        
        
        dfrac *= 24.0d;
        int hr = (int)dfrac;
        dfrac = 60.0d*(dfrac - hr);
        int mn = (int)dfrac;
        dfrac = 60.0d*(dfrac - mn);
        int sc = (int)dfrac;
        

        
        dfrac = 1000.0d*(dfrac-sc);
        int milli = (int)dfrac;
        
        /* 
        gc.set(Calendar.YEAR, year);
        gc.set(Calendar.DAY_OF_YEAR, doy);
        gc.set(Calendar.HOUR_OF_DAY, hr);
        gc.set(Calendar.MINUTE, mn);
        gc.set(Calendar.SECOND, sc);
        gc.set(Calendar.MILLISECOND, milli);
        */
        DateTime mepoch = new DateTime(year,1,1);
        mepoch = mepoch.AddDays(doy-1);
        mepoch = mepoch.AddHours(hr);
        mepoch = mepoch.AddMinutes(mn);
        mepoch = mepoch.AddSeconds(sc);
        mepoch = mepoch.AddMilliseconds(dfrac);

        // Specify that this is UTC
        mepoch = DateTime.SpecifyKind(mepoch,DateTimeKind.Utc);

        double sec = ((double)sc)+dfrac/1000.0d;
        int mon = mepoch.Month;
        int day = mepoch.Day;
        double []jd = SGP4.jday(year, mon, day, hr, mn, sec);
        rec.jdsatepoch = jd[0];
        rec.jdsatepochF = jd[1];


        return mepoch;
    }
    
    protected void addParseError(String err)
    {
        if(parseErrors == null || parseErrors.Trim().Length == 0)
        {
            parseErrors = err;
        }
        else
        {
            parseErrors = parseErrors+"; "+err;
        }
    }
    
    /**
     * parse a double from the substring.
     * 
     * @param str
     * @param start
     * @param end
     * @return
     */
    protected double gd(String str, int start, int end)
    {
        return gd(str,start,end,0);
    }
    
    /**
     * parse a double from the substring.
     * 
     * @param str
     * @param start
     * @param end
     * @param defVal
     * @return
     */
    protected double gd(String str, int start, int end, double defVal)
    {
        double num = defVal;
        try{num = Double.Parse(str.Substring(start,end-start).Trim(),CultureInfo.InvariantCulture);}catch(Exception ex){}
        return num;
    }
    
    /**
     * parse a double from the substring after adding an implied decimal point.
     * 
     * @param str
     * @param start
     * @param end
     * @return
     */
    protected double gdi(char sign, String str, int start, int end)
    {
        return gdi(sign,str,start,end,0);
    }
    
    /**
     * parse a double from the substring after adding an implied decimal point.
     * 
     * @param str
     * @param start
     * @param end
     * @param defVal
     * @return
     */
    protected double gdi(char sign, String str, int start, int end, double defVal)
    {
        double num = defVal;
        try{num = Double.Parse("0."+str.Substring(start,end-start).Trim(),CultureInfo.InvariantCulture);}catch(Exception ex){}
        if(sign == '-') num *= -1.0d;
        return num;
    }

}

}
