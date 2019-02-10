require "date"
require_relative "ElsetRec.rb"
require_relative "SGP4.rb"

#/**
# * This class knows how to parse two line element sets and access the individual elements.
# * 
# * @author aholinch
# *
# */
class TLE
  attr_accessor :rec
  attr_accessor :line1
  attr_accessor :line2
  attr_accessor :intlid
  attr_accessor :objectNum
  attr_accessor :epoch
  attr_accessor :ndot
  attr_accessor :nddot
  attr_accessor :bstar
  attr_accessor :elnum 
  attr_accessor :incDeg 
  attr_accessor :raanDeg
  attr_accessor :ecc
  attr_accessor :argpDeg
  attr_accessor :maDeg
  attr_accessor :n 
  attr_accessor :revnum
  attr_accessor :parseErrors
  attr_accessor :sgp4Error

  def initialize(line1,line2)

    @rec = nil
    @line1 = nil
    @line2 = nil
    @intlid = nil
    @objectNum = 0
    @epoch = nil
    @ndot = 0
    @nddot = 0
    @bstar = 0
    @elnum = 0
    @incDeg = 0
    @raanDeg = 0
    @ecc = 0
    @argpDeg = 0
    @maDeg = 0
    @n = 0
    @revnum = 0
    @parseErrors = nil
    @sgp4Error = 0

    parseLines(line1,line2)

  end
  
  # calcualte RV for date represented as milliseconds since 19700101
  def getRVForDate(t)
    diff = (t-@epoch).to_f
    diff *= 1440.0  
    return getRV(diff)
  end

  def getRV(minutesAfterEpoch)
    r = [0,0,0]
    v = [0,0,0]
      
    @rec.error = 0
    SGP4.sgp4(@rec, minutesAfterEpoch, r, v)
    @sgp4Error = @rec.error
    return [r,v]
  end


   # /**
   #  * Parses the two lines optimistically.  No exceptions are thrown but some parse errors will
   #  * be accumulated as a string.  Call getParseErrors() to see if there are any.
   #  * 
   #  * @param line1
   #  * @param line2
   #  */
  def parseLines(line1, line2)
    @parseErrors = nil
    @rec = ElsetRec.new

    @line1 = line1
    @line2 = line2
      
    @objectNum = gd(line1,2,7).round()
  
    @rec.classification = line1[7]
      #     //          1         2         3         4         5         6
           #//0123456789012345678901234567890123456789012345678901234567890123456789
    #//line1="1 00005U 58002B   00179.78495062  .00000023  00000-0  28098-4 0  4753"
    #//line2="2 00005  34.2682 348.7242 1859667 331.7664  19.3264 10.82419157413667"

    @intlid = line1[9..17].strip

    @epoch = parseEpoch(line1[18..32].strip)

    @ndot = gdi(line1[33],line1,35,44)

    @nddot = gdi(line1[44],line1,45,50)
    exp = line1[50..52].to_f
    @nddot = @nddot * (10.0**exp)

    @bstar = gdi(line1[53],line1,54,59)
    exp = line1[59..61].to_f
    @bstar = @bstar * (10.0**exp)

    @elnum = gd(line1,64,68).to_i
      
    @incDeg = gd(line2,8,16)
    @raanDeg = gd(line2,17,25)
    @ecc = gdi('+',line2,26,33)
    @argpDeg = gd(line2,34,42)
    @maDeg = gd(line2,43,51)
      
    @n = gd(line2,52,63)
      
    @revnum = gd(line2,63,68).to_i

    setValsToRec()
  end
    
  def setValsToRec()
    deg2rad = Math::PI / 180.0         # //   0.0174532925199433
    xpdotp = 1440.0 / (2.0 * Math::PI) # // 229.1831180523293

    @rec.elnum = @elnum
    @rec.revnum = @revnum
    @rec.satnum = @objectNum
    @rec.bstar = @bstar
    @rec.inclo = @incDeg*deg2rad
    @rec.nodeo = @raanDeg*deg2rad
    @rec.argpo = @argpDeg*deg2rad
    @rec.mo = @maDeg*deg2rad
    @rec.ecco = @ecc
    @rec.no_kozai = @n/xpdotp
    @rec.ndot = @ndot / (xpdotp*1440.0)
    @rec.nddot = @nddot / (xpdotp*1440.0*1440.0)
    #puts "n = #{n}"
    #puts xpdotp
    #puts "right after parse koz = #{@rec.no_kozai}" 
    SGP4.sgp4init('a', @rec)
  end

    #/**
    # * Parse the tle epoch format to a date.  
    # * 
    # * @param str
    # * @return
    # */
  def parseEpoch(str)
    year = str[0..1].strip.to_i
    @rec.epochyr = year
    if(year > 56)
      year += 1900
    else
      year += 2000
    end

    doy = str[2..4].strip.to_i
    dfrac = ("0"+str[5..-1]).strip.to_f
    @rec.epochdays = doy
    @rec.epochdays += dfrac
    dfrac *= 24.0
    hr = dfrac.to_i
    dfrac = 60.0*(dfrac-hr)
    mn = dfrac.to_i
    dfrac = 60.0*(dfrac-mn)
    sec = dfrac
    sc = sec.to_i
    micro = 1000000*(dfrac-sc)

    mon = 0
    dys = [31,28,31,30,31,30,31,31,30,31,30,31]
    if isLeap(year)
      dys[1]=29
    end

    while(mon<12 and dys[mon]<doy)
        doy -= dys[mon]
        mon+=1
    end

    mon+=1
    day = doy

    ep = DateTime.new(year,mon,day,hr,mn,sec,0)

    jd = SGP4.jday(year, mon, day, hr, mn, sec)
    @rec.jdsatepoch = jd[0]
    @rec.jdsatepochF = jd[1]

    #ep = jd[0]-2440587.5  # 1970
    #ep = int(ep)
    #ep = ep + jd[1]
    #ep = ep*86400.0
    #ep = ep*1000

    return ep
  end

  def gd(str,i1,i2)
    i2=i2-1
    str[i1..i2].to_f
  end
    
   #/**
   # * parse a double from the substring after adding an implied decimal point.
   # * 
   # * @param str
   # * @param start
   # * @param end
   # * @return
   # */
  def gdi(sign, str, i1, i2)
    gdi2(sign,str,i1,i2,0)
  end
    
   # /**
   #  * parse a double from the substring after adding an implied decimal point.
   #  * 
   #  * @param str
   #  * @param start
   #  * @param end
   #  * @param defVal
   #  * @return
   #  */
  def gdi2(sign, str, i1, i2, defVal)
    num = defVal
    str = "0."+ str[i1..i2]
    num = str.strip.to_f
    if sign == '-'
      num *= -1.0
    end
    num
  end

  def isLeap(year)
    if year % 4 > 0
      return false
    end

    if year % 100 > 0
      return true
    end

    if year % 400 > 0
      return false
    end

    return true
  end


end
