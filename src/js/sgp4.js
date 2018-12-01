
const pi = Math.PI;
const twopi = 2.0*Math.PI;
const deg2rad = pi / 180.0;

const wgs72old = 1;
const wgs72 = 2;
const wgs84 = 3;


/**
 * This class implements the elsetrec data type from Vallado's SGP4 code.
 * 
 * From SGP4.h
 * #define SGP4Version  "SGP4 Version 2016-03-09"
 * 
 * @author aholinch
 *
 */
class ElsetRec {
    constructor() {
    this.whichconst = wgs72;
    this.satnum=0;
    this.epochyr=0;
    this.epochtynumrev=0;
    this.error=0;
    this.operationmode=0;
    this.init=0;
    this.method=0;    
    this.a=0;
    this.altp=0;
    this.alta=0;
    this.epochdays=0;
    this.jdsatepoch=0;
    this.jdsatepochF=0;
    this.nddot=0;
    this.ndot=0;
    this.bstar=0;
    this.rcse=0;
    this.inclo=0;
    this.nodeo=0;
    this.ecco=0;
    this.argpo=0;
    this.mo=0;
    this.no_kozai=0;
    
    // sgp4fix add new variables from tle
    this.classification='U';
    this.intldesg="2000-001A";
    this.ephtype=0;
    this.elnum=0;
    this.revnum=0;
    
    // sgp4fix add unkozai'd variable
    this.no_unkozai=0;
    
    // sgp4fix add singly averaged variables
    this.am=0;
    this.em=0;
    this.im=0;
    this.Om=0;
    this.om=0;
    this.mm=0;
    this.nm=0;
    this.t=0;
    
    // sgp4fix add constant parameters to eliminate mutliple calls during execution
    this.tumin=0;
    this.mu=0;
    this.radiusearthkm=0;
    this.xke=0; 
    this.j2=0;
    this.j3=0;
    this.j4=0;
    this.j3oj2=0;
    
    //       Additional elements to capture relevant TLE and object information:       
    this.dia_mm=0; // RSO dia in mm
    this.period_sec=0; // Period in seconds
    this.active=0; // "Active S/C" flag (0=n, 1=y) 
    this.not_orbital=0; // "Orbiting S/C" flag (0=n, 1=y)  
    this.rcs_m2=0; // "RCS (m^2)" storage  

    // temporary variables because the original authors call the same method with different variables
    this.ep=0;
    this.inclp=0;
    this.nodep=0;
    this.argpp=0;
    this.mp=0;


    this.isimp=0;
    this.aycof=0;
    this.con41=0;
    this.cc1=0;
    this.cc4=0;
    this.cc5=0;
    this.d2=0;
    this.d3=0;
    this.d4=0;
    this.delmo=0;
    this.eta=0;
    this.argpdot=0;
    this.omgcof=0;
    this.sinmao=0;
    this.t2cof=0;
    this.t3cof=0;
    this.t4cof=0;
    this.t5cof=0;
    this.x1mth2=0;
    this.x7thm1=0;
    this.mdot=0;
    this.nodedot=0;
    this.xlcof=0;
    this.xmcof=0;
    this.nodecf=0;

    // deep space
    this.irez=0;
    this.d2201=0;
    this.d2211=0;
    this.d3210=0;
    this.d3222=0;
    this.d4410=0;
    this.d4422=0;
    this.d5220=0;
    this.d5232=0;
    this.d5421=0;
    this.d5433=0;
    this.dedt=0;
    this.del1=0;
    this.del2=0;
    this.del3=0;
    this.didt=0;
    this.dmdt=0;
    this.dnodt=0;
    this.domdt=0;
    this.e3=0;
    this.ee2=0;
    this.peo=0;
    this.pgho=0;
    this.pho=0;
    this.pinco=0;
    this.plo=0;
    this.se2=0;
    this.se3=0;
    this.sgh2=0;
    this.sgh3=0;
    this.sgh4=0;
    this.sh2=0;
    this.sh3=0;
    this.si2=0;
    this.si3=0;
    this.sl2=0;
    this.sl3=0;
    this.sl4=0;
    this.gsto=0;
    this.xfact=0;
    this.xgh2=0;
    this.xgh3=0;
    this.xgh4=0;
    this.xh2=0;
    this.xh3=0;
    this.xi2=0;
    this.xi3=0;
    this.xl2=0;
    this.xl3=0;
    this.xl4=0;
    this.xlamo=0;
    this.zmol=0;
    this.zmos=0;
    this.atime=0;
    this.xli=0;
    this.xni=0;
    this.snodm=0;
    this.cnodm=0;
    this.sinim=0;
    this.cosim=0;
    this.sinomm=0;
    this.cosomm=0;
    this.day=0;
    this.emsq=0;
    this.gam=0;
    this.rtemsq=0; 
    this.s1=0;
    this.s2=0;
    this.s3=0;
    this.s4=0;
    this.s5=0;
    this.s6=0;
    this.s7=0; 
    this.ss1=0;
    this.ss2=0;
    this.ss3=0;
    this.ss4=0;
    this.ss5=0;
    this.ss6=0;
    this.ss7=0;
    this.sz1=0;
    this.sz2=0;
    this.sz3=0;
    this.sz11=0;
    this.sz12=0;
    this.sz13=0;
    this.sz21=0;
    this.sz22=0;
    this.sz23=0;
    this.sz31=0;
    this.sz32=0;
    this.sz33=0;
    this.z1=0;
    this.z2=0;
    this.z3=0;
    this.z11=0;
    this.z12=0;
    this.z13=0;
    this.z21=0;
    this.z22=0;
    this.z23=0;
    this.z31=0;
    this.z32=0;
    this.z33=0;
    this.argpm=0;
    this.inclm=0;
    this.nodem=0;
    this.dndt=0;
    this.eccsq=0;
        
    // for initl
    this.ainv=0;
    this.ao=0;
    this.con42=0;
    this.cosio=0;
    this.cosio2=0;
    this.omeosq=0;
    this.posq=0;
    this.rp=0;
    this.rteosq=0;
    this.sinio=0;
    } // end constructor
} // end class ElsetRec


class SGP4{
    constructor(){
    }

    /* -----------------------------------------------------------------------------
    *
    *                           procedure dpper
    *
    *  this procedure provides deep space long period periodic contributions
    *    to the mean elements.  by design, these periodics are zero at epoch.
    *    this used to be dscom which included initialization, but it's really a
    *    recurring function.
    *
    *  author        : david vallado                  719-573-2600   28 jun 2005
    *
    *  inputs        :
    *    e3          -
    *    ee2         -
    *    peo         -
    *    pgho        -
    *    pho         -
    *    pinco       -
    *    plo         -
    *    se2 , se3 , sgh2, sgh3, sgh4, sh2, sh3, si2, si3, sl2, sl3, sl4 -
    *    t           -
    *    xh2, xh3, xi2, xi3, xl2, xl3, xl4 -
    *    zmol        -
    *    zmos        -
    *    ep          - eccentricity                           0.0 - 1.0
    *    inclo       - inclination - needed for lyddane modification
    *    nodep       - right ascension of ascending node
    *    argpp       - argument of perigee
    *    mp          - mean anomaly
    *
    *  outputs       :
    *    ep          - eccentricity                           0.0 - 1.0
    *    inclp       - inclination
    *    nodep        - right ascension of ascending node
    *    argpp       - argument of perigee
    *    mp          - mean anomaly
    *
    *  locals        :
    *    alfdp       -
    *    betdp       -
    *    cosip  , sinip  , cosop  , sinop  ,
    *    dalf        -
    *    dbet        -
    *    dls         -
    *    f2, f3      -
    *    pe          -
    *    pgh         -
    *    ph          -
    *    pinc        -
    *    pl          -
    *    sel   , ses   , sghl  , sghs  , shl   , shs   , sil   , sinzf , sis   ,
    *    sll   , sls
    *    xls         -
    *    xnoh        -
    *    zf          -
    *    zm          -
    *
    *  coupling      :
    *    none.
    *
    *  references    :
    *    hoots, roehrich, norad spacetrack report #3 1980
    *    hoots, norad spacetrack report #6 1986
    *    hoots, schumacher and glover 2004
    *    vallado, crawford, hujsak, kelso  2006
    ----------------------------------------------------------------------------*/

    dpper
        (
        e3, ee2, peo, pgho, pho,
        pinco, plo, se2, se3, sgh2,
        sgh3, sgh4, sh2, sh3, si2,
        si3, sl2, sl3, sl4, t,
        xgh2, xgh3, xgh4, xh2, xh3,
        xi2, xi3, xl2, xl3, xl4,
        zmol, zmos,
        init,
        rec,
        opsmode
        )
    {
        /* --------------------- local variables ------------------------ */
        var alfdp, betdp, cosip, cosop, dalf, dbet, dls,
            f2, f3, pe, pgh, ph, pinc, pl,
            sel, ses, sghl, sghs, shll, shs, sil,
            sinip, sinop, sinzf, sis, sll, sls, xls,
            xnoh, zf, zm, zel, zes, znl, zns;

        
        /* ---------------------- constants ----------------------------- */
        zns = 1.19459e-5;
        zes = 0.01675;
        znl = 1.5835218e-4;
        zel = 0.05490;

        /* --------------- calculate time varying periodics ----------- */
        zm = zmos + zns * t;
        // be sure that the initial call has time set to zero
        if (init == 'y')
            zm = zmos;
        zf = zm + 2.0 * zes * Math.sin(zm);
        sinzf = Math.sin(zf);
        f2 = 0.5 * sinzf * sinzf - 0.25;
        f3 = -0.5 * sinzf * Math.cos(zf);
        ses = se2* f2 + se3 * f3;
        sis = si2 * f2 + si3 * f3;
        sls = sl2 * f2 + sl3 * f3 + sl4 * sinzf;
        sghs = sgh2 * f2 + sgh3 * f3 + sgh4 * sinzf;
        shs = sh2 * f2 + sh3 * f3;
        zm = zmol + znl * t;
        if (init == 'y')
            zm = zmol;
        zf = zm + 2.0 * zel * Math.sin(zm);
        sinzf = Math.sin(zf);
        f2 = 0.5 * sinzf * sinzf - 0.25;
        f3 = -0.5 * sinzf * Math.cos(zf);
        sel = ee2 * f2 + e3 * f3;
        sil = xi2 * f2 + xi3 * f3;
        sll = xl2 * f2 + xl3 * f3 + xl4 * sinzf;
        sghl = xgh2 * f2 + xgh3 * f3 + xgh4 * sinzf;
        shll = xh2 * f2 + xh3 * f3;
        pe = ses + sel;
        pinc = sis + sil;
        pl = sls + sll;
        pgh = sghs + sghl;
        ph = shs + shll;

        if (init == 'n')
        {
            pe = pe - peo;
            pinc = pinc - pinco;
            pl = pl - plo;
            pgh = pgh - pgho;
            ph = ph - pho;
            rec.inclp = rec.inclp + pinc;
            rec.ep = rec.ep + pe;
            sinip = Math.sin(rec.inclp);
            cosip = Math.cos(rec.inclp);

            /* ----------------- apply periodics directly ------------ */
            //  sgp4fix for lyddane choice
            //  strn3 used original inclination - this is technically feasible
            //  gsfc used perturbed inclination - also technically feasible
            //  probably best to readjust the 0.2 limit value and limit discontinuity
            //  0.2 rad = 11.45916 deg
            //  use next line for original strn3 approach and original inclination
            //  if (inclo >= 0.2)
            //  use next line for gsfc version and perturbed inclination
            if (rec.inclp >= 0.2)
            {
                ph = ph / sinip;
                pgh = pgh - cosip * ph;
                rec.argpp = rec.argpp + pgh;
                rec.nodep = rec.nodep + ph;
                rec.mp = rec.mp + pl;
            }
            else
            {
                /* ---- apply periodics with lyddane modification ---- */
                sinop = Math.sin(rec.nodep);
                cosop = Math.cos(rec.nodep);
                alfdp = sinip * sinop;
                betdp = sinip * cosop;
                dalf = ph * cosop + pinc * cosip * sinop;
                dbet = -ph * sinop + pinc * cosip * cosop;
                alfdp = alfdp + dalf;
                betdp = betdp + dbet;
                rec.nodep = this.fmod(rec.nodep, twopi);
                //  sgp4fix for afspc written intrinsic functions
                // nodep used without a trigonometric function ahead
                if ((rec.nodep < 0.0) && (opsmode == 'a'))
                    rec.nodep = rec.nodep + twopi;
                xls = rec.mp + rec.argpp + cosip * rec.nodep;
                dls = pl + pgh - pinc * rec.nodep * sinip;
                xls = xls + dls;
                xls = this.fmod(xls,twopi);
                xnoh = rec.nodep;
                rec.nodep = Math.atan2(alfdp, betdp);
                //  sgp4fix for afspc written intrinsic functions
                // nodep used without a trigonometric function ahead
                if ((rec.nodep < 0.0) && (opsmode == 'a'))
                    rec.nodep = rec.nodep + twopi;
                if (Math.abs(xnoh - rec.nodep) > pi)
                    if (rec.nodep < xnoh)
                        rec.nodep = rec.nodep + twopi;
                    else
                        rec.nodep = rec.nodep - twopi;
                rec.mp = rec.mp + pl;
                rec.argpp = xls - rec.mp - cosip * rec.nodep;
            }
        }   // if init == 'n'

    }  // dpper

