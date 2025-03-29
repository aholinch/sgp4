import math
from ElsetRec import ElsetRec
import SGP4
#/**
# * This class knows how to parse two line element sets and access the individual elements.
# * 
# * @author aholinch
# *
# */
class TLE:
  def __init__(self,line1="",line2=""):
    self.rec = None
    
    self.line1 = None
    self.line2 = None
    
    self.intlid = None
    self.objectID = None
    self.epoch = None
    self.ndot = 0
    self.nddot = 0
    self.bstar = 0
    self.elnum = 0
    self.incDeg = 0
    self.raanDeg = 0
    self.ecc = 0
    self.argpDeg = 0
    self.maDeg = 0
    self.n = 0
    self.revnum = 0
    
    self.parseErrors = None
    
    self.sgp4Error = 0
    
    self.parseLines(line1,line2)


  # calcualte RV for date represented as milliseconds since 19700101
  def getRVForDate(self,t):
    t -= self.epoch
    t/=60000
      
    return self.getRV(t)

  def getRV(self,minutesAfterEpoch):
    r = [0,0,0]
    v = [0,0,0]
      
    self.rec.error = 0
    SGP4.sgp4(self.rec, minutesAfterEpoch, r, v)
    self.sgp4Error = self.rec.error
    return [r,v]

    
   # /**
   #  * Parses the two lines optimistically.  No exceptions are thrown but some parse errors will
   #  * be accumulated as a string.  Call getParseErrors() to see if there are any.
   #  * 
   #  * @param line1
   #  * @param line2
   #  */
  def parseLines(self,line1, line2):
    parseErrors = None
    self.rec = ElsetRec()

    self.line1 = line1
    self.line2 = line2
      
    self.objectID = line1[2:7].strip()
  
    self.rec.classification = line1[7]
      #     //          1         2         3         4         5         6
           #//0123456789012345678901234567890123456789012345678901234567890123456789
    #//line1="1 00005U 58002B   00179.78495062  .00000023  00000-0  28098-4 0  4753"
    #//line2="2 00005  34.2682 348.7242 1859667 331.7664  19.3264 10.82419157413667"

    self.intlid = line1[9:17].strip()
    self.epoch = self.parseEpoch(line1[18:32].strip())
    self.ndot = gdi(line1[33],line1,35,44)

    self.nddot = gdi(line1[44],line1,45,50)
    exp = float(line1[50:52])
    self.nddot *= math.pow(10.0, float(exp))

    self.bstar = gdi(line1[53],line1,54,59)
    exp = float(line1[59:61])
    self.bstar *= math.pow(10.0,exp)

    self.elnum = int(gd(line1,64,68))
      
    self.incDeg = gd(line2,8,16)
    self.raanDeg = gd(line2,17,25)
    self.ecc = gdi('+',line2,26,33)
    self.argpDeg = gd(line2,34,42)
    self.maDeg = gd(line2,43,51)
      
    self.n = gd(line2,52,63)
      
    self.revnum = int(gd(line2,63,68))
      
    self.setValsToRec()



    
  def setValsToRec(self):
    deg2rad = math.pi / 180.0         # //   0.0174532925199433
    xpdotp = 1440.0 / (2.0 * math.pi) # // 229.1831180523293

    self.rec.elnum = self.elnum
    self.rec.revnum = self.revnum
    self.rec.satid = self.objectID
    self.rec.bstar = self.bstar
    self.rec.inclo = self.incDeg*deg2rad
    self.rec.nodeo = self.raanDeg*deg2rad
    self.rec.argpo = self.argpDeg*deg2rad
    self.rec.mo = self.maDeg*deg2rad
    self.rec.ecco = self.ecc
    self.rec.no_kozai = self.n/xpdotp
    self.rec.ndot = self.ndot / (xpdotp*1440.0)
    self.rec.nddot = self.nddot / (xpdotp*1440.0*1440.0)
    
    SGP4.sgp4init('a', self.rec)


    
    #/**
    # * Parse the tle epoch format to a date.  
    # * 
    # * @param str
    # * @return
    # */
  def parseEpoch(self,str):
    year = int(str[0:2].strip())
    self.rec.epochyr = year
    if(year > 56):
      year += 1900
    else:
      year += 2000

    doy = int(str[2:5].strip())
    dfrac = float("0"+str[5:].strip())
    self.rec.epochdays = doy
    self.rec.epochdays += dfrac
    dfrac *= 24.0
    hr = int(dfrac)
    dfrac = 60.0*(dfrac-hr)
    mn = int(dfrac)
    dfrac = 60.0*(dfrac-mn)
    sec = dfrac
    sc = int(sec)
    micro = 1000000*(dfrac-sc)

    mon = 0
    dys = [31,28,31,30,31,30,31,31,30,31,30,31]
    if isLeap(year):
      dys[1]=29

    while(mon<12 and dys[mon]<doy):
        doy -= dys[mon]
        mon+=1

    mon+=1
    day = doy


    jd = SGP4.jday(year, mon, day, hr, mn, sec)
    self.rec.jdsatepoch = jd[0]
    self.rec.jdsatepochF = jd[1]
    ep = jd[0]-2440587.5  # 1970
    ep = int(ep)
    ep = ep + jd[1]
    ep = ep*86400.0
    ep = ep*1000

    return ep
 
    #/**
    # * parse a double from the substring.
    # * 
    # * @param str
    # * @param start
    # * @param end
    # * @return
    # */
def gd(str, start, end):
      return gd2(str,start,end,0)
   

 
    #/**
    # * parse a double from the substring.
    # * 
    # * @param str
    # * @param start
    # * @param end
    # * @param defVal
    # * @return
    # */
def gd2(str, start, end, defVal):
      num = defVal
      num = float(str[start:end].strip())
      #/try{num = Double.parseDouble(str.substring(start,end).trim())}catch(Exception ex){}
      return num

    
    #/**
    # * parse a double from the substring after adding an implied decimal point.
    # * 
    # * @param str
    # * @param start
    # * @param end
    # * @return
    # */
def gdi(sign, str, start,  end):
      return gdi2(sign,str,start,end,0)
    
   # /**
   #  * parse a double from the substring after adding an implied decimal point.
   #  * 
   #  * @param str
   #  * @param start
   #  * @param end
   #  * @param defVal
   #  * @return
   #  */
def gdi2(sign, str, start, end, defVal):
      num = defVal
      num = float(("0."+ str[start:end]).strip())
      #try{num = Double.parseDouble("0."+str.substring(start,end).trim())}catch(Exception ex){}
      if(sign == '-'):
        num *= -1.0
      return num


def isLeap(year):
    if year % 4 > 0:
      return False

    if year % 100 > 0:
      return True

    if year % 400 > 0:
      return False

    return True


