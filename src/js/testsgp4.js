
// verinlist and veroutlist are loaded from jsonp files:  sgp4-ver.jsonp and sgp4-ver.out.jsonp

function generateVerificationOutputs(verins)
{
    var size = verins.length;
    var v = null;
    var tle = null;
    
    var out = new Array(size);
    
    var id = null;
    var vo = null;
    var ve = null;
    var entries = null;
    
    var mins = 0;
    
    for(var i=0; i<size; i++)
    {
        v = verins[i];
        tle = new TLE(v.line1,v.line2);
        id = tle.getObjectNum();
        entries = new Array();
        
        vo = new Object();
        vo.id = id;
        vo.entries = entries;
        out[i]=vo;
        
        mins = v.startMin;
        if(mins != 0)
        {
            rv = tle.getRV(0);
            ve = new Object();
            ve.minutesSinceEpoch = 0;
            ve.error = tle.getSgp4Error();
            ve.r = rv[0];
            ve.v = rv[1];
            entries.push(ve);
        }
        
        while(mins <= v.stopMin)
        {
            rv = tle.getRV(mins);
            ve = new Object();
            ve.minutesSinceEpoch = mins;
            ve.error = tle.getSgp4Error();
            ve.r = rv[0];
            ve.v = rv[1];
            entries.push(ve);
            
            mins+=v.stepMin;
        }
        
        if(mins - v.stepMin != v.stopMin) // sometimes not an even number of steps
        {
            mins = v.stopMin;
            rv = tle.getRV(mins);
            ve = new Object();
            ve.minutesSinceEpoch = mins;
            ve.error = tle.getSgp4Error();
            ve.r = rv[0];
            ve.v = rv[1];
            entries.push(ve);            
        }
    }
    
    return out;
}

function dist(v1, v2)
{
    var d = 0;
    var tmp = 0;
    
    tmp = v1[0]-v2[0];
    d+=tmp*tmp;
    tmp = v1[1]-v2[1];
    d+=tmp*tmp;
    tmp = v1[2]-v2[2];
    d+=tmp*tmp;
    
    return Math.sqrt(d);
}

// global variables for error statistics
var verr = 0;
var rerr = 0;

function verify()
{
    console.log("generating verification output");
    var genlist = generateVerificationOutputs(verinlist);
    console.log("comparing to known vectors");
    var size = veroutlist.length;
    
    var vg = null;
    var vr = null;
    
    var rdist = 0;
    var vdist = 0;
    
    var ve1 = null;
    var ve2 = null;
    var e1 = null;
    var e2 = null;
    var nv = 0;
    
    var lastr = 0;
    var lastv = 0;
    
    var cnt = 0;
    
    for(var i=0; i<size; i++)
    {
        vr = veroutlist[i];
        vg = genlist[i];
        
        e1 = vr.entries;
        e2 = vg.entries;
        
        nv = e1.length;
        for(var j=0; j<nv; j++)
        {
            ve1 = e1[j];
            ve2 = e2[j];
            
            if(ve2.error == 0)
            {
                rdist = dist(ve1.r,ve2.r);
                vdist = dist(ve1.v,ve2.v);        
            }
            else
            {
                rdist = dist(ve1.r,lastr);
                vdist = dist(ve1.v,lastv);                
            }
            
            cnt++;
            verr+=vdist;
            rerr+=rdist;
            if(rdist > 1e-7 || vdist > 1e-8)
            {
                console.log(vr.id + "\t" + ve1.minutesSinceEpoch + "\t" + rdist + "\t" + vdist + "\t" + ve2.error);
            }
            
            lastr = ve2.r;
            lastv = ve2.v;
        }
    }   
    
    console.log("Typical errors\tr="+(1e6*rerr)+" mm\tv="+(1e6*verr)+" mm/s");

}


verify();
