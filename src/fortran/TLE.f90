MODULE TLEMOD
  USE ElsetRecMod
  USE SGP4Mod

  TYPE TLE_TYPE
    TYPE(ElsetRec) rec
    CHARACTER*70 line1
    CHARACTER*70 line2
    CHARACTER*12 intlid 
    CHARACTER*5 objectID
    INTEGER*8 epoch
    REAL*8 ndot
    REAL*8 nddot
    REAL*8 bstar
    INTEGER*4 elnum
    REAL*8 incDeg
    REAL*8 raanDeg
    REAL*8 ecc
    REAL*8 argpDeg
    REAL*8 maDeg
    REAL*8 n
    INTEGER*4 revnum
    INTEGER*4 sgp4Error
  END TYPE TLE_TYPE

  CONTAINS

  SUBROUTINE getRVForDate(tle, millisSince1970, r, v)
    TYPE(TLE_TYPE), intent(inout) :: tle
    INTEGER*8, intent(in) :: millisSince1970
    REAL*8, dimension(3), intent(inout) :: r,v
    REAL*8 diff

    diff = millisSince1970 - tle%epoch
    diff = diff/60000.0d0

    call getRV(tle,diff,r,v)

  END SUBROUTINE getRVForDate

  SUBROUTINE getRV(tle, minutesAfterEpoch, r, v)
    TYPE(TLE_TYPE), intent(inout) :: tle
    REAL*8, intent(in) :: minutesAfterEpoch 
    REAL*8, dimension(3), intent(inout) :: r,v
    LOGICAL flag

    tle%rec%error = 0
    flag = sgp4(tle%rec, minutesAfterEpoch, r, v)
    tle%sgp4Error = tle%rec%error

  END SUBROUTINE getRV

  SUBROUTINE setValsToRec(tle, rec)
    TYPE(TLE_TYPE), intent(inout) :: tle
    TYPE(ElsetRec), intent(inout) :: rec
    REAL*8 xpdotp
    LOGICAL flag

    xpdotp = 1440.0d0 / twopi

    rec%elnum = tle%elnum
    rec%revnum = tle%revnum
    rec%satID = tle%objectID
    rec%bstar = tle%bstar
    rec%inclo = tle%incDeg*deg2rad
    rec%nodeo = tle%raanDeg*deg2rad
    rec%argpo = tle%argpDeg*deg2rad
    rec%mo = tle%maDeg*deg2rad
    rec%ecco = tle%ecc
    rec%no_kozai = tle%n/xpdotp
    rec%ndot = tle%ndot / (xpdotp*1440.0d0)
    rec%nddot = tle%nddot / (xpdotp*1440.0d0*1440.0d0)
        
    flag = sgp4init('a', rec)
  END SUBROUTINE setValsToRec

  REAL*8 function gd(str,ind1,ind2)
    character(len=*) :: str
    character(len=100) :: str2
    integer :: ind1
    integer :: ind2
    str2=TRIM(str(ind1+1:ind2))
    read(str2,*)gd
  end function gd

  REAL*8 function gdi(str,ind1,ind2)
    character(len=*) :: str
    character(len=100) :: str2
    integer :: ind1
    integer :: ind2
    str2='0.' // TRIM(str(ind1+1:ind2))
    read(str2,*)gdi
  end function gdi

  LOGICAL function isLeap(year)
    INTEGER*4, intent(in) :: year
    LOGICAL ilf

    ilf = .FALSE.

    if(mod(year,4) .EQ. 0) then

      ilf = .TRUE.

      if(mod(year,100) .EQ. 0) then

        ilf = .FALSE.

        if(mod(year,400) .EQ. 0) then
          ilf = .TRUE.
        end if

      end if

    end if

    isLeap = ilf

  end function isLeap 

    
  SUBROUTINE parseLines(tle, line1, line2)
    TYPE(TLE_TYPE), intent(inout) :: tle
    character(len=*), intent(in) :: line1, line2

    tle%rec%whichconst=wgs72

!    // copy the lines
    tle%line1 = line1(1:69)
    tle%line2 = line2(1:69)

