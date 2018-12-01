package sgp4;

import java.util.Map;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

public class TestSGP4 
{
    public static class VERIN
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
            if(l.length()>69)
            {
                line2 = l.substring(0, 69);
                l = l.substring(69).trim();
                while(l.contains("  "))
                {
                    l = l.replace("  ", " ");
                }
                
                String sa[] = l.split(" ");
                if(sa.length>2)
                {
                    startMin = Double.parseDouble(sa[0].trim());
                    stopMin = Double.parseDouble(sa[1].trim());
                    stepMin = Double.parseDouble(sa[2].trim());
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
    
    public static class VEROUT
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
    
    public static class VEROUTEntry
    {
        public double minutesSinceEpoch;
        public int error;
        public double r[];
        public double v[];
        
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
        
        public double calcRDist(double r2[])
        {
            return dist(r,r2);
        }
        
        public double calcVDist(double v2[])
        {
            return dist(v,v2);
        }
        
        public double dist(double v1[], double v2[])
        {
            double dist = 0;
            double tmp = 0;
            
            tmp = v1[0]-v2[0];
            dist+=tmp*tmp;
            tmp = v1[1]-v2[1];
            dist+=tmp*tmp;
            tmp = v1[2]-v2[2];
            dist+=tmp*tmp;
            
            return Math.sqrt(dist);
        }
    }
    
    public static List<VERIN> readVerificationInputs()
    {
        java.util.TimeZone.setDefault(java.util.TimeZone.getTimeZone("GMT"));
        
        List<VERIN> vers = new ArrayList<VERIN>();
        
        String file = null;
        file = "../../data/SGP4-VER.TLE";
        
        FileReader fr = null;
        BufferedReader br = null;
        try
        {
            fr = new FileReader(file);
            br = new BufferedReader(fr);
            
            String line = null;
            
            String line1 = null;
            String line2 = null;
            VERIN v = null;
            
            line = br.readLine();
            while(line != null)
            {
                if(!line.startsWith("#"))
                {
                    if(line1 == null)
                    {
                        line1 = line;
                    }
                    else
                    {
                        line2 = line;
                        
                        v = new VERIN(line1,line2);
                        vers.add(v);
                        line1 = null;
                        line2 = null;
                    }
                }
                line = br.readLine();                
            }
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
        }
        finally
        {
            if(fr != null)try{fr.close();}catch(Exception ex){}
            if(br != null)try{br.close();}catch(Exception ex){}
        }
        return vers;
    }
    
    public static List<VEROUT> readVerificationOutputs()
    {
        java.util.TimeZone.setDefault(java.util.TimeZone.getTimeZone("GMT"));
        List<VEROUT> out = new ArrayList<VEROUT>();
        
        String file = null;
        file = "../../data/tcppver.out";
        
        FileReader fr = null;
        BufferedReader br = null;
        try
        {
            fr = new FileReader(file);
            br = new BufferedReader(fr);
            
            String line = null;
            
            List<VEROUTEntry> entries = null;
            VEROUT v = null;
            VEROUTEntry ve = null;
            
            Integer id = null;
            String sa[] = null;
            double x = 0;
            double y = 0;
            double z = 0;
            
            line = br.readLine();
            while(line != null)
            {
                line = line.trim();
                if(line.contains("xx"))
                {
                    sa = line.split(" ");
                    id = Integer.parseInt(sa[0]);
                    v = new VEROUT();
                    v.id = id;
                    entries = new ArrayList<VEROUTEntry>();
                    v.entries = entries;
                    out.add(v);
                }
                else
                {
                    while(line.contains("  "))
                    {
                        line = line.replace("  ", " ");
                    }
                    
                    // add it
                    ve = new VEROUTEntry();
                    sa = line.split(" "); 
                    ve.minutesSinceEpoch = Double.parseDouble(sa[0]);
                    x = Double.parseDouble(sa[1]);
                    y = Double.parseDouble(sa[2]);
                    z = Double.parseDouble(sa[3]);
                    ve.r = new double[]{x,y,z};
                    x = Double.parseDouble(sa[4]);
                    y = Double.parseDouble(sa[5]);
                    z = Double.parseDouble(sa[6]);
                    ve.v = new double[]{x,y,z};
                    entries.add(ve);
                }
                line = br.readLine();                
            }
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
        }
        finally
        {
            if(fr != null)try{fr.close();}catch(Exception ex){}
            if(br != null)try{br.close();}catch(Exception ex){}
        }
        
        return out;
    }
    
    public static List<VEROUT> generateVerificationOutputs(List<VERIN> verins)
    {
        java.util.TimeZone.setDefault(java.util.TimeZone.getTimeZone("GMT"));
        List<VEROUT> out = new ArrayList<VEROUT>();
        
        int size = verins.size();
        VERIN v = null;
        TLE tle = null;
        Integer id = null;
        List<VEROUTEntry> entries = null;
        VEROUT vo = null;
        VEROUTEntry ve = null;
        
        double rv[][] = null;
        
        double mins = 0;
        double startmin = 0;
        double stopmin = 0;
        double minstep = 0;
        
        for(int i=0; i<size; i++)
        {
            v = verins.get(i);
            tle = new TLE(v.line1,v.line2);
            vo = new VEROUT();
            id = tle.getObjectNum();
            vo.id = id;
            entries = new ArrayList<VEROUTEntry>();
            vo.entries = entries;
            out.add(vo);
            
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
                entries.add(ve);
            }
            
            while(mins <= stopmin)
            {
                rv = tle.getRV(mins);
                ve = new VEROUTEntry();
                ve.r = rv[0];
                ve.v = rv[1];
                ve.minutesSinceEpoch = mins;
                ve.error = tle.getSgp4Error();
                entries.add(ve);
                                   
                mins+=minstep;
            }
            
            //System.out.println(id +"\t"+startmin+"\t"+stopmin+"\t"+mins);
            if((mins-minstep)!=stopmin)
            {
                mins = stopmin;
                rv = tle.getRV(mins);
                ve = new VEROUTEntry();
                ve.r = rv[0];
                ve.v = rv[1];
                ve.minutesSinceEpoch = mins;
                ve.error = tle.getSgp4Error();
                entries.add(ve);
            }
        }
        return out;        
    }
    
    public static void verify()
    {
        java.util.TimeZone.setDefault(java.util.TimeZone.getTimeZone("GMT"));
        
        List<VERIN> verins = readVerificationInputs();
        List<VEROUT> lorig = readVerificationOutputs();
        List<VEROUT> lgen = generateVerificationOutputs(verins);
        
        List<VEROUTEntry> lv1 = null;
        List<VEROUTEntry> lv2 = null;

        int size = lorig.size();
        double rdist = 0;
        double vdist = 0;
        int nv = 0;
        VEROUT v1 = null;
        VEROUT v2 = null;
        VEROUTEntry ve1 = null;
        VEROUTEntry ve2 = null;
        
        double lastr[] = null;
        double lastv[] = null;
        
        double rerr = 0;
        double verr = 0;
        int cnt = 0;
        for(int i=0; i<size; i++)
        {
            v1 = lorig.get(i);
            v2 = lgen.get(i);
            
            lv1 = v1.getEntries();
            lv2 = v2.getEntries();
            
            nv = lv1.size();
            for(int j=0; j<nv; j++)
            {
                ve1 = lv1.get(j);
                ve2 = lv2.get(j);
                
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
                    System.out.println(v1.id+"\t"+ve1.minutesSinceEpoch+"\t"+rdist+"\t"+vdist +"\t"+ve2.error);
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
        System.out.println("Typical errors\tr="+(1e6*rerr)+" mm\tv="+(1e6*verr)+" mm/s");
    }
    
    public static void main(String args[]) 
    {
        verify();
        System.exit(0);
    }

}