    /*-----------------------------------------------------------------------------
    *
    *                           procedure dscom
    *
    *  this procedure provides deep space common items used by both the secular
    *    and periodics subroutines.  input is provided as shown. this routine
    *    used to be called dpper, but the functions inside weren't well organized.
    *
    *  author        : david vallado                  719-573-2600   28 jun 2005
    *
    *  inputs        :
    *    epoch       -
    *    ep          - eccentricity
    *    argpp       - argument of perigee
    *    tc          -
    *    inclp       - inclination
    *    nodep       - right ascension of ascending node
    *    np          - mean motion
    *
    *  outputs       :
    *    sinim  , cosim  , sinomm , cosomm , snodm  , cnodm
    *    day         -
    *    e3          -
    *    ee2         -
    *    em          - eccentricity
    *    emsq        - eccentricity squared
    *    gam         -
    *    peo         -
    *    pgho        -
    *    pho         -
    *    pinco       -
    *    plo         -
    *    rtemsq      -
    *    se2, se3         -
    *    sgh2, sgh3, sgh4        -
    *    sh2, sh3, si2, si3, sl2, sl3, sl4         -
    *    s1, s2, s3, s4, s5, s6, s7          -
    *    ss1, ss2, ss3, ss4, ss5, ss6, ss7, sz1, sz2, sz3         -
    *    sz11, sz12, sz13, sz21, sz22, sz23, sz31, sz32, sz33        -
    *    xgh2, xgh3, xgh4, xh2, xh3, xi2, xi3, xl2, xl3, xl4         -
    *    nm          - mean motion
    *    z1, z2, z3, z11, z12, z13, z21, z22, z23, z31, z32, z33         -
    *    zmol        -
    *    zmos        -
    *
    *  locals        :
    *    a1, a2, a3, a4, a5, a6, a7, a8, a9, a10         -
    *    betasq      -
    *    cc          -
    *    ctem, stem        -
    *    x1, x2, x3, x4, x5, x6, x7, x8          -
    *    xnodce      -
    *    xnoi        -
    *    zcosg  , zsing  , zcosgl , zsingl , zcosh  , zsinh  , zcoshl , zsinhl ,
    *    zcosi  , zsini  , zcosil , zsinil ,
    *    zx          -
    *    zy          -
    *
    *  coupling      :
    *    none.
    *
    *  references    :
    *    hoots, roehrich, norad spacetrack report #3 1980
    *    hoots, norad spacetrack report #6 1986
    *    hoots, schumacher and glover 2004
    *    vallado, crawford, hujsak, kelso  2006
    ----------------------------------------------------------------------------*/

    dscom
        (
        epoch, ep, argpp, tc, inclp,
        nodep, np,
        rec
        )
    {
        /* -------------------------- constants ------------------------- */
        const zes = 0.01675;
        const zel = 0.05490;
        const c1ss = 2.9864797e-6;
        const c1l = 4.7968065e-7;
        const zsinis = 0.39785416;
        const zcosis = 0.91744867;
        const zcosgs = 0.1945905;
        const zsings = -0.98088458;

        /* --------------------- local variables ------------------------ */
        var lsflg;
        var a1, a2, a3, a4, a5, a6, a7,
            a8, a9, a10, betasq, cc, ctem, stem,
            x1, x2, x3, x4, x5, x6, x7,
            x8, xnodce, xnoi, zcosg, zcosgl, zcosh, zcoshl,
            zcosi, zcosil, zsing, zsingl, zsinh, zsinhl, zsini,
            zsinil, zx, zy;

        rec.nm = np;
        rec.em = ep;
        rec.snodm = Math.sin(nodep);
        rec.cnodm = Math.cos(nodep);
        rec.sinomm = Math.sin(argpp);
        rec.cosomm = Math.cos(argpp);
        rec.sinim = Math.sin(inclp);
        rec.cosim = Math.cos(inclp);
        rec.emsq = rec.em * rec.em;
        betasq = 1.0 - rec.emsq;
        rec.rtemsq = Math.sqrt(betasq);

        /* ----------------- initialize lunar solar terms --------------- */
        rec.peo = 0.0;
        rec.pinco = 0.0;
        rec.plo = 0.0;
        rec.pgho = 0.0;
        rec.pho = 0.0;
        rec.day = epoch + 18261.5 + tc / 1440.0;
        xnodce = this.fmod(4.5236020 - 9.2422029e-4 * rec.day, twopi);
        stem = Math.sin(xnodce);
        ctem = Math.cos(xnodce);
        zcosil = 0.91375164 - 0.03568096 * ctem;
        zsinil = Math.sqrt(1.0 - zcosil * zcosil);
        zsinhl = 0.089683511 * stem / zsinil;
        zcoshl = Math.sqrt(1.0 - zsinhl * zsinhl);
        rec.gam = 5.8351514 + 0.0019443680 * rec.day;
        zx = 0.39785416 * stem / zsinil;
        zy = zcoshl * ctem + 0.91744867 * zsinhl * stem;
        zx = Math.atan2(zx, zy);
        zx = rec.gam + zx - xnodce;
        zcosgl = Math.cos(zx);
        zsingl = Math.sin(zx);

        /* ------------------------- do solar terms --------------------- */
        zcosg = zcosgs;
        zsing = zsings;
        zcosi = zcosis;
        zsini = zsinis;
        zcosh = rec.cnodm;
        zsinh = rec.snodm;
        cc = c1ss;
        xnoi = 1.0 / rec.nm;

        for (lsflg = 1; lsflg <= 2; lsflg++)
        {
            a1 = zcosg * zcosh + zsing * zcosi * zsinh;
            a3 = -zsing * zcosh + zcosg * zcosi * zsinh;
            a7 = -zcosg * zsinh + zsing * zcosi * zcosh;
            a8 = zsing * zsini;
            a9 = zsing * zsinh + zcosg * zcosi * zcosh;
            a10 = zcosg * zsini;
            a2 = rec.cosim * a7 + rec.sinim * a8;
            a4 = rec.cosim * a9 + rec.sinim * a10;
            a5 = -rec.sinim * a7 + rec.cosim * a8;
            a6 = -rec.sinim * a9 + rec.cosim * a10;

            x1 = a1 * rec.cosomm + a2 * rec.sinomm;
            x2 = a3 * rec.cosomm + a4 * rec.sinomm;
            x3 = -a1 * rec.sinomm + a2 * rec.cosomm;
            x4 = -a3 * rec.sinomm + a4 * rec.cosomm;
            x5 = a5 * rec.sinomm;
            x6 = a6 * rec.sinomm;
            x7 = a5 * rec.cosomm;
            x8 = a6 * rec.cosomm;

            rec.z31 = 12.0 * x1 * x1 - 3.0 * x3 * x3;
            rec.z32 = 24.0 * x1 * x2 - 6.0 * x3 * x4;
            rec.z33 = 12.0 * x2 * x2 - 3.0 * x4 * x4;
            rec.z1 = 3.0 *  (a1 * a1 + a2 * a2) + rec.z31 * rec.emsq;
            rec.z2 = 6.0 *  (a1 * a3 + a2 * a4) + rec.z32 * rec.emsq;
            rec.z3 = 3.0 *  (a3 * a3 + a4 * a4) + rec.z33 * rec.emsq;
            rec.z11 = -6.0 * a1 * a5 + rec.emsq *  (-24.0 * x1 * x7 - 6.0 * x3 * x5);
            rec.z12 = -6.0 *  (a1 * a6 + a3 * a5) + rec.emsq *
                (-24.0 * (x2 * x7 + x1 * x8) - 6.0 * (x3 * x6 + x4 * x5));
            rec.z13 = -6.0 * a3 * a6 + rec.emsq * (-24.0 * x2 * x8 - 6.0 * x4 * x6);
            rec.z21 = 6.0 * a2 * a5 + rec.emsq * (24.0 * x1 * x5 - 6.0 * x3 * x7);
            rec.z22 = 6.0 *  (a4 * a5 + a2 * a6) + rec.emsq *
                (24.0 * (x2 * x5 + x1 * x6) - 6.0 * (x4 * x7 + x3 * x8));
            rec.z23 = 6.0 * a4 * a6 + rec.emsq * (24.0 * x2 * x6 - 6.0 * x4 * x8);
            rec.z1 = rec.z1 + rec.z1 + betasq * rec.z31;
            rec.z2 = rec.z2 + rec.z2 + betasq * rec.z32;
            rec.z3 = rec.z3 + rec.z3 + betasq * rec.z33;
            rec.s3 = cc * xnoi;
            rec.s2 = -0.5 * rec.s3 / rec.rtemsq;
            rec.s4 = rec.s3 * rec.rtemsq;
            rec.s1 = -15.0 * rec.em * rec.s4;
            rec.s5 = x1 * x3 + x2 * x4;
            rec.s6 = x2 * x3 + x1 * x4;
            rec.s7 = x2 * x4 - x1 * x3;

            /* ----------------------- do lunar terms ------------------- */
            if (lsflg == 1)
            {
                rec.ss1 = rec.s1;
                rec.ss2 = rec.s2;
                rec.ss3 = rec.s3;
                rec.ss4 = rec.s4;
                rec.ss5 = rec.s5;
                rec.ss6 = rec.s6;
                rec.ss7 = rec.s7;
                rec.sz1 = rec.z1;
                rec.sz2 = rec.z2;
                rec.sz3 = rec.z3;
                rec.sz11 = rec.z11;
                rec.sz12 = rec.z12;
                rec.sz13 = rec.z13;
                rec.sz21 = rec.z21;
                rec.sz22 = rec.z22;
                rec.sz23 = rec.z23;
                rec.sz31 = rec.z31;
                rec.sz32 = rec.z32;
                rec.sz33 = rec.z33;
                zcosg = zcosgl;
                zsing = zsingl;
                zcosi = zcosil;
                zsini = zsinil;
                zcosh = zcoshl * rec.cnodm + zsinhl * rec.snodm;
                zsinh = rec.snodm * zcoshl - rec.cnodm * zsinhl;
                cc = c1l;
            }
        }

        rec.zmol = this.fmod(4.7199672 + 0.22997150  * rec.day - rec.gam, twopi);
        rec.zmos = this.fmod(6.2565837 + 0.017201977 * rec.day, twopi);

        /* ------------------------ do solar terms ---------------------- */
        rec.se2 = 2.0 * rec.ss1 * rec.ss6;
        rec.se3 = 2.0 * rec.ss1 * rec.ss7;
        rec.si2 = 2.0 * rec.ss2 * rec.sz12;
        rec.si3 = 2.0 * rec.ss2 * (rec.sz13 - rec.sz11);
        rec.sl2 = -2.0 * rec.ss3 * rec.sz2;
        rec.sl3 = -2.0 * rec.ss3 * (rec.sz3 - rec.sz1);
        rec.sl4 = -2.0 * rec.ss3 * (-21.0 - 9.0 * rec.emsq) * zes;
        rec.sgh2 = 2.0 * rec.ss4 * rec.sz32;
        rec.sgh3 = 2.0 * rec.ss4 * (rec.sz33 - rec.sz31);
        rec.sgh4 = -18.0 * rec.ss4 * zes;
        rec.sh2 = -2.0 * rec.ss2 * rec.sz22;
        rec.sh3 = -2.0 * rec.ss2 * (rec.sz23 - rec.sz21);

        /* ------------------------ do lunar terms ---------------------- */
        rec.ee2 = 2.0 * rec.s1 * rec.s6;
        rec.e3 = 2.0 * rec.s1 * rec.s7;
        rec.xi2 = 2.0 * rec.s2 * rec.z12;
        rec.xi3 = 2.0 * rec.s2 * (rec.z13 - rec.z11);
        rec.xl2 = -2.0 * rec.s3 * rec.z2;
        rec.xl3 = -2.0 * rec.s3 * (rec.z3 - rec.z1);
        rec.xl4 = -2.0 * rec.s3 * (-21.0 - 9.0 * rec.emsq) * zel;
        rec.xgh2 = 2.0 * rec.s4 * rec.z32;
        rec.xgh3 = 2.0 * rec.s4 * (rec.z33 - rec.z31);
        rec.xgh4 = -18.0 * rec.s4 * zel;
        rec.xh2 = -2.0 * rec.s2 * rec.z22;
        rec.xh3 = -2.0 * rec.s2 * (rec.z23 - rec.z21);

    }  // dscom

