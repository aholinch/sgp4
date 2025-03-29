source('TLE.R')

getrv = function(l){
   # there are better "R" ways to do this indexing
   rv = c(as.numeric(l[1]),
          as.numeric(l[2]),
          as.numeric(l[3]),
          as.numeric(l[4]),
          as.numeric(l[5]),
          as.numeric(l[6]))
   return (rv)
}

rdist = function(v1,v2){
   sum = 0
   tmp = v1[1]-v2[1]
   sum = tmp*tmp
   tmp = v1[2]-v2[2]
   sum = tmp*tmp
   tmp = v1[3]-v2[3]
   sum = tmp*tmp

   sum = sqrt(sum)
   return (sum)
}

vdist = function(v1,v2){
   sum = 0
   tmp = v1[4]-v2[4]
   sum = tmp*tmp
   tmp = v1[5]-v2[5]
   sum = tmp*tmp
   tmp = v1[6]-v2[6]
   sum = tmp*tmp

   sum = sqrt(sum)
   return (sum)
}

# read tle file
con=file("../../data/SGP4-VER.TLE",open="r")
txt=readLines(con) 
close(con)


# parse tles into list, character version of objectnum is the key
tles = list()

len = length(txt)-1
for(i in 1:len)
{
    line1 = txt[i]
    line2 = txt[i+1]
    if(substr(line1,1,1) == '1' && substr(line2,1,1) == '2')
    {
        tle = TLE()
        tle$parseLines(line1,line2)
        key = tle$objectID
        tles[key] = tle
        while(startsWith(key,"0"))
        {
            key = substr(key,2,nchar(key))
        }
        tles[key] = tle
    }
}


# read the verification file
con=file("../../data/tcppver.out",open="r")
txt=readLines(con) 
close(con)

# loop over lines
len = length(txt)

ind = 1
prevRV = 0
cnt = 0
verr = 0
rerr = 0

while(ind <= len)
{
    line = txt[ind]
    if(grepl("xx",line))
    {
        si = grepRaw("xx",line)
        key = substr(line,1,si-2)
        tle = tles[[key]]
    }
    else
    {
        vals = strsplit(trimws(line),"\\s+")[[1]]
        t = as.numeric(vals[1])
        rv = tle$getRV(t)

        if(rv[1]==0 && rv[2] == 0 && rv[3] == 0)
        {
            # original code reused vectors so an error means use old
            rv = prevRV
        }

        vrv = getrv(vals[2:7])

        rd = rdist(rv,vrv)
        vd = vdist(rv,vrv)
        cnt = cnt+1
        verr = verr+vd
        rerr = rerr+rd
        if(rd > 1.5e-8 || vd > 1e-9)
        {
            print(key)
            print(t)
            print(rd)
            print(vd)
        }

        prevRV = rv
    }

    ind = ind+1
}

rerr=rerr/cnt;
verr=rerr/cnt;
summary = sprintf("Typical errors r=%E mm   v=%E mm/s",(1e6*rerr),(1e6*verr))
print(summary)
