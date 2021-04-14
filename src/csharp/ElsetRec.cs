using System;

namespace sgp4
{

/**
 * This class implements the elsetrec data type from Vallado's SGP4 code.
 * 
 * From SGP4.h
 * #define SGP4Version  "SGP4 Version 2016-03-09"
 * 
 * @author aholinch
 *
 */
public class ElsetRec 
{
    public int whichconst = SGP4.wgs72;
    public String satid;
    public int epochyr;
    public int epochtynumrev;
    public int error;
    public char operationmode;
    public char init;
    public char method;    
    public double a;
    public double altp;
    public double alta;
    public double epochdays;
    public double jdsatepoch;
    public double jdsatepochF;
    public double nddot;
    public double ndot;
    public double bstar;
    public double rcse;
    public double inclo;
    public double nodeo;
    public double ecco;
    public double argpo;
    public double mo;
    public double no_kozai;
    
    // sgp4fix add new variables from tle
    public char classification;
    public String intldesg;
    public int ephtype;
    public long elnum;
    public long revnum;
    
    // sgp4fix add unkozai'd variable
    public double no_unkozai;
    
    // sgp4fix add singly averaged variables
    public double am;
    public double em;
    public double im;
    public double Om;
    public double om;
    public double mm;
    public double nm;
    public double t;
    
    // sgp4fix add constant parameters to eliminate mutliple calls during execution
    public double tumin;
    public double mu;
    public double radiusearthkm;
    public double xke; 
    public double j2;
    public double j3;
    public double j4;
    public double j3oj2;
    
    //       Additional elements to capture relevant TLE and object information:       
    public long dia_mm; // RSO dia in mm
    public double period_sec; // Period in seconds
    public char active; // "Active S/C" flag (0=n, 1=y) 
    public char not_orbital; // "Orbiting S/C" flag (0=n, 1=y)  
    public double rcs_m2; // "RCS (m^2)" storage  

    // temporary variables because the original authors call the same method with different variables
    public double ep;
    public double inclp;
    public double nodep;
    public double argpp;
    public double mp;


    public int isimp;
    public double aycof;
    public double con41;
    public double cc1;
    public double cc4;
    public double cc5;
    public double d2;
    public double d3;
    public double d4;
    public double delmo;
    public double eta;
    public double argpdot;
    public double omgcof;
    public double sinmao;
    public double t2cof;
    public double t3cof;
    public double t4cof;
    public double t5cof;
    public double x1mth2;
    public double x7thm1;
    public double mdot;
    public double nodedot;
    public double xlcof;
    public double xmcof;
    public double nodecf;

    // deep space
    public int irez;
    public double d2201;
    public double d2211;
    public double d3210;
    public double d3222;
    public double d4410;
    public double d4422;
    public double d5220;
    public double d5232;
    public double d5421;
    public double d5433;
    public double dedt;
    public double del1;
    public double del2;
    public double del3;
    public double didt;
    public double dmdt;
    public double dnodt;
    public double domdt;
    public double e3;
    public double ee2;
    public double peo;
    public double pgho;
    public double pho;
    public double pinco;
    public double plo;
    public double se2;
    public double se3;
    public double sgh2;
    public double sgh3;
    public double sgh4;
    public double sh2;
    public double sh3;
    public double si2;
    public double si3;
    public double sl2;
    public double sl3;
    public double sl4;
    public double gsto;
    public double xfact;
    public double xgh2;
    public double xgh3;
    public double xgh4;
    public double xh2;
    public double xh3;
    public double xi2;
    public double xi3;
    public double xl2;
    public double xl3;
    public double xl4;
    public double xlamo;
    public double zmol;
    public double zmos;
    public double atime;
    public double xli;
    public double xni;
    public double snodm;
    public double cnodm;
    public double sinim;
    public double cosim;
    public double sinomm;
    public double cosomm;
    public double day;
    public double emsq;
    public double gam;
    public double rtemsq; 
    public double s1;
    public double s2;
    public double s3;
    public double s4;
    public double s5;
    public double s6;
    public double s7; 
    public double ss1;
    public double ss2;
    public double ss3;
    public double ss4;
    public double ss5;
    public double ss6;
    public double ss7;
    public double sz1;
    public double sz2;
    public double sz3;
    public double sz11;
    public double sz12;
    public double sz13;
    public double sz21;
    public double sz22;
    public double sz23;
    public double sz31;
    public double sz32;
    public double sz33;
    public double z1;
    public double z2;
    public double z3;
    public double z11;
    public double z12;
    public double z13;
    public double z21;
    public double z22;
    public double z23;
    public double z31;
    public double z32;
    public double z33;
    public double argpm;
    public double inclm;
    public double nodem;
    public double dndt;
    public double eccsq;
        
    // for initl
    public double ainv;
    public double ao;
    public double con42;
    public double cosio;
    public double cosio2;
    public double omeosq;
    public double posq;
    public double rp;
    public double rteosq;
    public double sinio;
}
}