    /*-----------------------------------------------------------------------------
    *
    *                           procedure dsinit
    *
    *  this procedure provides deep space contributions to mean motion dot due
    *    to geopotential resonance with half day and one day orbits.
    *
    *  author        : david vallado                  719-573-2600   28 jun 2005
    *
    *  inputs        :
    *    xke         - reciprocal of tumin
    *    cosim, sinim-
    *    emsq        - eccentricity squared
    *    argpo       - argument of perigee
    *    s1, s2, s3, s4, s5      -
    *    ss1, ss2, ss3, ss4, ss5 -
    *    sz1, sz3, sz11, sz13, sz21, sz23, sz31, sz33 -
    *    t           - time
    *    tc          -
    *    gsto        - greenwich sidereal time                   rad
    *    mo          - mean anomaly
    *    mdot        - mean anomaly dot (rate)
    *    no          - mean motion
    *    nodeo       - right ascension of ascending node
    *    nodedot     - right ascension of ascending node dot (rate)
    *    xpidot      -
    *    z1, z3, z11, z13, z21, z23, z31, z33 -
    *    eccm        - eccentricity
    *    argpm       - argument of perigee
    *    inclm       - inclination
    *    mm          - mean anomaly
    *    xn          - mean motion
    *    nodem       - right ascension of ascending node
    *
    *  outputs       :
    *    em          - eccentricity
    *    argpm       - argument of perigee
    *    inclm       - inclination
    *    mm          - mean anomaly
    *    nm          - mean motion
    *    nodem       - right ascension of ascending node
    *    irez        - flag for resonance           0-none, 1-one day, 2-half day
    *    atime       -
    *    d2201, d2211, d3210, d3222, d4410, d4422, d5220, d5232, d5421, d5433    -
    *    dedt        -
    *    didt        -
    *    dmdt        -
    *    dndt        -
    *    dnodt       -
    *    domdt       -
    *    del1, del2, del3        -
    *    ses  , sghl , sghs , sgs  , shl  , shs  , sis  , sls
    *    theta       -
    *    xfact       -
    *    xlamo       -
    *    xli         -
    *    xni
    *
    *  locals        :
    *    ainv2       -
    *    aonv        -
    *    cosisq      -
    *    eoc         -
    *    f220, f221, f311, f321, f322, f330, f441, f442, f522, f523, f542, f543  -
    *    g200, g201, g211, g300, g310, g322, g410, g422, g520, g521, g532, g533  -
    *    sini2       -
    *    temp        -
    *    temp1       -
    *    theta       -
    *    xno2        -
    *
    *  coupling      :
    *    getgravconst- no longer used
    *
    *  references    :
    *    hoots, roehrich, norad spacetrack report #3 1980
    *    hoots, norad spacetrack report #6 1986
    *    hoots, schumacher and glover 2004
    *    vallado, crawford, hujsak, kelso  2006
    ----------------------------------------------------------------------------*/

    dsinit
        (
        // sgp4fix just send in xke as a constant and eliminate getgravfinal call
        // gravconsttype whichconst, 
                tc, xpidot, rec
        )
    {
        /* --------------------- local variables ------------------------ */

        var ainv2, aonv = 0.0, cosisq, eoc, f220, f221, f311,
            f321, f322, f330, f441, f442, f522, f523,
            f542, f543, g200, g201, g211, g300, g310,
            g322, g410, g422, g520, g521, g532, g533,
            ses, sgs, sghl, sghs, shs, shll, sis,
            sini2, sls, temp, temp1, theta, xno2, q22,
            q31, q33, root22, root44, root54, rptim, root32,
            root52, x2o3, znl, emo, zns, emsqo;

        q22 = 1.7891679e-6;
        q31 = 2.1460748e-6;
        q33 = 2.2123015e-7;
        root22 = 1.7891679e-6;
        root44 = 7.3636953e-9;
        root54 = 2.1765803e-9;
        rptim = 4.37526908801129966e-3; // this equates to 7.29211514668855e-5 rad/sec
        root32 = 3.7393792e-7;
        root52 = 1.1428639e-7;
        x2o3 = 2.0 / 3.0;
        znl = 1.5835218e-4;
        zns = 1.19459e-5;

        // sgp4fix identify constants and allow alternate values
        // just xke is used here so pass it in rather than have multiple calls
        // getgravconst( whichconst, tumin, mu, radiusearthkm, xke, j2, j3, j4, j3oj2 );

        /* -------------------- deep space initialization ------------ */
        rec.irez = 0;
        if ((rec.nm < 0.0052359877) && (rec.nm > 0.0034906585))
            rec.irez = 1;
        if ((rec.nm >= 8.26e-3) && (rec.nm <= 9.24e-3) && (rec.em >= 0.5))
            rec.irez = 2;

        /* ------------------------ do solar terms ------------------- */
        ses = rec.ss1 * zns * rec.ss5;
        sis = rec.ss2 * zns * (rec.sz11 + rec.sz13);
        sls = -zns * rec.ss3 * (rec.sz1 + rec.sz3 - 14.0 - 6.0 * rec.emsq);
        sghs = rec.ss4 * zns * (rec.sz31 + rec.sz33 - 6.0);
        shs = -zns * rec.ss2 * (rec.sz21 + rec.sz23);
        // sgp4fix for 180 deg incl
        if ((rec.inclm < 5.2359877e-2) || (rec.inclm > pi - 5.2359877e-2))
            shs = 0.0;
        if (rec.sinim != 0.0)
            shs = shs / rec.sinim;
        sgs = sghs - rec.cosim * shs;

        /* ------------------------- do lunar terms ------------------ */
        rec.dedt = ses + rec.s1 * znl * rec.s5;
        rec.didt = sis + rec.s2 * znl * (rec.z11 + rec.z13);
        rec.dmdt = sls - znl * rec.s3 * (rec.z1 + rec.z3 - 14.0 - 6.0 * rec.emsq);
        sghl = rec.s4 * znl * (rec.z31 + rec.z33 - 6.0);
        shll = -znl * rec.s2 * (rec.z21 + rec.z23);
        // sgp4fix for 180 deg incl
        if ((rec.inclm < 5.2359877e-2) || (rec.inclm > pi - 5.2359877e-2))
            shll = 0.0;
        rec.domdt = sgs + sghl;
        rec.dnodt = shs;
        if (rec.sinim != 0.0)
        {
            rec.domdt = rec.domdt - rec.cosim / rec.sinim * shll;
            rec.dnodt = rec.dnodt + shll / rec.sinim;
        }

        /* ----------- calculate deep space resonance effects -------- */
        rec.dndt = 0.0;
        theta = this.fmod(rec.gsto + tc * rptim, twopi);
        rec.em = rec.em + rec.dedt * rec.t;
        rec.inclm = rec.inclm + rec.didt * rec.t;
        rec.argpm = rec.argpm + rec.domdt * rec.t;
        rec.nodem = rec.nodem + rec.dnodt * rec.t;
        rec.mm = rec.mm + rec.dmdt * rec.t;
        //   sgp4fix for negative inclinations
        //   the following if statement should be commented out
        //if (inclm < 0.0)
        //  {
        //    inclm  = -inclm;
        //    argpm  = argpm - pi;
        //    nodem = nodem + pi;
        //  }

        /* -------------- initialize the resonance terms ------------- */
        if (rec.irez != 0)
        {
            aonv = Math.pow(rec.nm / rec.xke, x2o3);

            /* ---------- geopotential resonance for 12 hour orbits ------ */
            if (rec.irez == 2)
            {
                cosisq = rec.cosim * rec.cosim;
                emo = rec.em;
                rec.em = rec.ecco;
                emsqo = rec.emsq;
                rec.emsq = rec.eccsq;
                eoc = rec.em * rec.emsq;
                g201 = -0.306 - (rec.em - 0.64) * 0.440;

                if (rec.em <= 0.65)
                {
                    g211 = 3.616 - 13.2470 * rec.em + 16.2900 * rec.emsq;
                    g310 = -19.302 + 117.3900 * rec.em - 228.4190 * rec.emsq + 156.5910 * eoc;
                    g322 = -18.9068 + 109.7927 * rec.em - 214.6334 * rec.emsq + 146.5816 * eoc;
                    g410 = -41.122 + 242.6940 * rec.em - 471.0940 * rec.emsq + 313.9530 * eoc;
                    g422 = -146.407 + 841.8800 * rec.em - 1629.014 * rec.emsq + 1083.4350 * eoc;
                    g520 = -532.114 + 3017.977 * rec.em - 5740.032 * rec.emsq + 3708.2760 * eoc;
                }
                else
                {
                    g211 = -72.099 + 331.819 * rec.em - 508.738 * rec.emsq + 266.724 * eoc;
                    g310 = -346.844 + 1582.851 * rec.em - 2415.925 * rec.emsq + 1246.113 * eoc;
                    g322 = -342.585 + 1554.908 * rec.em - 2366.899 * rec.emsq + 1215.972 * eoc;
                    g410 = -1052.797 + 4758.686 * rec.em - 7193.992 * rec.emsq + 3651.957 * eoc;
                    g422 = -3581.690 + 16178.110 * rec.em - 24462.770 * rec.emsq + 12422.520 * eoc;
                    if (rec.em > 0.715)
                        g520 = -5149.66 + 29936.92 * rec.em - 54087.36 * rec.emsq + 31324.56 * eoc;
                    else
                        g520 = 1464.74 - 4664.75 * rec.em + 3763.64 * rec.emsq;
                }
                if (rec.em < 0.7)
                {
                    g533 = -919.22770 + 4988.6100 * rec.em - 9064.7700 * rec.emsq + 5542.21  * eoc;
                    g521 = -822.71072 + 4568.6173 * rec.em - 8491.4146 * rec.emsq + 5337.524 * eoc;
                    g532 = -853.66600 + 4690.2500 * rec.em - 8624.7700 * rec.emsq + 5341.4  * eoc;
                }
                else
                {
                    g533 = -37995.780 + 161616.52 * rec.em - 229838.20 * rec.emsq + 109377.94 * eoc;
                    g521 = -51752.104 + 218913.95 * rec.em - 309468.16 * rec.emsq + 146349.42 * eoc;
                    g532 = -40023.880 + 170470.89 * rec.em - 242699.48 * rec.emsq + 115605.82 * eoc;
                }

                sini2 = rec.sinim * rec.sinim;
                f220 = 0.75 * (1.0 + 2.0 * rec.cosim + cosisq);
                f221 = 1.5 * sini2;
                f321 = 1.875 * rec.sinim  *  (1.0 - 2.0 * rec.cosim - 3.0 * cosisq);
                f322 = -1.875 * rec.sinim  *  (1.0 + 2.0 * rec.cosim - 3.0 * cosisq);
                f441 = 35.0 * sini2 * f220;
                f442 = 39.3750 * sini2 * sini2;
                f522 = 9.84375 * rec.sinim * (sini2 * (1.0 - 2.0 * rec.cosim - 5.0 * cosisq) +
                    0.33333333 * (-2.0 + 4.0 * rec.cosim + 6.0 * cosisq));
                f523 = rec.sinim * (4.92187512 * sini2 * (-2.0 - 4.0 * rec.cosim +
                    10.0 * cosisq) + 6.56250012 * (1.0 + 2.0 * rec.cosim - 3.0 * cosisq));
                f542 = 29.53125 * rec.sinim * (2.0 - 8.0 * rec.cosim + cosisq *
                    (-12.0 + 8.0 * rec.cosim + 10.0 * cosisq));
                f543 = 29.53125 * rec.sinim * (-2.0 - 8.0 * rec.cosim + cosisq *
                    (12.0 + 8.0 * rec.cosim - 10.0 * cosisq));
                xno2 = rec.nm * rec.nm;
                ainv2 = aonv * aonv;
                temp1 = 3.0 * xno2 * ainv2;
                temp = temp1 * root22;
                rec.d2201 = temp * f220 * g201;
                rec.d2211 = temp * f221 * g211;
                temp1 = temp1 * aonv;
                temp = temp1 * root32;
                rec.d3210 = temp * f321 * g310;
                rec.d3222 = temp * f322 * g322;
                temp1 = temp1 * aonv;
                temp = 2.0 * temp1 * root44;
                rec.d4410 = temp * f441 * g410;
                rec.d4422 = temp * f442 * g422;
                temp1 = temp1 * aonv;
                temp = temp1 * root52;
                rec.d5220 = temp * f522 * g520;
                rec.d5232 = temp * f523 * g532;
                temp = 2.0 * temp1 * root54;
                rec.d5421 = temp * f542 * g521;
                rec.d5433 = temp * f543 * g533;
                rec.xlamo = this.fmod(rec.mo + rec.nodeo + rec.nodeo - theta - theta, twopi);
                rec.xfact = rec.mdot + rec.dmdt + 2.0 * (rec.nodedot + rec.dnodt - rptim) - rec.no_unkozai;
                rec.em = emo;
                rec.emsq = emsqo;
            }

            /* ---------------- synchronous resonance terms -------------- */
            if (rec.irez == 1)
            {
                g200 = 1.0 + rec.emsq * (-2.5 + 0.8125 * rec.emsq);
                g310 = 1.0 + 2.0 * rec.emsq;
                g300 = 1.0 + rec.emsq * (-6.0 + 6.60937 * rec.emsq);
                f220 = 0.75 * (1.0 + rec.cosim) * (1.0 + rec.cosim);
                f311 = 0.9375 * rec.sinim * rec.sinim * (1.0 + 3.0 * rec.cosim) - 0.75 * (1.0 + rec.cosim);
                f330 = 1.0 + rec.cosim;
                f330 = 1.875 * f330 * f330 * f330;
                rec.del1 = 3.0 * rec.nm * rec.nm * aonv * aonv;
                rec.del2 = 2.0 * rec.del1 * f220 * g200 * q22;
                rec.del3 = 3.0 * rec.del1 * f330 * g300 * q33 * aonv;
                rec.del1 = rec.del1 * f311 * g310 * q31 * aonv;
                rec.xlamo = this.fmod(rec.mo + rec.nodeo + rec.argpo - theta, twopi);
                rec.xfact = rec.mdot + xpidot - rptim + rec.dmdt + rec.domdt + rec.dnodt - rec.no_unkozai;
            }

            /* ------------ for sgp4, initialize the integrator ---------- */
            rec.xli = rec.xlamo;
            rec.xni = rec.no_unkozai;
            rec.atime = 0.0;
            rec.nm = rec.no_unkozai + rec.dndt;
        }

    }  // dsinit

