#
# This class implements the elsetrec data type from Vallado's SGP4 code.
# 
# From SGP4.h
# #define SGP4Version  "SGP4 Version 2016-03-09"
# 
# @author aholinch
#
#
class ElsetRec:
  def __init__(self):

    self.whichconst = 2    #SGP4.wgs72
    self.satid = None
    self.epochyr = 0
    self.epochtynumrev = 0
    self.error = 0
    self.operationmode = 0
    self.init = 0
    self.method = 0    
    self.a = 0.0
    self.altp = 0.0
    self.alta = 0.0
    self.epochdays = 0.0
    self.jdsatepoch = 0.0
    self.jdsatepochF = 0.0
    self.nddot = 0.0
    self.ndot = 0.0
    self.bstar = 0.0
    self.rcse = 0.0
    self.inclo = 0.0
    self.nodeo = 0.0
    self.ecco = 0.0
    self.argpo = 0.0
    self.mo = 0.0
    self.no_kozai = 0.0
    
    # sgp4fix add new variables from tle
    self.classification = 'U'
    self.intldesg = ""
    self.ephtype = 0
    self.elnum = 0
    self.revnum = 0
    
    # sgp4fix add unkozai'd variable
    self.gno_unkozai = 0.0
    # sgp4fix add singly averaged variables
    self.am = 0.0
    self.em = 0.0
    self.im = 0.0
    self.Om = 0.0
    self.om = 0.0
    self.mm = 0.0
    self.nm = 0.0
    self.t = 0.0
    
    # sgp4fix add constant parameters to eliminate mutliple calls during execution
    self.tumin = 0.0
    self.mu = 0.0
    self.radiusearthkm = 0.0
    self.xke = 0.0 
    self.j2 = 0.0
    self.j3 = 0.0
    self.j4 = 0.0
    self.j3oj2 = 0.0
    
    #       Additional elements to capture relevant TLE and object information:       
    self.dia_mm = 0 # RSO dia in mm
    self.period_sec = 0.0 # Period in seconds
    self.active = 0 # "Active S/C" flag (0=n, 1=y) 
    self.not_orbital = 0 # "Orbiting S/C" flag (0=n, 1=y)  
    self.rcs_m2 = 0.0 # "RCS (m^2)" storage  

    # temporary variables because the original authors call the same method with different variables
    self.ep = 0.0
    self.inclp = 0.0
    self.nodep = 0.0
    self.argpp = 0.0
    self.mp = 0.0


    self.isimp = 0
    self.aycof = 0.0
    self.con41 = 0.0
    self.cc1 = 0.0
    self.cc4 = 0.0
    self.cc5 = 0.0
    self.d2 = 0.0
    self.d3 = 0.0
    self.d4 = 0.0
    self.delmo = 0.0
    self.eta = 0.0
    self.argpdot = 0.0
    self.omgcof = 0.0
    self.sinmao = 0.0
    self.t2cof = 0.0
    self.t3cof = 0.0
    self.t4cof = 0.0
    self.t5cof = 0.0
    self.x1mth2 = 0.0
    self.x7thm1 = 0.0
    self.mdot = 0.0
    self.nodedot = 0.0
    self.xlcof = 0.0
    self.xmcof = 0.0
    self.nodecf = 0.0

    # deep space
    self.irez = 0
    self.d2201 = 0.0
    self.d2211 = 0.0
    self.d3210 = 0.0
    self.d3222 = 0.0
    self.d4410 = 0.0
    self.d4422 = 0.0
    self.d5220 = 0.0
    self.d5232 = 0.0
    self.d5421 = 0.0
    self.d5433 = 0.0
    self.dedt = 0.0
    self.del1 = 0.0
    self.del2 = 0.0
    self.del3 = 0.0
    self.didt = 0.0
    self.dmdt = 0.0
    self.dnodt = 0.0
    self.domdt = 0.0
    self.e3 = 0.0
    self.ee2 = 0.0
    self.peo = 0.0
    self.pgho = 0.0
    self.pho = 0.0
    self.pinco = 0.0
    self.plo = 0.0
    self.se2 = 0.0
    self.se3 = 0.0
    self.sgh2 = 0.0
    self.sgh3 = 0.0
    self.sgh4 = 0.0
    self.sh2 = 0.0
    self.sh3 = 0.0
    self.si2 = 0.0
    self.si3 = 0.0
    self.sl2 = 0.0
    self.sl3 = 0.0
    self.sl4 = 0.0
    self.gsto = 0.0
    self.xfact = 0.0
    self.xgh2 = 0.0
    self.xgh3 = 0.0
    self.xgh4 = 0.0
    self.xh2 = 0.0
    self.xh3 = 0.0
    self.xi2 = 0.0
    self.xi3 = 0.0
    self.xl2 = 0.0
    self.xl3 = 0.0
    self.xl4 = 0.0
    self.xlamo = 0.0
    self.zmol = 0.0
    self.zmos = 0.0
    self.atime = 0.0
    self.xli = 0.0
    self.xni = 0.0
    self.snodm = 0.0
    self.cnodm = 0.0
    self.sinim = 0.0
    self.cosim = 0.0
    self.sinomm = 0.0
    self.cosomm = 0.0
    self.day = 0.0
    self.emsq = 0.0
    self.gam = 0.0
    self.rtemsq = 0.0 
    self.s1 = 0.0
    self.s2 = 0.0
    self.s3 = 0.0
    self.s4 = 0.0
    self.s5 = 0.0
    self.s6 = 0.0
    self.s7 = 0.0 
    self.ss1 = 0.0
    self.ss2 = 0.0
    self.ss3 = 0.0
    self.ss4 = 0.0
    self.ss5 = 0.0
    self.ss6 = 0.0
    self.ss7 = 0.0
    self.sz1 = 0.0
    self.sz2 = 0.0
    self.sz3 = 0.0
    self.sz11 = 0.0
    self.sz12 = 0.0
    self.sz13 = 0.0
    self.sz21 = 0.0
    self.sz22 = 0.0
    self.sz23 = 0.0
    self.sz31 = 0.0
    self.sz32 = 0.0
    self.sz33 = 0.0
    self.z1 = 0.0
    self.z2 = 0.0
    self.z3 = 0.0
    self.z11 = 0.0
    self.z12 = 0.0
    self.z13 = 0.0
    self.z21 = 0.0
    self.z22 = 0.0
    self.z23 = 0.0
    self.z31 = 0.0
    self.z32 = 0.0
    self.z33 = 0.0
    self.argpm = 0.0
    self.inclm = 0.0
    self.nodem = 0.0
    self.dndt = 0.0
    self.eccsq = 0.0
        
    # for initl
    self.ainv = 0.0
    self.ao = 0.0
    self.con42 = 0.0
    self.cosio = 0.0
    self.cosio2 = 0.0
    self.omeosq = 0.0
    self.posq = 0.0
    self.rp = 0.0
    self.rteosq = 0.0
    self.sinio = 0.0
