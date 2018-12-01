% verify sgp4 implementation by looping over verification output
% and simulated tles for corresponding mins since epoch

% count tles
fid = fopen('../../data/SGP4-VER.TLE');
tlecnt = 0;
line1 = fgetl(fid);
while ischar(line1)
    if(line1(1)=='1')
        tlecnt = tlecnt +1;
    end
    line1 = fgetl(fid);
end

fclose(fid);

% create tle cell array
tles = cell(tlecnt);

fid = fopen('../../data/SGP4-VER.TLE');

ind = 1;
line1 = fgetl(fid);
while ischar(line1)
    if(line1(1)=='1')
        line2 = fgetl(fid);
        tle = TLE(line1,line2);
        tles{ind} = tle;
        ind = ind+1;
    end
    line1 = fgetl(fid);
end

fclose(fid);

curobj = 0;
strind = 0;
ind = 0;
prevrv = 0;

% loop over verification file to compute rv for various tles and times
fid = fopen('../../data/tcppver.out');
line1 = fgetl(fid);
cnt = 0;
rerr = 0;
verr = 0;
while ischar(line1)
    strind = strfind(line1,'xx'); 
    if(strind > 0)
        %% get object number
        curobj = str2double(strtrim(line1(1:strind-1)));

        %% find tle with matching object number
        ind = 1;
        while(ind <= tlecnt && tles{ind}.objectNum ~= curobj)
            ind = ind+1;
        end
        tle = tles{ind};

    elseif(curobj > 0)

        %% get RV for specified number of minutes
        verout = sscanf(line1,'%f');
        rv = tle.getRV(verout(1));
        %% original code reused rv so if there is an error we need to carry old values
        if(tle.sgp4Error > 0)
            rv = prevrv;
        end

        rdist = sqrt( (rv(1)-verout(2))^2 + (rv(2)-verout(3))^2 + (rv(3)-verout(4))^2);
        vdist = sqrt( (rv(4)-verout(5))^2 + (rv(5)-verout(6))^2 + (rv(6)-verout(7))^2);
        cnt = cnt+1;
        rerr = rerr+rdist;
        verr = verr+vdist;
        if(rdist > 1e-7 || vdist > 1e-9)
            sprintf('%d\t%d\t%.15f\t%.15f\n',curobj,verout(1),rdist,vdist)
        end

        prevrv = rv;
    end

    line1 = fgetl(fid);
end
fclose(fid);
verr =verr/cnt;
rerr = rerr/cnt;

sprintf('Typical errors r=%E mm\tv=%E mm/s\n',(1e6*rerr),(1e6*verr))