    /*-----------------------------------------------------------------------------
    *
    *                           procedure dspace
    *
    *  this procedure provides deep space contributions to mean elements for
    *    perturbing third body.  these effects have been averaged over one
    *    revolution of the sun and moon.  for earth resonance effects, the
    *    effects have been averaged over no revolutions of the satellite.
    *    (mean motion)
    *
    *  author        : david vallado                  719-573-2600   28 jun 2005
    *
    *  inputs        :
    *    d2201, d2211, d3210, d3222, d4410, d4422, d5220, d5232, d5421, d5433 -
    *    dedt        -
    *    del1, del2, del3  -
    *    didt        -
    *    dmdt        -
    *    dnodt       -
    *    domdt       -
    *    irez        - flag for resonance           0-none, 1-one day, 2-half day
    *    argpo       - argument of perigee
    *    argpdot     - argument of perigee dot (rate)
    *    t           - time
    *    tc          -
    *    gsto        - gst
    *    xfact       -
    *    xlamo       -
    *    no          - mean motion
    *    atime       -
    *    em          - eccentricity
    *    ft          -
    *    argpm       - argument of perigee
    *    inclm       - inclination
    *    xli         -
    *    mm          - mean anomaly
    *    xni         - mean motion
    *    nodem       - right ascension of ascending node
    *
    *  outputs       :
    *    atime       -
    *    em          - eccentricity
    *    argpm       - argument of perigee
    *    inclm       - inclination
    *    xli         -
    *    mm          - mean anomaly
    *    xni         -
    *    nodem       - right ascension of ascending node
    *    dndt        -
    *    nm          - mean motion
    *
    *  locals        :
    *    delt        -
    *    ft          -
    *    theta       -
    *    x2li        -
    *    x2omi       -
    *    xl          -
    *    xldot       -
    *    xnddt       -
    *    xndt        -
    *    xomi        -
    *
    *  coupling      :
    *    none        -
    *
    *  references    :
    *    hoots, roehrich, norad spacetrack report #3 1980
    *    hoots, norad spacetrack report #6 1986
    *    hoots, schumacher and glover 2004
    *    vallado, crawford, hujsak, kelso  2006
    ----------------------------------------------------------------------------*/

    dspace(tc, rec)
    {
    
        var iretn;
        var delt, ft, theta, x2li, x2omi, xl, xldot, xnddt, xndt, xomi, g22, g32,
            g44, g52, g54, fasx2, fasx4, fasx6, rptim, step2, stepn, stepp;
        
        xndt = 0;
        xnddt = 0;
        xldot = 0;
        
        fasx2 = 0.13130908;
        fasx4 = 2.8843198;
        fasx6 = 0.37448087;
        g22 = 5.7686396;
        g32 = 0.95240898;
        g44 = 1.8014998;
        g52 = 1.0508330;
        g54 = 4.4108898;
        rptim = 4.37526908801129966e-3; // this equates to 7.29211514668855e-5 rad/sec
        stepp = 720.0;
        stepn = -720.0;
        step2 = 259200.0;

        /* ----------- calculate deep space resonance effects ----------- */
        rec.dndt = 0.0;
        theta = this.fmod(rec.gsto + tc * rptim, twopi);
        rec.em = rec.em + rec.dedt * rec.t;

        rec.inclm = rec.inclm + rec.didt * rec.t;
        rec.argpm = rec.argpm + rec.domdt * rec.t;
        rec.nodem = rec.nodem + rec.dnodt * rec.t;
        rec.mm = rec.mm + rec.dmdt * rec.t;

        //   sgp4fix for negative inclinations
        //   the following if statement should be commented out
        //  if (inclm < 0.0)
        // {
        //    inclm = -inclm;
        //    argpm = argpm - pi;
        //    nodem = nodem + pi;
        //  }

        /* - update resonances : numerical (euler-maclaurin) integration - */
        /* ------------------------- epoch restart ----------------------  */
        //   sgp4fix for propagator problems
        //   the following integration works for negative time steps and periods
        //   the specific changes are unknown because the original code was so convoluted

        // sgp4fix take out atime = 0.0 and fix for faster operation
        ft = 0.0;
        if (rec.irez != 0)
        {
            // sgp4fix streamline check
            if ((rec.atime == 0.0) || (rec.t * rec.atime <= 0.0) || (Math.abs(rec.t) < Math.abs(rec.atime)))
            {
                rec.atime = 0.0;
                rec.xni = rec.no_unkozai;
                rec.xli = rec.xlamo;
            }
            // sgp4fix move check outside loop
            if (rec.t > 0.0)
                delt = stepp;
            else
                delt = stepn;

            iretn = 381; // added for do loop
            while (iretn == 381)
            {
                /* ------------------- dot terms calculated ------------- */
                /* ----------- near - synchronous resonance terms ------- */
                if (rec.irez != 2)
                {
                    xndt = rec.del1 * Math.sin(rec.xli - fasx2) + rec.del2 * Math.sin(2.0 * (rec.xli - fasx4)) +
                            rec.del3 * Math.sin(3.0 * (rec.xli - fasx6));
                    xldot = rec.xni + rec.xfact;
                    xnddt = rec.del1 * Math.cos(rec.xli - fasx2) +
                        2.0 * rec.del2 * Math.cos(2.0 * (rec.xli - fasx4)) +
                        3.0 * rec.del3 * Math.cos(3.0 * (rec.xli - fasx6));
                    xnddt = xnddt * xldot;
                }
                else
                {
                    /* --------- near - half-day resonance terms -------- */
                    xomi = rec.argpo + rec.argpdot * rec.atime;
                    x2omi = xomi + xomi;
                    x2li = rec.xli + rec.xli;
                    xndt = rec.d2201 * Math.sin(x2omi + rec.xli - g22) + rec.d2211 * Math.sin(rec.xli - g22) +
                            rec.d3210 * Math.sin(xomi + rec.xli - g32) + rec.d3222 * Math.sin(-xomi + rec.xli - g32) +
                            rec.d4410 * Math.sin(x2omi + x2li - g44) + rec.d4422 * Math.sin(x2li - g44) +
                            rec.d5220 * Math.sin(xomi + rec.xli - g52) + rec.d5232 * Math.sin(-xomi + rec.xli - g52) +
                            rec.d5421 * Math.sin(xomi + x2li - g54) + rec.d5433 * Math.sin(-xomi + x2li - g54);
                    xldot = rec.xni + rec.xfact;
                    xnddt = rec.d2201 * Math.cos(x2omi + rec.xli - g22) + rec.d2211 * Math.cos(rec.xli - g22) +
                            rec.d3210 * Math.cos(xomi + rec.xli - g32) + rec.d3222 * Math.cos(-xomi + rec.xli - g32) +
                            rec.d5220 * Math.cos(xomi + rec.xli - g52) + rec.d5232 * Math.cos(-xomi + rec.xli - g52) +
                        2.0 * (rec.d4410 * Math.cos(x2omi + x2li - g44) +
                                rec.d4422 * Math.cos(x2li - g44) + rec.d5421 * Math.cos(xomi + x2li - g54) +
                                rec.d5433 * Math.cos(-xomi + x2li - g54));
                    xnddt = xnddt * xldot;
                }

                /* ----------------------- integrator ------------------- */
                // sgp4fix move end checks to end of routine
                if (Math.abs(rec.t - rec.atime) >= stepp)
                {
                    iretn = 381;
                }
                else // exit here
                {
                    ft = rec.t - rec.atime;
                    iretn = 0;
                }

                if (iretn == 381)
                {
                    rec.xli = rec.xli + xldot * delt + xndt * step2;
                    rec.xni = rec.xni + xndt * delt + xnddt * step2;
                    rec.atime = rec.atime + delt;
                }
            }  // while iretn = 381

            
            rec.nm = rec.xni + xndt * ft + xnddt * ft * ft * 0.5;
            xl = rec.xli + xldot * ft + xndt * ft * ft * 0.5;
            if (rec.irez != 1)
            {
                rec.mm = xl - 2.0 * rec.nodem + 2.0 * theta;
                rec.dndt = rec.nm - rec.no_unkozai;
            }
            else
            {
                rec.mm = xl - rec.nodem - rec.argpm + theta;
                rec.dndt = rec.nm - rec.no_unkozai;
            }
            rec.nm = rec.no_unkozai + rec.dndt;
        }

    }  // dsspace

    /*-----------------------------------------------------------------------------
    *
    *                           procedure initl
    *
    *  this procedure initializes the spg4 propagator. all the initialization is
    *    consolidated here instead of having multiple loops inside other routines.
    *
    *  author        : david vallado                  719-573-2600   28 jun 2005
    *
    *  inputs        :
    *    satn        - satellite number - not needed, placed in satrec
    *    xke         - reciprocal of tumin
    *    j2          - j2 zonal harmonic
    *    ecco        - eccentricity                           0.0 - 1.0
    *    epoch       - epoch time in days from jan 0, 1950. 0 hr
    *    inclo       - inclination of satellite
    *    no          - mean motion of satellite
    *
    *  outputs       :
    *    ainv        - 1.0 / a
    *    ao          - semi major axis
    *    con41       -
    *    con42       - 1.0 - 5.0 cos(i)
    *    cosio       - cosine of inclination
    *    cosio2      - cosio squared
    *    eccsq       - eccentricity squared
    *    method      - flag for deep space                    'd', 'n'
    *    omeosq      - 1.0 - ecco * ecco
    *    posq        - semi-parameter squared
    *    rp          - radius of perigee
    *    rteosq      - square root of (1.0 - ecco*ecco)
    *    sinio       - sine of inclination
    *    gsto        - gst at time of observation               rad
    *    no          - mean motion of satellite
    *
    *  locals        :
    *    ak          -
    *    d1          -
    *    del         -
    *    adel        -
    *    po          -
    *
    *  coupling      :
    *    getgravconst- no longer used
    *    gstime      - find greenwich sidereal time from the julian date
    *
    *  references    :
    *    hoots, roehrich, norad spacetrack report #3 1980
    *    hoots, norad spacetrack report #6 1986
    *    hoots, schumacher and glover 2004
    *    vallado, crawford, hujsak, kelso  2006
    ----------------------------------------------------------------------------*/

