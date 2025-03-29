#
# This class implements the elsetrec data type from Vallado's SGP4 code.
# 
# From SGP4.h
# #define SGP4Version  "SGP4 Version 2016-03-09"
# 
# @author aholinch
#
#
class ElsetRec
  attr_accessor :whichconst
  attr_accessor :satid
  attr_accessor :epochyr
  attr_accessor :epochtynumrev 
  attr_accessor :error 
  attr_accessor :operationmode 
  attr_accessor :init
  attr_accessor :method 
  attr_accessor :a
  attr_accessor :altp
  attr_accessor :alta
  attr_accessor :epochdays
  attr_accessor :jdsatepoch
  attr_accessor :jdsatepochF
  attr_accessor :nddot
  attr_accessor :ndot
  attr_accessor :bstar
  attr_accessor :rcse
  attr_accessor :inclo
  attr_accessor :nodeo
  attr_accessor :ecco
  attr_accessor :argpo
  attr_accessor :mo
  attr_accessor :no_kozai
  attr_accessor :classification
  attr_accessor :intldesg
  attr_accessor :ephtype
  attr_accessor :elnum
  attr_accessor :revnum
  attr_accessor :no_unkozai
  attr_accessor :am
  attr_accessor :em
  attr_accessor :im
  attr_accessor :Om
  attr_accessor :om
  attr_accessor :mm
  attr_accessor :nm
  attr_accessor :t
  attr_accessor :tumin
  attr_accessor :mu
  attr_accessor :radiusearthkm
  attr_accessor :xke 
  attr_accessor :j2
  attr_accessor :j3
  attr_accessor :j4
  attr_accessor :j3oj2
  attr_accessor :dia_mm
  attr_accessor :period_sec
  attr_accessor :active 
  attr_accessor :not_orbital  
  attr_accessor :rcs_m2  
  attr_accessor :ep
  attr_accessor :inclp
  attr_accessor :nodep
  attr_accessor :argpp
  attr_accessor :mp
  attr_accessor :isimp
  attr_accessor :aycof
  attr_accessor :con41
  attr_accessor :cc1
  attr_accessor :cc4
  attr_accessor :cc5
  attr_accessor :d2
  attr_accessor :d3
  attr_accessor :d4
  attr_accessor :delmo
  attr_accessor :eta
  attr_accessor :argpdot
  attr_accessor :omgcof
  attr_accessor :sinmao
  attr_accessor :t2cof
  attr_accessor :t3cof
  attr_accessor :t4cof
  attr_accessor :t5cof
  attr_accessor :x1mth2
  attr_accessor :x7thm1
  attr_accessor :mdot
  attr_accessor :nodedot
  attr_accessor :xlcof
  attr_accessor :xmcof
  attr_accessor :nodecf
  attr_accessor :irez
  attr_accessor :d2201
  attr_accessor :d2211
  attr_accessor :d3210
  attr_accessor :d3222
  attr_accessor :d4410
  attr_accessor :d4422
  attr_accessor :d5220
  attr_accessor :d5232
  attr_accessor :d5421
  attr_accessor :d5433
  attr_accessor :dedt
  attr_accessor :del1
  attr_accessor :del2
  attr_accessor :del3
  attr_accessor :didt
  attr_accessor :dmdt
  attr_accessor :dnodt
  attr_accessor :domdt
  attr_accessor :e3
  attr_accessor :ee2
  attr_accessor :peo
  attr_accessor :pgho
  attr_accessor :pho
  attr_accessor :pinco
  attr_accessor :plo
  attr_accessor :se2
  attr_accessor :se3
  attr_accessor :sgh2
  attr_accessor :sgh3
  attr_accessor :sgh4
  attr_accessor :sh2
  attr_accessor :sh3
  attr_accessor :si2
  attr_accessor :si3
  attr_accessor :sl2
  attr_accessor :sl3
  attr_accessor :sl4
  attr_accessor :gsto
  attr_accessor :xfact
  attr_accessor :xgh2
  attr_accessor :xgh3
  attr_accessor :xgh4
  attr_accessor :xh2
  attr_accessor :xh3
  attr_accessor :xi2
  attr_accessor :xi3
  attr_accessor :xl2
  attr_accessor :xl3
  attr_accessor :xl4
  attr_accessor :xlamo
  attr_accessor :zmol
  attr_accessor :zmos
  attr_accessor :atime
  attr_accessor :xli
  attr_accessor :xni
  attr_accessor :snodm
  attr_accessor :cnodm
  attr_accessor :sinim
  attr_accessor :cosim
  attr_accessor :sinomm
  attr_accessor :cosomm
  attr_accessor :day
  attr_accessor :emsq
  attr_accessor :gam
  attr_accessor :rtemsq 
  attr_accessor :s1
  attr_accessor :s2
  attr_accessor :s3
  attr_accessor :s4
  attr_accessor :s5
  attr_accessor :s6
  attr_accessor :s7 
  attr_accessor :ss1
  attr_accessor :ss2
  attr_accessor :ss3
  attr_accessor :ss4
  attr_accessor :ss5
  attr_accessor :ss6
  attr_accessor :ss7
  attr_accessor :sz1
  attr_accessor :sz2
  attr_accessor :sz3
  attr_accessor :sz11
  attr_accessor :sz12
  attr_accessor :sz13
  attr_accessor :sz21
  attr_accessor :sz22
  attr_accessor :sz23
  attr_accessor :sz31
  attr_accessor :sz32
  attr_accessor :sz33
  attr_accessor :z1
  attr_accessor :z2
  attr_accessor :z3
  attr_accessor :z11
  attr_accessor :z12
  attr_accessor :z13
  attr_accessor :z21
  attr_accessor :z22
  attr_accessor :z23
  attr_accessor :z31
  attr_accessor :z32
  attr_accessor :z33
  attr_accessor :argpm
  attr_accessor :inclm
  attr_accessor :nodem
  attr_accessor :dndt
  attr_accessor :eccsq
  attr_accessor :ainv
  attr_accessor :ao
  attr_accessor :con42
  attr_accessor :cosio
  attr_accessor :cosio2
  attr_accessor :omeosq
  attr_accessor :posq
  attr_accessor :rp
  attr_accessor :rteosq
  attr_accessor :sinio


  def initialize
    @whichconst = 2    #SGP4.wgs72
    @satid = '0' 
    @epochyr = 0
    @epochtynumrev = 0
    @error = 0
    @operationmode = 0
    @init = 0
    @method = 0    
    @a = 0.0
    @altp = 0.0
    @alta = 0.0
    @epochdays = 0.0
    @jdsatepoch = 0.0
    @jdsatepochF = 0.0
    @nddot = 0.0
    @ndot = 0.0
    @bstar = 0.0
    @rcse = 0.0
    @inclo = 0.0
    @nodeo = 0.0
    @ecco = 0.0
    @argpo = 0.0
    @mo = 0.0
    @no_kozai = 0.0
    
    # sgp4fix add new variables from tle
    @classification = 'U'
    @intldesg = ""
    @ephtype = 0
    @elnum = 0
    @revnum = 0
    
    # sgp4fix add unkozai'd variable
    @no_unkozai = 0.0
    # sgp4fix add singly averaged variables
    @am = 0.0
    @em = 0.0
    @im = 0.0
    @Om = 0.0
    @om = 0.0
    @mm = 0.0
    @nm = 0.0
    @t = 0.0
    
    # sgp4fix add constant parameters to eliminate mutliple calls during execution
    @tumin = 0.0
    @mu = 0.0
    @radiusearthkm = 0.0
    @xke = 0.0 
    @j2 = 0.0
    @j3 = 0.0
    @j4 = 0.0
    @j3oj2 = 0.0
    
    #       Additional elements to capture relevant TLE and object information:       
    @dia_mm = 0 # RSO dia in mm
    @period_sec = 0.0 # Period in seconds
    @active = 0 # "Active S/C" flag (0=n, 1=y) 
    @not_orbital = 0 # "Orbiting S/C" flag (0=n, 1=y)  
    @rcs_m2 = 0.0 # "RCS (m^2)" storage  

    # temporary variables because the original authors call the same method with different variables
    @ep = 0.0
    @inclp = 0.0
    @nodep = 0.0
    @argpp = 0.0
    @mp = 0.0


    @isimp = 0
    @aycof = 0.0
    @con41 = 0.0
    @cc1 = 0.0
    @cc4 = 0.0
    @cc5 = 0.0
    @d2 = 0.0
    @d3 = 0.0
    @d4 = 0.0
    @delmo = 0.0
    @eta = 0.0
    @argpdot = 0.0
    @omgcof = 0.0
    @sinmao = 0.0
    @t2cof = 0.0
    @t3cof = 0.0
    @t4cof = 0.0
    @t5cof = 0.0
    @x1mth2 = 0.0
    @x7thm1 = 0.0
    @mdot = 0.0
    @nodedot = 0.0
    @xlcof = 0.0
    @xmcof = 0.0
    @nodecf = 0.0

    # deep space
    @irez = 0
    @d2201 = 0.0
    @d2211 = 0.0
    @d3210 = 0.0
    @d3222 = 0.0
    @d4410 = 0.0
    @d4422 = 0.0
    @d5220 = 0.0
    @d5232 = 0.0
    @d5421 = 0.0
    @d5433 = 0.0
    @dedt = 0.0
    @del1 = 0.0
    @del2 = 0.0
    @del3 = 0.0
    @didt = 0.0
    @dmdt = 0.0
    @dnodt = 0.0
    @domdt = 0.0
    @e3 = 0.0
    @ee2 = 0.0
    @peo = 0.0
    @pgho = 0.0
    @pho = 0.0
    @pinco = 0.0
    @plo = 0.0
    @se2 = 0.0
    @se3 = 0.0
    @sgh2 = 0.0
    @sgh3 = 0.0
    @sgh4 = 0.0
    @sh2 = 0.0
    @sh3 = 0.0
    @si2 = 0.0
    @si3 = 0.0
    @sl2 = 0.0
    @sl3 = 0.0
    @sl4 = 0.0
    @gsto = 0.0
    @xfact = 0.0
    @xgh2 = 0.0
    @xgh3 = 0.0
    @xgh4 = 0.0
    @xh2 = 0.0
    @xh3 = 0.0
    @xi2 = 0.0
    @xi3 = 0.0
    @xl2 = 0.0
    @xl3 = 0.0
    @xl4 = 0.0
    @xlamo = 0.0
    @zmol = 0.0
    @zmos = 0.0
    @atime = 0.0
    @xli = 0.0
    @xni = 0.0
    @snodm = 0.0
    @cnodm = 0.0
    @sinim = 0.0
    @cosim = 0.0
    @sinomm = 0.0
    @cosomm = 0.0
    @day = 0.0
    @emsq = 0.0
    @gam = 0.0
    @rtemsq = 0.0 
    @s1 = 0.0
    @s2 = 0.0
    @s3 = 0.0
    @s4 = 0.0
    @s5 = 0.0
    @s6 = 0.0
    @s7 = 0.0 
    @ss1 = 0.0
    @ss2 = 0.0
    @ss3 = 0.0
    @ss4 = 0.0
    @ss5 = 0.0
    @ss6 = 0.0
    @ss7 = 0.0
    @sz1 = 0.0
    @sz2 = 0.0
    @sz3 = 0.0
    @sz11 = 0.0
    @sz12 = 0.0
    @sz13 = 0.0
    @sz21 = 0.0
    @sz22 = 0.0
    @sz23 = 0.0
    @sz31 = 0.0
    @sz32 = 0.0
    @sz33 = 0.0
    @z1 = 0.0
    @z2 = 0.0
    @z3 = 0.0
    @z11 = 0.0
    @z12 = 0.0
    @z13 = 0.0
    @z21 = 0.0
    @z22 = 0.0
    @z23 = 0.0
    @z31 = 0.0
    @z32 = 0.0
    @z33 = 0.0
    @argpm = 0.0
    @inclm = 0.0
    @nodem = 0.0
    @dndt = 0.0
    @eccsq = 0.0
        
    # for initl
    @ainv = 0.0
    @ao = 0.0
    @con42 = 0.0
    @cosio = 0.0
    @cosio2 = 0.0
    @omeosq = 0.0
    @posq = 0.0
    @rp = 0.0
    @rteosq = 0.0
    @sinio = 0.0
  end
end
