MODULE ElsetRecMod

TYPE ElsetRec 
    INTEGER*4 whichconst
    INTEGER*4 satnum
    INTEGER*4 epochyr
    INTEGER*4 epochtynumrev
    INTEGER*4 error
    CHARACTER operationmode
    CHARACTER init
    CHARACTER method    
    REAL*8 a
    REAL*8 altp
    REAL*8 alta
    REAL*8 epochdays
    REAL*8 jdsatepoch
    REAL*8 jdsatepochF
    REAL*8 nddot
    REAL*8 ndot
    REAL*8 bstar
    REAL*8 rcse
    REAL*8 inclo
    REAL*8 nodeo
    REAL*8 ecco
    REAL*8 argpo
    REAL*8 mo
    REAL*8 no_kozai
    
!   // sgp4fix add new variables from tle
    CHARACTER classification
    CHARACTER*12 intldesg
    INTEGER*4 ephtype
    INTEGER*8 elnum
    INTEGER*8 revnum
    
!   // sgp4fix add unkozai'd variable
    REAL*8 no_unkozai
    
!   // sgp4fix add singly averaged variables
    REAL*8 am
    REAL*8 em
    REAL*8 im
    REAL*8 OOm
    REAL*8 om
    REAL*8 mm
    REAL*8 nm
    REAL*8 t
    
!   // sgp4fix add constant parameters to eliminate mutliple calls during execution
    REAL*8 tumin
    REAL*8 mu
    REAL*8 radiusearthkm
    REAL*8 xke 
    REAL*8 j2
    REAL*8 j3
    REAL*8 j4
    REAL*8 j3oj2
    
!   //       Additional elements to capture relevant TLE and object information:       
    INTEGER*8 dia_mm 
    REAL*8 period_sec 
    CHARACTER active 
    CHARACTER not_orbital 
    REAL*8 rcs_m2 

!   // temporary variables because the original authors call the same method with different variables
    REAL*8 ep
    REAL*8 inclp
    REAL*8 nodep
    REAL*8 argpp
    REAL*8 mp


    INTEGER*4 isimp
    REAL*8 aycof
    REAL*8 con41
    REAL*8 cc1
    REAL*8 cc4
    REAL*8 cc5
    REAL*8 d2
    REAL*8 d3
    REAL*8 d4
    REAL*8 delmo
    REAL*8 eta
    REAL*8 argpdot
    REAL*8 omgcof
    REAL*8 sinmao
    REAL*8 t2cof
    REAL*8 t3cof
    REAL*8 t4cof
    REAL*8 t5cof
    REAL*8 x1mth2
    REAL*8 x7thm1
    REAL*8 mdot
    REAL*8 nodedot
    REAL*8 xlcof
    REAL*8 xmcof
    REAL*8 nodecf

!   // deep space
    INTEGER*4 irez
    REAL*8 d2201
    REAL*8 d2211
    REAL*8 d3210
    REAL*8 d3222
    REAL*8 d4410
    REAL*8 d4422
    REAL*8 d5220
    REAL*8 d5232
    REAL*8 d5421
    REAL*8 d5433
    REAL*8 dedt
    REAL*8 del1
    REAL*8 del2
    REAL*8 del3
    REAL*8 didt
    REAL*8 dmdt
    REAL*8 dnodt
    REAL*8 domdt
    REAL*8 e3
    REAL*8 ee2
    REAL*8 peo
    REAL*8 pgho
    REAL*8 pho
    REAL*8 pinco
    REAL*8 plo
    REAL*8 se2
    REAL*8 se3
    REAL*8 sgh2
    REAL*8 sgh3
    REAL*8 sgh4
    REAL*8 sh2
    REAL*8 sh3
    REAL*8 si2
    REAL*8 si3
    REAL*8 sl2
    REAL*8 sl3
    REAL*8 sl4
    REAL*8 gsto
    REAL*8 xfact
    REAL*8 xgh2
    REAL*8 xgh3
    REAL*8 xgh4
    REAL*8 xh2
    REAL*8 xh3
    REAL*8 xi2
    REAL*8 xi3
    REAL*8 xl2
    REAL*8 xl3
    REAL*8 xl4
    REAL*8 xlamo
    REAL*8 zmol
    REAL*8 zmos
    REAL*8 atime
    REAL*8 xli
    REAL*8 xni
    REAL*8 snodm
    REAL*8 cnodm
    REAL*8 sinim
    REAL*8 cosim
    REAL*8 sinomm
    REAL*8 cosomm
    REAL*8 day
    REAL*8 emsq
    REAL*8 gam
    REAL*8 rtemsq 
    REAL*8 s1
    REAL*8 s2
    REAL*8 s3
    REAL*8 s4
    REAL*8 s5
    REAL*8 s6
    REAL*8 s7 
    REAL*8 ss1
    REAL*8 ss2
    REAL*8 ss3
    REAL*8 ss4
    REAL*8 ss5
    REAL*8 ss6
    REAL*8 ss7
    REAL*8 sz1
    REAL*8 sz2
    REAL*8 sz3
    REAL*8 sz11
    REAL*8 sz12
    REAL*8 sz13
    REAL*8 sz21
    REAL*8 sz22
    REAL*8 sz23
    REAL*8 sz31
    REAL*8 sz32
    REAL*8 sz33
    REAL*8 z1
    REAL*8 z2
    REAL*8 z3
    REAL*8 z11
    REAL*8 z12
    REAL*8 z13
    REAL*8 z21
    REAL*8 z22
    REAL*8 z23
    REAL*8 z31
    REAL*8 z32
    REAL*8 z33
    REAL*8 argpm
    REAL*8 inclm
    REAL*8 nodem
    REAL*8 dndt
    REAL*8 eccsq
        
!   // for initl
    REAL*8 ainv
    REAL*8 ao
    REAL*8 con42
    REAL*8 cosio
    REAL*8 cosio2
    REAL*8 omeosq
    REAL*8 posq
    REAL*8 rp
    REAL*8 rteosq
    REAL*8 sinio
  END TYPE ElsetRec

END MODULE ElsetRecMod