    initl(epoch, rec)
    {
        /* --------------------- local variables ------------------------ */
        var ak, d1, del, adel, po, x2o3;

        // sgp4fix use old way of finding gst
        var ds70;
        var ts70, tfrac, c1, thgr70, fk5r, c1p2p;
        var gsto1; // used?
        
        /* ----------------------- earth constants ---------------------- */
        // sgp4fix identify constants and allow alternate values
        // only xke and j2 are used here so pass them in directly
        // getgravconst( whichconst, tumin, mu, radiusearthkm, xke, j2, j3, j4, j3oj2 );
        x2o3 = 2.0 / 3.0;

        /* ------------- calculate auxillary epoch quantities ---------- */
        rec.eccsq = rec.ecco * rec.ecco;
        rec.omeosq = 1.0 - rec.eccsq;
        rec.rteosq = Math.sqrt(rec.omeosq);
        rec.cosio = Math.cos(rec.inclo);
        rec.cosio2 = rec.cosio * rec.cosio;

        /* ------------------ un-kozai the mean motion ----------------- */
        ak = Math.pow(rec.xke / rec.no_kozai, x2o3);
        d1 = 0.75 * rec.j2 * (3.0 * rec.cosio2 - 1.0) / (rec.rteosq * rec.omeosq);
        del = d1 / (ak * ak);
        adel = ak * (1.0 - del * del - del *
            (1.0 / 3.0 + 134.0 * del * del / 81.0));
        del = d1 / (adel * adel);
        rec.no_unkozai = rec.no_kozai / (1.0 + del);

        rec.ao = Math.pow(rec.xke / (rec.no_unkozai), x2o3);
        rec.sinio = Math.sin(rec.inclo);
        po = rec.ao * rec.omeosq;
        rec.con42 = 1.0 - 5.0 * rec.cosio2;
        rec.con41 = -rec.con42 - rec.cosio2 - rec.cosio2;
        rec.ainv = 1.0 / rec.ao;
        rec.posq = po * po;
        rec.rp = rec.ao * (1.0 - rec.ecco);
        rec.method = 'n';

        // sgp4fix modern approach to finding sidereal time
        //   if (opsmode == 'a')
        //      {
        // sgp4fix use old way of finding gst
        // count integer number of days from 0 jan 1970
        ts70 = epoch - 7305.0;
        ds70 = Math.floor(ts70 + 1.0e-8);
        tfrac = ts70 - ds70;
        // find greenwich location at epoch
        c1 = 1.72027916940703639e-2;
        thgr70 = 1.7321343856509374;
        fk5r = 5.07551419432269442e-15;
        c1p2p = c1 + twopi;
        gsto1 = this.fmod(thgr70 + c1*ds70 + c1p2p*tfrac + ts70*ts70*fk5r, twopi);
        if (gsto1 < 0.0)
            gsto1 = gsto1 + twopi;
        //    }
        //    else
        rec.gsto = this.gstime(epoch + 2433281.5);

    }  // initl

    /*-----------------------------------------------------------------------------
    *
    *                             procedure sgp4init
    *
    *  this procedure initializes variables for sgp4.
    *
    *  author        : david vallado                  719-573-2600   28 jun 2005
    *
    *  inputs        :
    *    opsmode     - mode of operation afspc or improved 'a', 'i'
    *    whichconst  - which set of constants to use  72, 84
    *    satn        - satellite number
    *    bstar       - sgp4 type drag coefficient              kg/m2er
    *    ecco        - eccentricity
    *    epoch       - epoch time in days from jan 0, 1950. 0 hr
    *    argpo       - argument of perigee (output if ds)
    *    inclo       - inclination
    *    mo          - mean anomaly (output if ds)
    *    no          - mean motion
    *    nodeo       - right ascension of ascending node
    *
    *  outputs       :
    *    satrec      - common values for subsequent calls
    *    return code - non-zero on error.
    *                   1 - mean elements, ecc >= 1.0 or ecc < -0.001 or a < 0.95 er
    *                   2 - mean motion less than 0.0
    *                   3 - pert elements, ecc < 0.0  or  ecc > 1.0
    *                   4 - semi-latus rectum < 0.0
    *                   5 - epoch elements are sub-orbital
    *                   6 - satellite has decayed
    *
    *  locals        :
    *    cnodm  , snodm  , cosim  , sinim  , cosomm , sinomm
    *    cc1sq  , cc2    , cc3
    *    coef   , coef1
    *    cosio4      -
    *    day         -
    *    dndt        -
    *    em          - eccentricity
    *    emsq        - eccentricity squared
    *    eeta        -
    *    etasq       -
    *    gam         -
    *    argpm       - argument of perigee
    *    nodem       -
    *    inclm       - inclination
    *    mm          - mean anomaly
    *    nm          - mean motion
    *    perige      - perigee
    *    pinvsq      -
    *    psisq       -
    *    qzms24      -
    *    rtemsq      -
    *    s1, s2, s3, s4, s5, s6, s7          -
    *    sfour       -
    *    ss1, ss2, ss3, ss4, ss5, ss6, ss7         -
    *    sz1, sz2, sz3
    *    sz11, sz12, sz13, sz21, sz22, sz23, sz31, sz32, sz33        -
    *    tc          -
    *    temp        -
    *    temp1, temp2, temp3       -
    *    tsi         -
    *    xpidot      -
    *    xhdot1      -
    *    z1, z2, z3          -
    *    z11, z12, z13, z21, z22, z23, z31, z32, z33         -
    *
    *  coupling      :
    *    getgravconst-
    *    initl       -
    *    dscom       -
    *    dpper       -
    *    dsinit      -
    *    sgp4        -
    *
    *  references    :
    *    hoots, roehrich, norad spacetrack report #3 1980
    *    hoots, norad spacetrack report #6 1986
    *    hoots, schumacher and glover 2004
    *    vallado, crawford, hujsak, kelso  2006
    ----------------------------------------------------------------------------*/

