%% Two line element set
%% Author: aholinch
classdef TLE < handle
  properties

    rec = 0;
    
    line1 = '';
    line2 = '';
    
    intlid = '';
    objectID = '';
    epoch = 0;
    ndot = 0;
    nddot = 0;
    bstar = 0;
    elnum = 0;
    incDeg = 0;
    raanDeg = 0;
    ecc = 0;
    argpDeg = 0;
    maDeg = 0;
    n = 0;
    revnum = 0;
    
    sgp4Error = 0;
  % end properties
  end

  methods    
    function obj = TLE(l1, l2)
        parseLines(obj,l1,l2);
    end

    function parseLines(this, l1, l2)
    	this.rec = elsetrec();
    	this.line1 = l1;
    	this.line2 = l2;
        line1 = l1;
        line2 = l2;

        this.objectID = strtrim(line1(3:7));
        while(this.objectID(1)=="0")
            this.objectID = this.objectID(2:length(this.objectID));
        end

        this.intlid = strtrim(line1(10:18));
        tmp = line1(34:43);
        tmp(1) = '0';
        this.ndot = str2double(tmp);

        tm = 1;
        if strcmp('-',line1(45:45))
            tm = -1;
        end
        tmp = line1(44:50);
        tmp(1) ='0';
        tmp(2) ='.';
        this.nddot = str2double(tmp);
        ev = str2double(line1(51:52));
        this.nddot = this.nddot * (10^ev);
        this.nddot = tm*this.nddot;

        tm = 1;
        if strcmp('-',line1(54:54))
            tm = -1;
        end
        tmp = line1(53:59);
        tmp(1) ='0';
        tmp(2) ='.';
        this.bstar = str2double(tmp);
        ev = str2double(line1(60:61));
        this.bstar = this.bstar * (10^ev);
        this.bstar = tm*this.bstar;

        this.elnum = str2double(strtrim(line1(65:68)));
%          1         2         3         4         5         6
%0123456789012345678901234567890123456789012345678901234567890123456789
% 1 00005U 58002B   00179.78495062  .00000023  00000-0  28098-4 0  4753";
% 2 00005  34.2682 348.7242 1859667 331.7664  19.3264 10.82419157413667";
        this.epoch = parseEpoch(this,line1(19:32));
        this.incDeg = str2double(strtrim(line2(9:16)));
        this.raanDeg = str2double(strtrim(line2(18:25)));
        tmp = line2(25:33);
        tmp(1)='0';
        tmp(2)='.';
        this.ecc = str2double(strtrim(tmp));
        this.argpDeg = str2double(strtrim(line2(35:42)));
        this.maDeg = str2double(strtrim(line2(44:51)));
        this.n = str2double(strtrim(line2(53:63)));
        this.revnum = str2double(strtrim(line2(64:68)));

        this.rec.classification = line1(8);
        setValsToRec(this)
    end

    function setValsToRec(this)
        deg2rad = pi / 180.0;          %   0.0174532925199433
        xpdotp = 1440.0 / (2.0 * pi);  % 229.1831180523293

        this.rec.elnum = this.elnum;
        this.rec.revnum = this.revnum;
        this.rec.satid = this.objectID;
        this.rec.bstar = this.bstar;
        this.rec.inclo = this.incDeg*deg2rad;
        this.rec.nodeo = this.raanDeg*deg2rad;
        this.rec.argpo = this.argpDeg*deg2rad;
        this.rec.mo = this.maDeg*deg2rad;
        this.rec.ecco = this.ecc;
        this.rec.no_kozai = this.n/xpdotp;
        this.rec.ndot = this.ndot / (xpdotp*1440.0);
        this.rec.nddot = this.nddot / (xpdotp*1440.0*1440.0);
        SGP4.sgp4init('a', this.rec);
    end

    function ep = parseEpoch(this,str)
        year = str2double(strtrim(str(1:2)));
        if(year > 56)
            year = year + 1900;
        else
            year = year + 2000;
        end 

        doy = str2double(strtrim(str(3:5)));
        str(5) = '0';
        dfrac = str2double(strtrim(str(5:14)));
        dfrac = 24.0*dfrac;
        hr = floor(dfrac);
        dfrac = 60.0*(dfrac-hr);
        min = floor(dfrac);
        dfrac = 60.0*(dfrac-min);
        sec = dfrac;
        sc = floor(dfrac);
        milli = 1000.0*(dfrac-sc);

        mons = [31 28 31 30 31 30 31 31 30 31 30 31];

        % some distros don't have this function
        %if(is_leap_year(year))
        il = ((rem (year, 4) == 0 & rem (year, 100) ~= 0) | rem (year, 400) == 0);
        if(il)
            mons(2) = 29;
        end

        mon = 1;
        days = doy;
        while( mon < 12 && days > mons(mon))
            days = days - mons(mon);
            mon = mon + 1;
        end

        jda = SGP4.jday(year,mon,days,hr,min,sec);
        this.rec.jdsatepoch = jda(1);
        this.rec.jdsatepochF = jda(2);
        ep = 0;
    end

    function rv = getRV(this,minutesAfterEpoch)
    	this.rec.error = 0;
        rvhand = rvhandle();
    	SGP4.sgp4(this.rec, minutesAfterEpoch, rvhand);
    	this.sgp4Error = this.rec.error;
        r = rvhand.r;
        v = rvhand.v;
        rv = [r v];
    end
  % end methods
  end

% end class
end
