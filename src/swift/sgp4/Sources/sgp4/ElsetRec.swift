// This module implements the elsetrec data type from Vallado's SGP4 code.
// 
// From SGP4.h
// #define SGP4Version  "SGP4 Version 2016-03-09"
// 
// @author aholinch

struct ElsetRec {

    var whichconst: Int32 = Int32(SGP4.WGS72);
    var satnum: Int32 = 0
    var epochyr: Int32 = 0
    var epochtynumrev: Int32 = 0
    var error: Int32 = 0
    var operationmode: Character = "a"
    var initChar: Character = "n"
    var method: Character = "n"
    var a: Double = 0
    var altp: Double = 0
    var alta: Double = 0
    var epochdays: Double = 0
    var jdsatepoch: Double = 0
    var jdsatepoch_f: Double = 0
    var nddot: Double = 0
    var ndot: Double = 0
    var bstar: Double = 0
    var rcse: Double = 0
    var inclo: Double = 0
    var nodeo: Double = 0
    var ecco: Double = 0
    var argpo: Double = 0
    var mo: Double = 0
    var no_kozai: Double = 0
    
    // sgp4fix add new variables from tle
    var classification: Character = "u"
    var intldesg: String = ""
    var ephtype: Int32 = 0
    var elnum: Int64 = 0
    var revnum: Int64 = 0
    
    // sgp4fix add unkozai'd variable
    var no_unkozai: Double = 0
    
    // sgp4fix add singly averaged variables
    var am: Double = 0
    var em: Double = 0
    var im: Double = 0
    var o_m: Double = 0 // usually Om in other languages that don't care so much about snake case
    var om: Double = 0
    var mm: Double = 0
    var nm: Double = 0
    var t: Double = 0
    
    // sgp4fix add constant parameters to eliminate mutliple calls during execution
    var tumin: Double = 0
    var mu: Double = 0
    var radiusearthkm: Double = 0
    var xke: Double  = 0
    var j2: Double = 0
    var j3: Double = 0
    var j4: Double = 0
    var j3oj2: Double = 0
    
    //       Additional elements to capture relevant TLE and object information:       
    var dia_mm: Int64 = 0// RSO dia in mm
    var period_sec: Double = 0// Period in seconds
    var active: Character = "n" // "Active S/C" flag (0=n 1=y) 
    var not_orbital: Character = "n" // "Orbiting S/C" flag (0=n 1=y)  
    var rcs_m2: Double = 0 // "RCS (m^2)" storage  

    // temporary variables because the original authors call the same method with different variables
    var ep: Double = 0
    var inclp: Double = 0
    var nodep: Double = 0
    var argpp: Double = 0
    var mp: Double = 0


    var isimp: Int32 = 0
    var aycof: Double = 0
    var con41: Double = 0
    var cc1: Double = 0
    var cc4: Double = 0
    var cc5: Double = 0
    var d2: Double = 0
    var d3: Double = 0
    var d4: Double = 0
    var delmo: Double = 0
    var eta: Double = 0
    var argpdot: Double = 0
    var omgcof: Double = 0
    var sinmao: Double = 0
    var t2cof: Double = 0
    var t3cof: Double = 0
    var t4cof: Double = 0
    var t5cof: Double = 0
    var x1mth2: Double = 0
    var x7thm1: Double = 0
    var mdot: Double = 0
    var nodedot: Double = 0
    var xlcof: Double = 0
    var xmcof: Double = 0
    var nodecf: Double = 0

    // deep space
    var irez: Int32 = 0
    var d2201: Double = 0
    var d2211: Double = 0
    var d3210: Double = 0
    var d3222: Double = 0
    var d4410: Double = 0
    var d4422: Double = 0
    var d5220: Double = 0
    var d5232: Double = 0
    var d5421: Double = 0
    var d5433: Double = 0
    var dedt: Double = 0
    var del1: Double = 0
    var del2: Double = 0
    var del3: Double = 0
    var didt: Double = 0
    var dmdt: Double = 0
    var dnodt: Double = 0
    var domdt: Double = 0
    var e3: Double = 0
    var ee2: Double = 0
    var peo: Double = 0
    var pgho: Double = 0
    var pho: Double = 0
    var pinco: Double = 0
    var plo: Double = 0
    var se2: Double = 0
    var se3: Double = 0
    var sgh2: Double = 0
    var sgh3: Double = 0
    var sgh4: Double = 0
    var sh2: Double = 0
    var sh3: Double = 0
    var si2: Double = 0
    var si3: Double = 0
    var sl2: Double = 0
    var sl3: Double = 0
    var sl4: Double = 0
    var gsto: Double = 0
    var xfact: Double = 0
    var xgh2: Double = 0
    var xgh3: Double = 0
    var xgh4: Double = 0
    var xh2: Double = 0
    var xh3: Double = 0
    var xi2: Double = 0
    var xi3: Double = 0
    var xl2: Double = 0
    var xl3: Double = 0
    var xl4: Double = 0
    var xlamo: Double = 0
    var zmol: Double = 0
    var zmos: Double = 0
    var atime: Double = 0
    var xli: Double = 0
    var xni: Double = 0
    var snodm: Double = 0
    var cnodm: Double = 0
    var sinim: Double = 0
    var cosim: Double = 0
    var sinomm: Double = 0
    var cosomm: Double = 0
    var day: Double = 0
    var emsq: Double = 0
    var gam: Double = 0
    var rtemsq: Double  = 0
    var s1: Double = 0
    var s2: Double = 0
    var s3: Double = 0
    var s4: Double = 0
    var s5: Double = 0
    var s6: Double = 0
    var s7: Double  = 0
    var ss1: Double = 0
    var ss2: Double = 0
    var ss3: Double = 0
    var ss4: Double = 0
    var ss5: Double = 0
    var ss6: Double = 0
    var ss7: Double = 0
    var sz1: Double = 0
    var sz2: Double = 0
    var sz3: Double = 0
    var sz11: Double = 0
    var sz12: Double = 0
    var sz13: Double = 0
    var sz21: Double = 0
    var sz22: Double = 0
    var sz23: Double = 0
    var sz31: Double = 0
    var sz32: Double = 0
    var sz33: Double = 0
    var z1: Double = 0
    var z2: Double = 0
    var z3: Double = 0
    var z11: Double = 0
    var z12: Double = 0
    var z13: Double = 0
    var z21: Double = 0
    var z22: Double = 0
    var z23: Double = 0
    var z31: Double = 0
    var z32: Double = 0
    var z33: Double = 0
    var argpm: Double = 0
    var inclm: Double = 0
    var nodem: Double = 0
    var dndt: Double = 0
    var eccsq: Double = 0
        
    // for initl
    var ainv: Double = 0
    var ao: Double = 0
    var con42: Double = 0
    var cosio: Double = 0
    var cosio2: Double = 0
    var omeosq: Double = 0
    var posq: Double = 0
    var rp: Double = 0
    var rteosq: Double = 0
    var sinio: Double = 0

    init() {
    }
} // end struct