    sgp4init(opsmode,satrec)
    {
        /* --------------------- local variables ------------------------ */
        var  cc1sq, cc2, cc3, coef, coef1, cosio4,
            eeta, etasq, perige, pinvsq, psisq, qzms24,
            sfour,tc, temp, temp1, temp2, temp3, tsi, xpidot,
            xhdot1,qzms2t, ss, x2o3, r, v,
            delmotemp, qzms2ttemp, qzms24temp;
        
                       
        var epoch = (satrec.jdsatepoch + satrec.jdsatepochF) - 2433281.5;
        
        /* ------------------------ initialization --------------------- */
        // sgp4fix divisor for divide by zero check on inclination
        // the old check used 1.0 + cos(pi-1.0e-9), but then compared it to
        // 1.5 e-12, so the threshold was changed to 1.5e-12 for consistency
        var temp4 = 1.5e-12;

        /* ----------- set all near earth variables to zero ------------ */
        satrec.isimp = 0;   satrec.method = 'n'; satrec.aycof = 0.0;
        satrec.con41 = 0.0; satrec.cc1 = 0.0; satrec.cc4 = 0.0;
        satrec.cc5 = 0.0; satrec.d2 = 0.0; satrec.d3 = 0.0;
        satrec.d4 = 0.0; satrec.delmo = 0.0; satrec.eta = 0.0;
        satrec.argpdot = 0.0; satrec.omgcof = 0.0; satrec.sinmao = 0.0;
        satrec.t = 0.0; satrec.t2cof = 0.0; satrec.t3cof = 0.0;
        satrec.t4cof = 0.0; satrec.t5cof = 0.0; satrec.x1mth2 = 0.0;
        satrec.x7thm1 = 0.0; satrec.mdot = 0.0; satrec.nodedot = 0.0;
        satrec.xlcof = 0.0; satrec.xmcof = 0.0; satrec.nodecf = 0.0;

        /* ----------- set all deep space variables to zero ------------ */
        satrec.irez = 0;   satrec.d2201 = 0.0; satrec.d2211 = 0.0;
        satrec.d3210 = 0.0; satrec.d3222 = 0.0; satrec.d4410 = 0.0;
        satrec.d4422 = 0.0; satrec.d5220 = 0.0; satrec.d5232 = 0.0;
        satrec.d5421 = 0.0; satrec.d5433 = 0.0; satrec.dedt = 0.0;
        satrec.del1 = 0.0; satrec.del2 = 0.0; satrec.del3 = 0.0;
        satrec.didt = 0.0; satrec.dmdt = 0.0; satrec.dnodt = 0.0;
        satrec.domdt = 0.0; satrec.e3 = 0.0; satrec.ee2 = 0.0;
        satrec.peo = 0.0; satrec.pgho = 0.0; satrec.pho = 0.0;
        satrec.pinco = 0.0; satrec.plo = 0.0; satrec.se2 = 0.0;
        satrec.se3 = 0.0; satrec.sgh2 = 0.0; satrec.sgh3 = 0.0;
        satrec.sgh4 = 0.0; satrec.sh2 = 0.0; satrec.sh3 = 0.0;
        satrec.si2 = 0.0; satrec.si3 = 0.0; satrec.sl2 = 0.0;
        satrec.sl3 = 0.0; satrec.sl4 = 0.0; satrec.gsto = 0.0;
        satrec.xfact = 0.0; satrec.xgh2 = 0.0; satrec.xgh3 = 0.0;
        satrec.xgh4 = 0.0; satrec.xh2 = 0.0; satrec.xh3 = 0.0;
        satrec.xi2 = 0.0; satrec.xi3 = 0.0; satrec.xl2 = 0.0;
        satrec.xl3 = 0.0; satrec.xl4 = 0.0; satrec.xlamo = 0.0;
        satrec.zmol = 0.0; satrec.zmos = 0.0; satrec.atime = 0.0;
        satrec.xli = 0.0; satrec.xni = 0.0;

        /* ------------------------ earth constants ----------------------- */
        // sgp4fix identify constants and allow alternate values
        // this is now the only call for the constants
        this.getgravconst(satrec.whichconst, satrec);

        //-------------------------------------------------------------------------

        satrec.error = 0;
        satrec.operationmode = opsmode;

        // sgp4fix - note the following variables are also passed directly via satrec.
        // it is possible to streamline the sgp4init call by deleting the "x"
        // variables, but the user would need to set the satrec.* values first. we
        // include the additional assignments in case twoline2rv is not used.
        /*
        satrec.bstar = xbstar;
        // sgp4fix allow additional parameters in the struct
        satrec.ndot = xndot;
        satrec.nddot = xnddot;
        satrec.ecco = xecco;
        satrec.argpo = xargpo;
        satrec.inclo = xinclo;
        satrec.mo = xmo;
        // sgp4fix rename variables to clarify which mean motion is intended
        satrec.no_kozai = xno_kozai;
        satrec.nodeo = xnodeo;
        */

        // single averaged mean elements
        satrec.am = satrec.em = satrec.im = satrec.Om = satrec.mm = satrec.nm = 0.0;

        /* ------------------------ earth constants ----------------------- */
        // sgp4fix identify constants and allow alternate values no longer needed
        // getgravconst( whichconst, tumin, mu, radiusearthkm, xke, j2, j3, j4, j3oj2 );
        ss = 78.0 / satrec.radiusearthkm + 1.0;
        // sgp4fix use multiply for speed instead of pow
        qzms2ttemp = (120.0 - 78.0) / satrec.radiusearthkm;
        qzms2t = qzms2ttemp * qzms2ttemp * qzms2ttemp * qzms2ttemp;
        x2o3 = 2.0 / 3.0;

        satrec.init = 'y';
        satrec.t = 0.0;

        // sgp4fix remove satn as it is not needed in initl
        
        this.initl(epoch,satrec);
        
        satrec.a = Math.pow(satrec.no_unkozai * satrec.tumin, (-2.0 / 3.0));
        satrec.alta = satrec.a * (1.0 + satrec.ecco) - 1.0;
        satrec.altp = satrec.a * (1.0 - satrec.ecco) - 1.0;
        satrec.error = 0;

        // sgp4fix remove this check as it is unnecessary
        // the mrt check in sgp4 handles decaying satellite cases even if the starting
        // condition is below the surface of te earth
        //     if (rp < 1.0)
        //       {
        //         satrec.error = 5;
        //       }

        if ((satrec.omeosq >= 0.0) || (satrec.no_unkozai >= 0.0))
        {
            satrec.isimp = 0;
            if (satrec.rp < (220.0 / satrec.radiusearthkm + 1.0))
                satrec.isimp = 1;
            sfour = ss;
            qzms24 = qzms2t;
            perige = (satrec.rp - 1.0) * satrec.radiusearthkm;

            /* - for perigees below 156 km, s and qoms2t are altered - */
            if (perige < 156.0)
            {
                sfour = perige - 78.0;
                if (perige < 98.0)
                    sfour = 20.0;
                // sgp4fix use multiply for speed instead of pow
                qzms24temp = (120.0 - sfour) / satrec.radiusearthkm;
                qzms24 = qzms24temp * qzms24temp * qzms24temp * qzms24temp;
                sfour = sfour / satrec.radiusearthkm + 1.0;
            }
            pinvsq = 1.0 / satrec.posq;

            tsi = 1.0 / (satrec.ao - sfour);
            satrec.eta = satrec.ao * satrec.ecco * tsi;
            etasq = satrec.eta * satrec.eta;
            eeta = satrec.ecco * satrec.eta;
            psisq = Math.abs(1.0 - etasq);
            coef = qzms24 * Math.pow(tsi, 4.0);
            coef1 = coef / Math.pow(psisq, 3.5);
            cc2 = coef1 * satrec.no_unkozai * (satrec.ao * (1.0 + 1.5 * etasq + eeta *
                (4.0 + etasq)) + 0.375 * satrec.j2 * tsi / psisq * satrec.con41 *
                (8.0 + 3.0 * etasq * (8.0 + etasq)));
            satrec.cc1 = satrec.bstar * cc2;
            cc3 = 0.0;
            if (satrec.ecco > 1.0e-4)
                cc3 = -2.0 * coef * tsi * satrec.j3oj2 * satrec.no_unkozai * satrec.sinio / satrec.ecco;
            satrec.x1mth2 = 1.0 - satrec.cosio2;
            satrec.cc4 = 2.0* satrec.no_unkozai * coef1 * satrec.ao * satrec.omeosq *
                (satrec.eta * (2.0 + 0.5 * etasq) + satrec.ecco *
                (0.5 + 2.0 * etasq) - satrec.j2 * tsi / (satrec.ao * psisq) *
                (-3.0 * satrec.con41 * (1.0 - 2.0 * eeta + etasq *
                (1.5 - 0.5 * eeta)) + 0.75 * satrec.x1mth2 *
                (2.0 * etasq - eeta * (1.0 + etasq)) * Math.cos(2.0 * satrec.argpo)));
            satrec.cc5 = 2.0 * coef1 * satrec.ao * satrec.omeosq * (1.0 + 2.75 *
                (etasq + eeta) + eeta * etasq);
            cosio4 = satrec.cosio2 * satrec.cosio2;
            temp1 = 1.5 * satrec.j2 * pinvsq * satrec.no_unkozai;
            temp2 = 0.5 * temp1 * satrec.j2 * pinvsq;
            temp3 = -0.46875 * satrec.j4 * pinvsq * pinvsq * satrec.no_unkozai;
            satrec.mdot = satrec.no_unkozai + 0.5 * temp1 * satrec.rteosq * satrec.con41 + 0.0625 *
                temp2 * satrec.rteosq * (13.0 - 78.0 * satrec.cosio2 + 137.0 * cosio4);
            satrec.argpdot = -0.5 * temp1 * satrec.con42 + 0.0625 * temp2 *
                (7.0 - 114.0 * satrec.cosio2 + 395.0 * cosio4) +
                temp3 * (3.0 - 36.0 * satrec.cosio2 + 49.0 * cosio4);
            xhdot1 = -temp1 * satrec.cosio;
            satrec.nodedot = xhdot1 + (0.5 * temp2 * (4.0 - 19.0 * satrec.cosio2) +
                2.0 * temp3 * (3.0 - 7.0 * satrec.cosio2)) * satrec.cosio;
            xpidot = satrec.argpdot + satrec.nodedot;
            satrec.omgcof = satrec.bstar * cc3 * Math.cos(satrec.argpo);
            satrec.xmcof = 0.0;
            if (satrec.ecco > 1.0e-4)
                satrec.xmcof = -x2o3 * coef * satrec.bstar / eeta;
            satrec.nodecf = 3.5 * satrec.omeosq * xhdot1 * satrec.cc1;
            satrec.t2cof = 1.5 * satrec.cc1;
            // sgp4fix for divide by zero with xinco = 180 deg
            if (Math.abs(satrec.cosio + 1.0) > 1.5e-12)
                satrec.xlcof = -0.25 * satrec.j3oj2 * satrec.sinio * (3.0 + 5.0 * satrec.cosio) / (1.0 + satrec.cosio);
            else
                satrec.xlcof = -0.25 * satrec.j3oj2 * satrec.sinio * (3.0 + 5.0 * satrec.cosio) / temp4;
            satrec.aycof = -0.5 * satrec.j3oj2 * satrec.sinio;
            // sgp4fix use multiply for speed instead of pow
            delmotemp = 1.0 + satrec.eta * Math.cos(satrec.mo);
            satrec.delmo = delmotemp * delmotemp * delmotemp;
            satrec.sinmao = Math.sin(satrec.mo);
            satrec.x7thm1 = 7.0 * satrec.cosio2 - 1.0;

            /* --------------- deep space initialization ------------- */
            if ((2 * pi / satrec.no_unkozai) >= 225.0)
            {
                satrec.method = 'd';
                satrec.isimp = 1;
                tc = 0.0;
                satrec.inclm = satrec.inclo;

                this.dscom(epoch, satrec.ecco, satrec.argpo, tc, satrec.inclo, satrec.nodeo, satrec.no_unkozai,satrec);
                
                
                satrec.ep=satrec.ecco;
                satrec.inclp=satrec.inclo;
                satrec.nodep=satrec.nodeo;
                satrec.argpp=satrec.argpo;
                satrec.mp=satrec.mo;

                
                this.dpper(satrec.e3, satrec.ee2, satrec.peo, satrec.pgho,
                    satrec.pho, satrec.pinco, satrec.plo, satrec.se2,
                    satrec.se3, satrec.sgh2, satrec.sgh3, satrec.sgh4,
                    satrec.sh2, satrec.sh3, satrec.si2, satrec.si3,
                    satrec.sl2, satrec.sl3, satrec.sl4, satrec.t,
                    satrec.xgh2, satrec.xgh3, satrec.xgh4, satrec.xh2,
                    satrec.xh3, satrec.xi2, satrec.xi3, satrec.xl2,
                    satrec.xl3, satrec.xl4, satrec.zmol, satrec.zmos, satrec.init,satrec,
                    satrec.operationmode);


                satrec.ecco=satrec.ep;
                satrec.inclo=satrec.inclp;
                satrec.nodeo=satrec.nodep;
                satrec.argpo=satrec.argpp;
                satrec.mo=satrec.mp;


                satrec.argpm = 0.0;
                satrec.nodem = 0.0;
                satrec.mm = 0.0;
                
                this.dsinit(tc, xpidot, satrec);
            }

            /* ----------- set variables if not deep space ----------- */
            if (satrec.isimp != 1)
            {
                cc1sq = satrec.cc1 * satrec.cc1;
                satrec.d2 = 4.0 * satrec.ao * tsi * cc1sq;
                temp = satrec.d2 * tsi * satrec.cc1 / 3.0;
                satrec.d3 = (17.0 * satrec.ao + sfour) * temp;
                satrec.d4 = 0.5 * temp * satrec.ao * tsi * (221.0 * satrec.ao + 31.0 * sfour) * satrec.cc1;
                satrec.t3cof = satrec.d2 + 2.0 * cc1sq;
                satrec.t4cof = 0.25 * (3.0 * satrec.d3 + satrec.cc1 *
                    (12.0 * satrec.d2 + 10.0 * cc1sq));
                satrec.t5cof = 0.2 * (3.0 * satrec.d4 +
                    12.0 * satrec.cc1 * satrec.d3 +
                    6.0 * satrec.d2 * satrec.d2 +
                    15.0 * cc1sq * (2.0 * satrec.d2 + cc1sq));
            }
        } // if omeosq = 0 ...

        /* finally propogate to zero epoch to initialize all others. */
        // sgp4fix take out check to let satellites process until they are actually below earth surface
        //       if(satrec.error == 0)
        
        var r = [0, 0, 0];
        var v = [0, 0, 0];

        
        this.sgp4(satrec, 0.0, r, v);

        satrec.init = 'n';

        //sgp4fix return boolean. satrec.error contains any error codes
        return true;
    }  // sgp4init

    /*-----------------------------------------------------------------------------
    *
    *                             procedure sgp4
    *
    *  this procedure is the sgp4 prediction model from space command. this is an
    *    updated and combined version of sgp4 and sdp4, which were originally
    *    published separately in spacetrack report #3. this version follows the
    *    methodology from the aiaa paper (2006) describing the history and
    *    development of the code.
    *
    *  author        : david vallado                  719-573-2600   28 jun 2005
    *
    *  inputs        :
    *    satrec     - initialised structure from sgp4init() call.
    *    tsince     - time since epoch (minutes)
    *
    *  outputs       :
    *    r           - position vector                     km
    *    v           - velocity                            km/sec
    *  return code - non-zero on error.
    *                   1 - mean elements, ecc >= 1.0 or ecc < -0.001 or a < 0.95 er
    *                   2 - mean motion less than 0.0
    *                   3 - pert elements, ecc < 0.0  or  ecc > 1.0
    *                   4 - semi-latus rectum < 0.0
    *                   5 - epoch elements are sub-orbital
    *                   6 - satellite has decayed
    *
    *  locals        :
    *    am          -
    *    axnl, aynl        -
    *    betal       -
    *    cosim   , sinim   , cosomm  , sinomm  , cnod    , snod    , cos2u   ,
    *    sin2u   , coseo1  , sineo1  , cosi    , sini    , cosip   , sinip   ,
    *    cosisq  , cossu   , sinsu   , cosu    , sinu
    *    delm        -
    *    delomg      -
    *    dndt        -
    *    eccm        -
    *    emsq        -
    *    ecose       -
    *    el2         -
    *    eo1         -
    *    eccp        -
    *    esine       -
    *    argpm       -
    *    argpp       -
    *    omgadf      -c
    *    pl          -
    *    r           -
    *    rtemsq      -
    *    rdotl       -
    *    rl          -
    *    rvdot       -
    *    rvdotl      -
    *    su          -
    *    t2  , t3   , t4    , tc
    *    tem5, temp , temp1 , temp2  , tempa  , tempe  , templ
    *    u   , ux   , uy    , uz     , vx     , vy     , vz
    *    inclm       - inclination
    *    mm          - mean anomaly
    *    nm          - mean motion
    *    nodem       - right asc of ascending node
    *    xinc        -
    *    xincp       -
    *    xl          -
    *    xlm         -
    *    mp          -
    *    xmdf        -
    *    xmx         -
    *    xmy         -
    *    nodedf      -
    *    xnode       -
    *    nodep       -
    *    np          -
    *
    *  coupling      :
    *    getgravconst- no longer used. Variables are conatined within satrec
    *    dpper
    *    dpspace
    *
    *  references    :
    *    hoots, roehrich, norad spacetrack report #3 1980
    *    hoots, norad spacetrack report #6 1986
    *    hoots, schumacher and glover 2004
    *    vallado, crawford, hujsak, kelso  2006
    ----------------------------------------------------------------------------*/

