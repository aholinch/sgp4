using System;
using System.Collections.Generic;
using System.Globalization;

namespace sgp4
{
    class Program
    {

    public class VERIN
    {
        public String line1;
        public String line2;
        public double startMin;
        public double stopMin;
        public double stepMin;
        
        public VERIN()
        {
            
        }
        
        public VERIN(String l1, String l2)
        {
            line1 = l1;
            setLine2(l2);
        }
        
        public void setLine2(String l)
        {
            if(l.Length>69)
            {
                line2 = l.Substring(0, 69);
                l = l.Substring(69).Trim();
                while(l.Contains("  "))
                {
                    l = l.Replace("  ", " ");
                }
                
                String []sa = l.Split(" ");
                if(sa.Length>2)
                {
                    startMin = Double.Parse(sa[0].Trim(),CultureInfo.InvariantCulture);
                    stopMin = Double.Parse(sa[1].Trim(),CultureInfo.InvariantCulture);
                    stepMin = Double.Parse(sa[2].Trim(),CultureInfo.InvariantCulture);
                }
            }
        }
        
        public String getLine1()
        {
            return line1;
        }
        
        public String getLine2()
        {
            return line2;
        }
        
        public double getStartMin()
        {
            return startMin;
        }
        
        public double getStopMin()
        {
            return stopMin;
        }
        
        public double getStepMin()
        {
            return stepMin;
        }
    }
    
    public class VEROUT
    {
        public int id;
        public List<VEROUTEntry> entries = null;
        
        public VEROUT()
        {
            
        }
        
        public int getId()
        {
            return id;
        }
        
        public List<VEROUTEntry> getEntries()
        {
            return entries;
        }
    }
    
    public  class VEROUTEntry
    {
        public double minutesSinceEpoch;
        public int error;
        public double []r;
        public double []v;
        
        public double getMinutesSinceEpoch()
        {
            return minutesSinceEpoch;
        }
        
        public int getError()
        {
            return error;
        }
        
        public double[] getR()
        {
            return r;
        }
        
        public double[] getV()
        {
            return v;
        }
        
        public double calcRDist(double []r2)
        {
            return dist(r,r2);
        }
        
        public double calcVDist(double []v2)
        {
            return dist(v,v2);
        }
        
        public double dist(double []v1, double []v2)
        {
            double dist = 0;
            double tmp = 0;
            
            tmp = v1[0]-v2[0];
            dist+=tmp*tmp;
            tmp = v1[1]-v2[1];
            dist+=tmp*tmp;
            tmp = v1[2]-v2[2];
            dist+=tmp*tmp;
            
            return Math.Sqrt(dist);
        }
    }
    
    public static List<VERIN> readVerificationInputs()
    {
        List<VERIN> vers = new List<VERIN>();
        
        String file = null;
        file = "../../data/SGP4-VER.TLE";
        
        System.IO.StreamReader fr = null;
        try
        {
            fr = new System.IO.StreamReader(file);
            
            String line = null;
            
            String line1 = null;
            String line2 = null;
            VERIN v = null;
            
            line = fr.ReadLine();
            while(line != null)
            {
                if(!line.StartsWith("#"))
                {
                    if(line1 == null)
                    {
                        line1 = line;
                    }
                    else
                    {
                        line2 = line;
                        
                        v = new VERIN(line1,line2);
                        vers.Add(v);
                        line1 = null;
                        line2 = null;
                    }
                }
                line = fr.ReadLine();                
            }
        }
        catch(Exception ex)
        {
            Console.WriteLine(ex.ToString()); 
        }
        finally
        {
            if(fr != null)try{fr.Close();}catch(Exception ex){}
        }
        return vers;
    }
    
    public static List<VEROUT> readVerificationOutputs()
    {
        List<VEROUT> outl = new List<VEROUT>();
        
        String file = null;
        file = "../../data/tcppver.out";
        
        System.IO.StreamReader fr = null;
        try
        {
            fr = new System.IO.StreamReader(file);
            
            String line = null;
            
            List<VEROUTEntry> entries = null;
            VEROUT v = null;
            VEROUTEntry ve = null;
            
            int id = 0;
            String []sa = null;
            double x = 0;
            double y = 0;
            double z = 0;
            
            line = fr.ReadLine();
            while(line != null)
            {
                line = line.Trim();
                if(line.Contains("xx"))
                {
                    sa = line.Split(" ");
                    id = (int)Double.Parse(sa[0]);
                    v = new VEROUT();
                    v.id = id;
                    entries = new List<VEROUTEntry>();
                    v.entries = entries;
                    outl.Add(v);
                }
                else
                {
                    while(line.Contains("  "))
                    {
                        line = line.Replace("  ", " ");
                    }
                    
                    // add it
                    ve = new VEROUTEntry();
                    sa = line.Split(" "); 
                    ve.minutesSinceEpoch = Double.Parse(sa[0],CultureInfo.InvariantCulture);
                    x = Double.Parse(sa[1],CultureInfo.InvariantCulture);
                    y = Double.Parse(sa[2],CultureInfo.InvariantCulture);
                    z = Double.Parse(sa[3],CultureInfo.InvariantCulture);
                    ve.r = new double[]{x,y,z};
                    x = Double.Parse(sa[4],CultureInfo.InvariantCulture);
                    y = Double.Parse(sa[5],CultureInfo.InvariantCulture);
                    z = Double.Parse(sa[6],CultureInfo.InvariantCulture);
                    ve.v = new double[]{x,y,z};
                    entries.Add(ve);
                }
                line = fr.ReadLine();                
            }
        }
        catch(Exception ex)
        {
            Console.WriteLine(ex.ToString()); 
        }
        finally
        {
            if(fr != null)try{fr.Close();}catch(Exception ex){}
        }
        
        return outl;
    }
    
