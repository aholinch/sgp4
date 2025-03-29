source('ElsetRec.R')
source('SGP4.R')


TLE <- setRefClass("TLE", fields=list(
    rec = "ANY",
    line1 = "character",
    line2 = "character",
    intlid = "character",
    objectID = "character",
    epoch = "numeric",
    ndot = "numeric",
    nddot = "numeric",
    bstar = "numeric",
    elnum = "integer",
    incDeg = "numeric",
    raanDeg = "numeric",
    ecc = "numeric",
    argpDeg = "numeric",
    maDeg = "numeric",
    n = "numeric",
    revnum = "integer",
    parseErrors = "character",
    sgp4Error = "numeric"
),

methods = list(
    parseLines = function(l1,l2){
        parseErrors <<- ""
        line1 <<- l1
        line2 <<- l2

        if(nchar(line1) < 68)
        {
            parseErrors <<- "line1 is too short"
            return (0)
        }

        if(nchar(line2) < 68)
        {
            parseErrors <<- "line is too short"
            return (0)
        }

        rec <<- ElsetRec()

        rec$initVals()

        rec$classification <<-substr(line1,8,8) 
        rec$whichconst <<- wgs72
        objectID <<- trimws(substr(line1,3,7))
        intlid <<- trimws(substr(line1,10,18))
        ndot <<- gdi(substr(line1,34,34),line1,36,43)
        nddot <<- gdi(substr(line1,45,45),line1,46,50)
        nddot <<- nddot * (10.0^gd(line1,51,52))
        bstar <<- gdi(substr(line1,54,54),line1,55,59)
        bstar <<- bstar * (10.0^gd(line1,60,61))
        elnum <<- as.integer(gd(line1,64,68))

        epoch <<- parseEpoch(substr(line1,19,33))

#                1         2         3         4         5         6
#       123456789012345678901234567890123456789012345678901234567890123456789
#line1="1 00005U 58002B   00179.78495062  .00000023  00000-0  28098-4 0  4753";

        incDeg <<- gd(line2,9,16)
        raanDeg <<- gd(line2,18,25)
        ecc <<- gdi("+",line2,27,33)
        argpDeg <<- gd(line2,35,42)
        maDeg <<- gd(line2,44,51)
        n <<- gd(line2,53,63)
        revnum <<- as.integer(gd(line2,64,68))

#                1         2         3         4         5         6
#       123456789012345678901234567890123456789012345678901234567890123456789
#line2="2 00005  34.2682 348.7242 1859667 331.7664  19.3264 10.82419157413667";

        setValsToRec()

    },

    getRVForDate = function(d){

        t = as.double(difftime(d,as.Date("1970-01-01"),units="secs"))
        t = t*1000.0
        t = t-epoch
        t = t/60000.0

        rec$rv<<-c(0,0,0)
        rec$vv<<-c(0,0,0)

        sgp4(rec,t)
        r = c(rec$rv[1],rec$rv[2],rec$rv[3])
        v = c(rec$vv[1],rec$vv[2],rec$vv[3])

        rv = c(r,v)
        return (rv)
    },


    getRV = function(minsSinceEpoch){
        rec$rv<<-c(0,0,0)
        rec$vv<<-c(0,0,0)
        sgp4(rec,minsSinceEpoch)
        r = c(rec$rv[1],rec$rv[2],rec$rv[3])
        v = c(rec$vv[1],rec$vv[2],rec$vv[3])

        rv = c(r,v)
        return (rv)
    },

    gd = function(str, i1, i2){
        v = as.numeric(substr(str,i1,i2))
        return(v)
    },

    gdi = function(signs,str, i1, i2){
        s = paste0("0.",substr(str,i1,i2))
        v = as.numeric(s)
        if(signs=="-")
        {
            v = -1.0*v
        }
        return(v)
    },

    setValsToRec = function(){
        deg2rad = pi/180.0
        xpdotp = 1440.0 / (2.0*pi)

        rec$elnum <<- elnum
        rec$revnum <<- revnum
        rec$satid <<- objectID
        rec$bstar <<- bstar
        rec$inclo <<- incDeg*deg2rad
        rec$nodeo <<- raanDeg*deg2rad
        rec$argpo <<- argpDeg*deg2rad
        rec$mo <<- maDeg*deg2rad
        rec$ecco <<- ecc
        rec$no_kozai <<- n/xpdotp
        rec$ndot <<- ndot/(xpdotp*1440.0)
        rec$nddot <<- nddot/(xpdotp*1440.0*1440.0)

        sgp4init('a',rec)
    },

    parseEpoch = function(str){
        year = gd(str,1,2)
        rec$epochyr <<- year
        if(year > 56)
        {
            year = year + 1900
        }
        else
        {
            year = year + 2000
        }

        doy = gd(str,3,5)
        dfrac = gdi("+",str,7,14)
        rec$epochdays <<- doy+dfrac

        dfrac = dfrac*24.0
        hr = as.integer(dfrac)
        dfrac = 60.0*(dfrac-hr)
        mn = as.integer(dfrac)
        dfrac = 60.0*(dfrac-mn)
        sc = as.integer(dfrac)
        sec = dfrac
        dfrac = 1000.0*(dfrac-sc)
        milli = as.integer(dfrac)

        days = c(31,28,31,30,31,30,31,31,30,31,30,31)
        if(isLeap(year))
        {
            days[2]=29
        }

        day = doy
        ind = 1
        while(ind < 12 && day > days[ind])
        {
            day = day-days[ind]
            ind = ind+1 
        }
        mon = ind

        v <- jday(year,mon,day,hr,mn,sec)
        rec$jdsatepoch <<- v[1]
        rec$jdsatepochF <<- v[2]

        diff = rec$jdsatepoch - 2440587.5;
        diff2 = rec$jdsatepochF;

        epc = diff+diff2;
        epc = epc*86400.0
	epc = epc*1000.0

        return (epc)
    },

    isLeap = function(year){
        if(year %% 4 > 0)
        {
            return (FALSE)
        }

        if(year %% 100 == 0)
        {
            if(year %% 400 == 0)
            {
                return (TRUE)
            }

            return (FALSE)
        }

        return (TRUE)
    }
)
) 