    sgp4
        (
        satrec, tsince,
        r, v
        )
    {
        var axnl, aynl, betal, cnod,
            cos2u, coseo1, cosi, cosip, cosisq, cossu, cosu,
            delm, delomg, ecose, el2, eo1,
            esine, argpdf, pl, mrt = 0.0,
            mvt, rdotl, rl, rvdot, rvdotl,
            sin2u, sineo1, sini, sinip, sinsu, sinu,
            snod, su, t2, t3, t4, tem5, temp,
            temp1, temp2, tempa, tempe, templ, u, ux,
            uy, uz, vx, vy, vz,
            xinc, xincp, xl, xlm,
            xmdf, xmx, xmy, nodedf, xnode, tc,
            x2o3, vkmpersec, delmtemp;
            
        var ktr;

        /* ------------------ set mathematical constants --------------- */
        // sgp4fix divisor for divide by zero check on inclination
        // the old check used 1.0 + cos(pi-1.0e-9), but then compared it to
        // 1.5 e-12, so the threshold was changed to 1.5e-12 for consistency
        var temp4 = 1.5e-12;
        var x2o3 = 2.0 / 3.0;
        // sgp4fix identify constants and allow alternate values
        // getgravconst( whichconst, tumin, mu, radiusearthkm, xke, j2, j3, j4, j3oj2 );
        var vkmpersec = satrec.radiusearthkm * satrec.xke / 60.0;

        /* --------------------- clear sgp4 error flag ----------------- */
        satrec.t = tsince;
        satrec.error = 0;

        /* ------- update for secular gravity and atmospheric drag ----- */
        var xmdf = satrec.mo + satrec.mdot * satrec.t;
        var argpdf = satrec.argpo + satrec.argpdot * satrec.t;
        var nodedf = satrec.nodeo + satrec.nodedot * satrec.t;
        satrec.argpm = argpdf;
        satrec.mm = xmdf;
        var t2 = satrec.t * satrec.t;
        satrec.nodem = nodedf + satrec.nodecf * t2;
        var tempa = 1.0 - satrec.cc1 * satrec.t;
        var tempe = satrec.bstar * satrec.cc4 * satrec.t;
        var templ = satrec.t2cof * t2;

        var delomg = 0;
        var delmtemp = 0;
        var delm = 0;
        var temp = 0;
        var t3 = 0;
        var t4 = 0;
        var mrt = 0;
        
        if (satrec.isimp != 1)
        {
            delomg = satrec.omgcof * satrec.t;
            // sgp4fix use mutliply for speed instead of pow
            delmtemp = 1.0 + satrec.eta * Math.cos(xmdf);
            delm = satrec.xmcof *
                (delmtemp * delmtemp * delmtemp -
                satrec.delmo);
            temp = delomg + delm;
            satrec.mm = xmdf + temp;
            satrec.argpm = argpdf - temp;
            t3 = t2 * satrec.t;
            t4 = t3 * satrec.t;
            tempa = tempa - satrec.d2 * t2 - satrec.d3 * t3 -
                satrec.d4 * t4;
            tempe = tempe + satrec.bstar * satrec.cc5 * (Math.sin(satrec.mm) -satrec.sinmao);
            templ = templ + satrec.t3cof * t3 + t4 * (satrec.t4cof + satrec.t * satrec.t5cof);
        }

        
        var tc = 0;
        satrec.nm = satrec.no_unkozai;
        satrec.em = satrec.ecco;
        satrec.inclm = satrec.inclo;
        if (satrec.method == 'd')
        {
            tc = satrec.t;
            this.dspace(tc,satrec);        
        } // if method = d

        if (satrec.nm <= 0.0)
        {
            satrec.error = 2;
            // sgp4fix add return
            return false;
        }
        
        satrec.am = Math.pow((satrec.xke / satrec.nm), x2o3) * tempa * tempa;
        satrec.nm = satrec.xke / Math.pow(satrec.am, 1.5);
        satrec.em = satrec.em - tempe;

        // fix tolerance for error recognition
        // sgp4fix am is fixed from the previous nm check
        if ((satrec.em >= 1.0) || (satrec.em < -0.001)/* || (am < 0.95)*/)
        {
            satrec.error = 1;
            // sgp4fix to return if there is an error in eccentricity
            return false;
        }
        // sgp4fix fix tolerance to avoid a divide by zero
        if (satrec.em < 1.0e-6)
            satrec.em = 1.0e-6;
        satrec.mm = satrec.mm + satrec.no_unkozai * templ;
        xlm = satrec.mm + satrec.argpm + satrec.nodem;
        satrec.emsq = satrec.em * satrec.em;
        temp = 1.0 - satrec.emsq;

        satrec.nodem = this.fmod(satrec.nodem, twopi);
        satrec.argpm = this.fmod(satrec.argpm, twopi);
        xlm = this.fmod(xlm, twopi);
        satrec.mm = this.fmod(xlm - satrec.argpm - satrec.nodem, twopi);

        // sgp4fix recover singly averaged mean elements
        satrec.am = satrec.am;
        satrec.em = satrec.em;
        satrec.im = satrec.inclm;
        satrec.Om = satrec.nodem;
        satrec.om = satrec.argpm;
        satrec.mm = satrec.mm;
        satrec.nm = satrec.nm;

        /* ----------------- compute extra mean quantities ------------- */
        satrec.sinim = Math.sin(satrec.inclm);
        satrec.cosim = Math.cos(satrec.inclm);

        /* -------------------- add lunar-solar periodics -------------- */
        satrec.ep = satrec.em;
        xincp = satrec.inclm;
        satrec.inclp = satrec.inclm;
        satrec.argpp = satrec.argpm;
        satrec.nodep = satrec.nodem;
        satrec.mp = satrec.mm;
        sinip = satrec.sinim;
        cosip = satrec.cosim;
        if (satrec.method == 'd')
        {
            this.dpper(satrec.e3, satrec.ee2, satrec.peo, satrec.pgho,
                    satrec.pho, satrec.pinco, satrec.plo, satrec.se2,
                    satrec.se3, satrec.sgh2, satrec.sgh3, satrec.sgh4,
                    satrec.sh2, satrec.sh3, satrec.si2, satrec.si3,
                    satrec.sl2, satrec.sl3, satrec.sl4, satrec.t,
                    satrec.xgh2, satrec.xgh3, satrec.xgh4, satrec.xh2,
                    satrec.xh3, satrec.xi2, satrec.xi3, satrec.xl2,
                    satrec.xl3, satrec.xl4, satrec.zmol, satrec.zmos, 
                    'n', satrec, satrec.operationmode);
            
            xincp = satrec.inclp;
            if (xincp < 0.0)
            {
                xincp = -xincp;
                satrec.nodep = satrec.nodep + pi;
                satrec.argpp = satrec.argpp - pi;
            }
            if ((satrec.ep < 0.0) || (satrec.ep > 1.0))
            {
                satrec.error = 3;
                // sgp4fix add return
                return false;
            }
        } // if method = d

        /* -------------------- long period periodics ------------------ */
        if (satrec.method == 'd')
        {
            sinip = Math.sin(xincp);
            cosip = Math.cos(xincp);
            satrec.aycof = -0.5*satrec.j3oj2*sinip;
            // sgp4fix for divide by zero for xincp = 180 deg
            if (Math.abs(cosip + 1.0) > 1.5e-12)
                satrec.xlcof = -0.25 * satrec.j3oj2 * sinip * (3.0 + 5.0 * cosip) / (1.0 + cosip);
            else
                satrec.xlcof = -0.25 * satrec.j3oj2 * sinip * (3.0 + 5.0 * cosip) / temp4;
        }
        axnl = satrec.ep * Math.cos(satrec.argpp);
        temp = 1.0 / (satrec.am * (1.0 - satrec.ep * satrec.ep));
        aynl = satrec.ep* Math.sin(satrec.argpp) + temp * satrec.aycof;
        xl = satrec.mp + satrec.argpp + satrec.nodep + temp * satrec.xlcof * axnl;

        /* --------------------- solve kepler's equation --------------- */
        u = this.fmod(xl - satrec.nodep, twopi);
        eo1 = u;
        tem5 = 9999.9;
        ktr = 1;
        sineo1 = 0;
        coseo1 = 0;
        //   sgp4fix for kepler iteration
        //   the following iteration needs better limits on corrections
        while ((Math.abs(tem5) >= 1.0e-12) && (ktr <= 10))
        {
            sineo1 = Math.sin(eo1);
            coseo1 = Math.cos(eo1);
            tem5 = 1.0 - coseo1 * axnl - sineo1 * aynl;
            tem5 = (u - aynl * coseo1 + axnl * sineo1 - eo1) / tem5;
            if (Math.abs(tem5) >= 0.95)
                tem5 = tem5 > 0.0 ? 0.95 : -0.95;
            eo1 = eo1 + tem5;
            ktr = ktr + 1;
        }

        /* ------------- short period preliminary quantities ----------- */
        ecose = axnl*coseo1 + aynl*sineo1;
        esine = axnl*sineo1 - aynl*coseo1;
        el2 = axnl*axnl + aynl*aynl;
        pl = satrec.am*(1.0 - el2);
        if (pl < 0.0)
        {
            satrec.error = 4;
            // sgp4fix add return
            return false;
        }
        else
        {
            rl = satrec.am * (1.0 - ecose);
            rdotl = Math.sqrt(satrec.am) * esine / rl;
            rvdotl = Math.sqrt(pl) / rl;
            betal = Math.sqrt(1.0 - el2);
            temp = esine / (1.0 + betal);
            sinu = satrec.am / rl * (sineo1 - aynl - axnl * temp);
            cosu = satrec.am / rl * (coseo1 - axnl + aynl * temp);
            su = Math.atan2(sinu, cosu);
            sin2u = (cosu + cosu) * sinu;
            cos2u = 1.0 - 2.0 * sinu * sinu;
            temp = 1.0 / pl;
            temp1 = 0.5 * satrec.j2 * temp;
            temp2 = temp1 * temp;

            /* -------------- update for short period periodics ------------ */
            if (satrec.method == 'd')
            {
                cosisq = cosip * cosip;
                satrec.con41 = 3.0*cosisq - 1.0;
                satrec.x1mth2 = 1.0 - cosisq;
                satrec.x7thm1 = 7.0*cosisq - 1.0;
            }
            mrt = rl * (1.0 - 1.5 * temp2 * betal * satrec.con41) +
                0.5 * temp1 * satrec.x1mth2 * cos2u;
            su = su - 0.25 * temp2 * satrec.x7thm1 * sin2u;
            xnode = satrec.nodep + 1.5 * temp2 * cosip * sin2u;
            xinc = xincp + 1.5 * temp2 * cosip * sinip * cos2u;
            mvt = rdotl - satrec.nm * temp1 * satrec.x1mth2 * sin2u / satrec.xke;
            rvdot = rvdotl + satrec.nm * temp1 * (satrec.x1mth2 * cos2u +
                1.5 * satrec.con41) / satrec.xke;

            /* --------------------- orientation vectors ------------------- */
            sinsu = Math.sin(su);
            cossu = Math.cos(su);
            snod = Math.sin(xnode);
            cnod = Math.cos(xnode);
            sini = Math.sin(xinc);
            cosi = Math.cos(xinc);
            xmx = -snod * cosi;
            xmy = cnod * cosi;
            ux = xmx * sinsu + cnod * cossu;
            uy = xmy * sinsu + snod * cossu;
            uz = sini * sinsu;
            vx = xmx * cossu - cnod * sinsu;
            vy = xmy * cossu - snod * sinsu;
            vz = sini * cossu;

            /* --------- position and velocity (in km and km/sec) ---------- */
            r[0] = (mrt * ux)* satrec.radiusearthkm;
            r[1] = (mrt * uy)* satrec.radiusearthkm;
            r[2] = (mrt * uz)* satrec.radiusearthkm;
            v[0] = (mvt * ux + rvdot * vx) * vkmpersec;
            v[1] = (mvt * uy + rvdot * vy) * vkmpersec;
            v[2] = (mvt * uz + rvdot * vz) * vkmpersec;
        }  // if pl > 0

        // sgp4fix for decaying satellites
        if (mrt < 1.0)
        {
            satrec.error = 6;
            return false;
        }

        return true;
    }  // sgp4





    /* -----------------------------------------------------------------------------
    *
    *                           function getgravconst
    *
    *  this function gets constants for the propagator. note that mu is identified to
    *    facilitiate comparisons with newer models. the common useage is wgs72.
    *
    *  author        : david vallado                  719-573-2600   21 jul 2006
    *
    *  inputs        :
    *    whichconst  - which set of constants to use  wgs72old, wgs72, wgs84
    *
    *  outputs       :
    *    tumin       - minutes in one time unit
    *    mu          - earth gravitational parameter
    *    radiusearthkm - radius of the earth in km
    *    xke         - reciprocal of tumin
    *    j2, j3, j4  - un-normalized zonal harmonic values
    *    j3oj2       - j3 divided by j2
    *
    *  locals        :
    *
    *  coupling      :
    *    none
    *
    *  references    :
    *    norad spacetrack report #3
    *    vallado, crawford, hujsak, kelso  2006
    --------------------------------------------------------------------------- */

    getgravconst(whichconst, rec)
    {
        rec.whichconst = whichconst;
        switch (whichconst)
        {
            // -- wgs-72 low precision str#3 constants --
        case wgs72old:
            rec.mu = 398600.79964;        // in km3 / s2
            rec.radiusearthkm = 6378.135;     // km
            rec.xke = 0.0743669161;        // reciprocal of tumin
            rec.tumin = 1.0 / rec.xke;
            rec.j2 = 0.001082616;
            rec.j3 = -0.00000253881;
            rec.j4 = -0.00000165597;
            rec.j3oj2 = rec.j3 / rec.j2;
            break;
            // ------------ wgs-72 constants ------------
        case wgs72:
            rec.mu = 398600.8;            // in km3 / s2
            rec.radiusearthkm = 6378.135;     // km
            rec.xke = 60.0 / Math.sqrt(rec.radiusearthkm*rec.radiusearthkm*rec.radiusearthkm / rec.mu);
            rec.tumin = 1.0 / rec.xke;
            rec.j2 = 0.001082616;
            rec.j3 = -0.00000253881;
            rec.j4 = -0.00000165597;
            rec.j3oj2 = rec.j3 / rec.j2;
            break;
        default:
        case wgs84:
            // ------------ wgs-84 constants ------------
            rec.mu = 398600.5;            // in km3 / s2
            rec.radiusearthkm = 6378.137;     // km
            rec.xke = 60.0 / Math.sqrt(rec.radiusearthkm*rec.radiusearthkm*rec.radiusearthkm / rec.mu);
            rec.tumin = 1.0 / rec.xke;
            rec.j2 = 0.00108262998905;
            rec.j3 = -0.00000253215306;
            rec.j4 = -0.00000161098761;
            rec.j3oj2 = rec.j3 / rec.j2;
            break;
        }

    }   // getgravconst

    
    fmod(numer, denom)
    {
        var tquot = Math.floor(numer/denom);
        return numer-tquot*denom;
    }
    