    public static List<VEROUT> generateVerificationOutputs(List<VERIN> verins)
    {
        List<VEROUT> outl = new List<VEROUT>();
        
        int size = verins.Count;
        VERIN v = null;
        TLE tle = null;
        int id = 0;
        List<VEROUTEntry> entries = null;
        VEROUT vo = null;
        VEROUTEntry ve = null;
        
        double [][]rv = null;
        
        double mins = 0;
        double startmin = 0;
        double stopmin = 0;
        double minstep = 0;
        
        for(int i=0; i<size; i++)
        {
            v = verins[i];
            tle = new TLE(v.line1,v.line2);
            vo = new VEROUT();
            id = tle.getObjectNum();
            vo.id = id;
            entries = new List<VEROUTEntry>();
            vo.entries = entries;
            outl.Add(vo);
            
            mins = 0;
            
            rv = tle.getRV(mins);
            
            startmin = v.startMin;
            stopmin = v.stopMin;
            minstep = v.stepMin;
            
            mins = startmin;
            
            // always do zero
            if(startmin!=0)
            {
                rv = tle.getRV(0);
                ve = new VEROUTEntry();
                ve.r = rv[0];
                ve.v = rv[1];
                ve.minutesSinceEpoch = 0;
                ve.error = tle.getSgp4Error();
                entries.Add(ve);
            }
            
            while(mins <= stopmin)
            {
                rv = tle.getRV(mins);
                ve = new VEROUTEntry();
                ve.r = rv[0];
                ve.v = rv[1];
                ve.minutesSinceEpoch = mins;
                ve.error = tle.getSgp4Error();
                entries.Add(ve);
                                   
                mins+=minstep;
            }
            
            if((mins-minstep)!=stopmin)
            {
                mins = stopmin;
                rv = tle.getRV(mins);
                ve = new VEROUTEntry();
                ve.r = rv[0];
                ve.v = rv[1];
                ve.minutesSinceEpoch = mins;
                ve.error = tle.getSgp4Error();
                entries.Add(ve);
            }
        }
        return outl;        
    }
    
    public static void verify()
    {
        List<VERIN> verins = readVerificationInputs();
        List<VEROUT> lorig = readVerificationOutputs();
        List<VEROUT> lgen = generateVerificationOutputs(verins);
        
        List<VEROUTEntry> lv1 = null;
        List<VEROUTEntry> lv2 = null;

        int size = lorig.Count;
        double rdist = 0;
        double vdist = 0;
        int nv = 0;
        VEROUT v1 = null;
        VEROUT v2 = null;
        VEROUTEntry ve1 = null;
        VEROUTEntry ve2 = null;
        
        double []lastr = null;
        double []lastv = null;
        
        double rerr = 0;
        double verr = 0;
        int cnt = 0;
        for(int i=0; i<size; i++)
        {
            v1 = lorig[i];
            v2 = lgen[i];
            
            lv1 = v1.getEntries();
            lv2 = v2.getEntries();
            
            nv = lv1.Count;
            for(int j=0; j<nv; j++)
            {
                ve1 = lv1[j];
                ve2 = lv2[j];
                
                if(ve2.error == 0)
                {
                    rdist = ve1.calcRDist(ve2.r);
                    vdist = ve1.calcVDist(ve2.v);
                }
                else
                {
                    rdist = ve1.calcRDist(lastr);
                    vdist = ve1.calcVDist(lastv);                    
                }
                
                verr+=vdist;
                rerr+=rdist;
                if(rdist > 1e-7 || vdist > 1e-8)
                {
                    Console.WriteLine(v1.id+"\t"+ve1.minutesSinceEpoch+"\t"+rdist+"\t"+vdist +"\t"+ve2.error);
                }
                
                // the original code didn't reset the r and v vectors on a propagate error
                // so if we have an error, we need to carry forward the previous vectors to match
                // the validation output.  strange.
                lastr = ve2.r;
                lastv = ve2.v;
                cnt++;
            }
        }
        
        rerr/=(double)cnt;
        verr/=(double)cnt;
        Console.WriteLine("Typical errors\tr="+(1e6*rerr)+" mm\tv="+(1e6*verr)+" mm/s");
    }
    
    public static void Main(String []args) 
    {
        verify();
    }

}
}