!           //              1         2         3         4         5         6
!               //0123456789012345678901234567890123456789012345678901234567890123456789
!        //line1="1 00005U 58002B   00179.78495062  .00000023  00000-0  28098-4 0  4753"
!        //line2="2 00005  34.2682 348.7242 1859667 331.7664  19.3264 10.82419157413667"

!    // intlid
    tle%intlid = line1(10:17)

    tle%rec%classification=line1(8:8)

    tle%objectID = line1(3:8)

    tle%ndot = gdi(line1,35,44)
    if(line1(34:34) .EQ. '-') then
      tle%ndot = -1.0d0*tle%ndot
    end if

    tle%nddot = gdi(line1,45,50)
    if(line1(45:45).EQ.'-') then
      tle%nddot = -1.0d0*tle%nddot
    end if
    tle%nddot = tle%nddot * 10.0d0**gd(line1,50,52)

    tle%bstar = gdi(line1,54,59)
    if(line1(54:54).EQ.'-') then
      tle%bstar = -1.0d0*tle%bstar
    end if
    tle%bstar = tle%bstar * 10.0d0**gd(line1,59,61)
        
    tle%elnum = int(gd(line1,64,68))

    tle%incDeg = gd(line2,8,16)
    tle%raanDeg = gd(line2,17,25)
    tle%ecc = gdi(line2,26,33)
    tle%argpDeg = gd(line2,34,42)
    tle%maDeg = gd(line2,43,51)
    tle%n = gd(line2,52,63)
    tle%revnum = int(gd(line2,63,68))

    tle%sgp4Error = 0

    tle%epoch = parseEpoch(tle%rec,line1(19:32))

    call setValsToRec(tle, tle%rec)
  END SUBROUTINE parseLines

  INTEGER*8 function parseEpoch(rec, str)
    TYPE(ElsetRec), intent(inout) ::  rec
    character(len=*), intent(in) :: str
    character*16 tmp, tmp2
    character*2 tmp2a
    character*3 tmp2b
    real*8 dfrac, odfrac, sec, diff, diff2
    integer*4 year, doy, hr, mn, sc, milli, mon, day, ind
    integer*8 epoch
    integer,dimension(12) :: days=(/31,28,31,30,31,30,31,31,30,31,30,31/)

    tmp = str

    tmp2a = tmp
    read(tmp2a,*),year

        
    rec%epochyr=year
    if(year .GT. 56) then
        year = year + 1900
    else
        year = year + 2000
    end if
 
    tmp2b = tmp(3:5)
    read(tmp2b,*),doy 

    dfrac = gdi(tmp,6,14)
    odfrac = dfrac        

    rec%epochdays = doy + dfrac
        
        
    dfrac = dfrac*24.0
    hr = int(dfrac)

    dfrac = 60.0*(dfrac - hr)
    mn = int(dfrac)
    dfrac = 60.0*(dfrac - mn)
    sc = int(dfrac)
        
        
    dfrac = 1000.0*(dfrac-sc)
    milli = int(dfrac)

    sec = (sc)+dfrac/1000.0

    mon = 0
    day = 0
       
!    // convert doy to mon, day
    if(isLeap(year)) then
      days(2)=29
    else
      days(2)=28   ! have to reset it
    end if

    ind = 1
    do while(ind<13 .AND. doy .GT. days(ind))        
      doy = doy - days(ind)
      ind = ind+1
    end do
!    int ind = 0
!    while(ind < 12 && doy > days[ind])
!    {
!        doy -= days[ind]
!        ind++
!    }
    mon = ind
    day = doy

    call jday(year, mon, day, hr, mn, sec, rec%jdsatepoch, rec%jdsatepochF)

    diff = rec%jdsatepoch - 2440587.5d0
    diff2 = 86400000.0d0*rec%jdsatepochF
    diff = diff*86400000.0d0

!    epoch = int(diff2)
!    epoch = epoch+int(diff)
    epoch = diff +diff2

    parseEpoch = epoch

  end function parseEpoch

END MODULE TLEMOD