    /* -----------------------------------------------------------------------------
    *
    *                           function gstime
    *
    *  this function finds the greenwich sidereal time.
    *
    *  author        : david vallado                  719-573-2600    1 mar 2001
    *
    *  inputs          description                    range / units
    *    jdut1       - julian date in ut1             days from 4713 bc
    *
    *  outputs       :
    *    gstime      - greenwich sidereal time        0 to 2pi rad
    *
    *  locals        :
    *    temp        - temporary variable for doubles   rad
    *    tut1        - julian centuries from the
    *                  jan 1, 2000 12 h epoch (ut1)
    *
    *  coupling      :
    *    none
    *
    *  references    :
    *    vallado       2013, 187, eq 3-45
    * --------------------------------------------------------------------------- */

    gstime(jdut1)
    {
        var temp, tut1;

        tut1 = (jdut1 - 2451545.0) / 36525.0;
        temp = -6.2e-6* tut1 * tut1 * tut1 + 0.093104 * tut1 * tut1 +
            (876600.0 * 3600 + 8640184.812866) * tut1 + 67310.54841;  // sec
        temp = this.fmod(temp * deg2rad / 240.0, twopi); //360/86400 = 1/240, to deg, to rad

        // ------------------------ check quadrants ---------------------
        if (temp < 0.0)
            temp += twopi;

        return temp;
    }  // gstime
    
    /* -----------------------------------------------------------------------------
    *
    *                           procedure jday
    *
    *  this procedure finds the julian date given the year, month, day, and time.
    *    the julian date is defined by each elapsed day since noon, jan 1, 4713 bc.
    *
    *  algorithm     : calculate the answer in one step for efficiency
    *
    *  author        : david vallado                  719-573-2600    1 mar 2001
    *
    *  inputs          description                    range / units
    *    year        - year                           1900 .. 2100
    *    mon         - month                          1 .. 12
    *    day         - day                            1 .. 28,29,30,31
    *    hr          - universal time hour            0 .. 23
    *    min         - universal time min             0 .. 59
    *    sec         - universal time sec             0.0 .. 59.999
    *
    *  outputs       :
    *    jd          - julian date                    days from 4713 bc
    *    jdfrac      - julian date fraction into day  days from 4713 bc
    *
    *  locals        :
    *    none.
    *
    *  coupling      :
    *    none.
    *
    *  references    :
    *    vallado       2013, 183, alg 14, ex 3-4
    * --------------------------------------------------------------------------- */

    jday(year, mon, day, hr, minute, sec)
    {
        var jd = 0;
        var jdFrac = 0;

        jd = 367.0 * year -
            Math.floor((7 * (year + Math.floor((mon + 9) / 12.0))) * 0.25) +
            Math.floor(275 * mon / 9.0) +
            day + 1721013.5;  // use - 678987.0 to go to mjd directly
        jdFrac = (sec + minute * 60.0 + hr * 3600.0) / 86400.0;

        // check that the day and fractional day are correct
        if (Math.abs(jdFrac) > 1.0)
        {
            var dtt = Math.floor(jdFrac);
            jd = jd + dtt;
            jdFrac = jdFrac - dtt;
        }

        var out = [jd,jdFrac];
        return out;
    }  // jday
} // end class SGP4




class TLE 
{
    constructor(line1, line2){
        this.initvars();
        this.parseLines(line1,line2);
    }

    initvars(){
        this.rec = new ElsetRec();
        this.line1 = null;
        this.line2 = null;
        this.intlid = null;
        this.objectNum = 0;
        this.epoch = null;
        this.ndot = 0;
        this.nddot = 0;
        this.bstar = 0;
        this.elnum = 0;
        this.incDeg = 0;
        this.raanDeg = 0;
        this.ecc = 0;
        this.argpDeg = 0;
        this.maDeg = 0;
        this.n = 0;
        this.revnum = 0;    
        this.parseErrors = null;
        this.sgp4Error = 0;
        this.SGP4 = new SGP4();
    }

    getRVForDate(d)
    {
        var t = d.getTime();
        t -= epoch.getTime();
        t/=60000;
        
        return this.getRV(t);
    }

    getRV(minutesAfterEpoch)
    {
        var r = [0,0,0];
        var v = [0,0,0];
        
        this.rec.error = 0;
        this.SGP4.sgp4(this.rec, minutesAfterEpoch, r, v);
        this.sgp4Error = this.rec.error;
        var out = [r,v];
        return out;
    }
    
    getSgp4Error()
    {
        return this.sgp4Error;
    }
    
    getElsetRec()
    {
        return this.rec;
    }
    
    setElsetRec(er)
    {
        this.rec = er;
    }
    
    getParseErrors()
    {
        return this.parseErrors;
    }
    
    getIntlID()
    {
        return this.intlid;
    }
    
    setIntlID(id)
    {
        this.intlid = id;
    }
    
    getObjectNum()
    {
        return this.objectNum;
    }
    
    setObjectNum(on)
    {
        this.objectNum = on;
    }
    
    getEpoch()
    {
        return this.epoch;
    }
    
    setEpoch(d)
    {
        this.epoch = d;
    }
    
    getNDot()
    {
        return this.ndot;
    }
    
    setNDot(val)
    {
        this.ndot = val;
    }
    
    getNDDot()
    {
        return this.nddot;
    }
    
    setNDDot(val)
    {
        this.nddot = val;
    }
    
    getBstar()
    {
        return this.bstar;
    }
    
    setBstar(val)
    {
        this.bstar = val;
    }
    
    getElNum()
    {
        return this.elnum;
    }
    
    setElNum(num)
    {
        this.elnum = num;
    }
    
    getIncDeg()
    {
        return this.incDeg;
    }
    
    setIncDeg(val)
    {
        this.incDeg = val;
    }
    
    getRaanDeg()
    {
        return this.raanDeg;
    }
    
    setRaanDeg(val)
    {
        this.raanDeg = val;
    }
    
    getEcc()
    {
        return this.ecc;
    }
    
    setEcc(val)
    {
        this.ecc = val;
    }
    
    getArgpDeg()
    {
        return this.argpDeg;
    }
    
    setArgpDeg(val)
    {
        this.argpDeg = val;
    }
    
    getMaDeg()
    {
        return this.maDeg;
    }
    
    setMaDeg(val)
    {
        this.maDeg = val;
    }
    
    getN()
    {
        return this.n;
    }
    
    setN(val)
    {
        this.n = val;
    }
    
    getRevNum()
    {
        return this.revnum;
    }
    
    setRevNum(val)
    {
        this.revnum = val;
    }
    
    getLine1()
    {
        return this.line1;
    }
    
    getLine2()
    {
        return this.line2;
    }
    
    /**
     * Parses the two lines optimistically.  No exceptions are thrown but some parse errors will
     * be accumulated as a string.  Call getParseErrors() to see if there are any.
     * 
     * @param line1
     * @param line2
     */
    parseLines(line1, line2)
    {
        this.parseErrors = null;
        this.rec = new ElsetRec();

        this.line1 = line1;
        this.line2 = line2;
        
        if(line1 == null)
        {
            this.addParseError("line1 too short");
        }
        
        line1 = line1.trim();
        if(line1.length<68) // we can live without checksum
        {
            this.addParseError("line1 too short");
        }
        
        if(line2 == null)
        {
            this.addParseError("line2 too short");
        }
        
        line2 = line2.trim();
        if(line2.length<68) // we can live without checksum
        {
            this.addParseError("line2 too short");
        }
        
        if(this.parseErrors != null) return;
        

        
        this.objectNum = this.gd(line1,2,7);
        this.objectNum = this.objectNum|0; // cast to int
        
        var o2 = this.gd(line1,2,7);
        o2 = o2|0;
        
        if(this.objectNum != o2)this.addParseError("ids don't match");
        
        this.rec.classification = line1.charAt(7);

        this.intlid = line1.substring(9, 17).trim();
        this.epoch = this.parseEpoch(line1.substring(18,32).trim());
        this.ndot = this.gdi(line1.charAt(33),line1,35,44);
        this.nddot = this.gdi(line1.charAt(44),line1,45,50);
        this.nddot *= Math.pow(10.0, this.gd(line1,50,52));
        this.bstar = this.gdi(line1.charAt(53),line1,54,59);
        this.bstar *= Math.pow(10.0, this.gd(line1,59,61));
        
        this.elnum = this.gd(line1,64,68);
        this.elnum = this.elnum|0;
        
        this.incDeg = this.gd(line2,8,16);
        this.raanDeg = this.gd(line2,17,25);
        this.ecc = this.gdi('+',line2,26,33);
        this.argpDeg = this.gd(line2,34,42);
        this.maDeg = this.gd(line2,43,51);
        
        this.n = this.gd(line2,52,63);
        
        this.revnum = this.gd(line2,63,68);
        this.revnum = this.revnum|0;
        
        this.setValsToRec();
    }
    
    /**
     * Set the values to the ElsetRec object.
     */
    setValsToRec()
    {
        var deg2rad = Math.PI / 180.0;          //   0.0174532925199433
        var xpdotp = 1440.0 / (2.0 * Math.PI);  // 229.1831180523293

        this.rec.elnum = this.elnum;
        this.rec.revnum = this.revnum;
        this.rec.satnum = this.objectNum;
        this.rec.bstar = this.bstar;
        this.rec.inclo = this.incDeg*deg2rad;
        this.rec.nodeo = this.raanDeg*deg2rad;
        this.rec.argpo = this.argpDeg*deg2rad;
        this.rec.mo = this.maDeg*deg2rad;
        this.rec.ecco = this.ecc;
        this.rec.no_kozai = this.n/xpdotp;
        this.rec.ndot = this.ndot / (xpdotp*1440.0);
        this.rec.nddot = this.nddot / (xpdotp*1440.0*1440.0);
        
        this.SGP4.sgp4init('a', this.rec);
    }
    
    /**
     * Parse the tle epoch format to a date.  
     * 
     * @param str
     * @return
     */
    parseEpoch(str)
    {
        var year = parseInt(str.substring(0,2).trim());
        
        this.rec.epochyr=year;
        if(year > 56)
        {
            year += 1900;
        }
        else
        {
            year += 2000;
        }
        
        var doy = parseInt(str.substring(2,5).trim());
        var dfrac = parseFloat("0"+str.substring(5).trim());
        
        this.rec.epochdays = doy;
        this.rec.epochdays += dfrac;
        
        
        dfrac *= 24.0;
        var hr = dfrac|0;
        dfrac = 60.0*(dfrac - hr);
        var mn = dfrac|0;
        dfrac = 60.0*(dfrac - mn);
        var sec = dfrac;
        var sc = dfrac|0;
        dfrac = 1000.0*(dfrac-sc);
        var milli = dfrac|0;
        
        var mon = 0;
        var day = 0;
        
        // convert doy to mon, day
        var days = [31,28,31,30,31,30,31,31,30,31,30,31];
        if(this.isLeap(year)) days[1]=29;
        
        var ind = 0;
        while(ind < 12 && doy > days[ind])
        {
            doy -= days[ind];
            ind++;
        }
        mon = ind+1;
        day = doy;
        
        var jd = this.SGP4.jday(year, mon, day, hr, mn, sec);
        this.rec.jdsatepoch = jd[0];
        this.rec.jdsatepochF = jd[1];

        var str = year+"-"+mon+"-"+day+"T"+hr+":"+mn+":"+sec+"Z";
        var d = new Date(str);
        
        return d;
    }
    
    isLeap(year)
    {
        if(year % 4 != 0)
        {
            return false;
        }
        
        if(year % 100 == 0)
        {
            if(year % 400 == 0) 
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        
        return true;
    }
    
    addParseError(err)
    {
        if(parseErrors == null || parseErrors.trim().length() == 0)
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
    gd(str, start, end)
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
    gd(str, start, end, defVal)
    {
        var num = defVal;
        num = parseFloat(str.substring(start,end).trim());
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
    gdi(sign, str, start, end)
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
    gdi(sign, str, start, end, defVal)
    {
        var num = defVal;
        num = parseFloat("0."+str.substring(start,end).trim());
        if(sign == '-') num *= -1.0;
        return num;
    }

}// end class TLE

