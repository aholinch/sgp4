require "json"
require_relative "TLE.rb"


$cnt = 0
$rerr = 0
$verr = 0

# compare the propagated TLE to entries
def check(tle, entries, lastrv)
    for entry in entries
        lastrv = checkRV(tle,entry,lastrv)
    end
    return lastrv
end

def checkRV(tle,entry,lastrv)
    min = entry['minutesSinceEpoch']
    rv = tle.getRV(min)

    if(tle.sgp4Error == 0)
        rdist = dist(rv[0],entry['r'])
        vdist = dist(rv[1],entry['v'])
    else
        rdist = dist(lastrv[0],entry['r'])
        vdist = dist(lastrv[1],entry['v'])
    end

    if(rdist > 1.2e-7 or vdist > 1e-8)
        puts "Error #{tle.objectNum} #{min} #{rdist} #{vdist} #{tle.sgp4Error}"
    end

    $cnt = $cnt+1
    $rerr = $rerr + rdist
    $verr = $verr + vdist
    return rv
end

# two-norm vec3
def dist(v1, v2)
    tmp = 0
    tot = 0 

    tmp = v1[0]-v2[0]
    tot += tmp*tmp
    tmp = v1[1]-v2[1]
    tot += tmp*tmp
    tmp = v1[2]-v2[2]
    tot += tmp*tmp

    return Math.sqrt(tot)
end


# Read JSON
verinlist = 0 
veroutlist = 0

# read tles
file = File.read('../../data/sgp4-ver.json')
verinlist = JSON.parse(file)

# read output
file = File.read('../../data/sgp4-ver.out.json')
veroutlist = JSON.parse(file)

# loop over tles
ind = 0
verout = 0
lastrv = [[0,0,0],[0,0,0]]
for verin in verinlist
    verout = veroutlist[ind]
    tle = TLE.new(verin['line1'],verin['line2'])

    # the original verification had a loop where rv were not reset, 
    # so in case of an error we need the previous rv
    lastrv = check(tle,verout['entries'],lastrv)

    ind=ind+1
end

$rerr = $rerr/$cnt
$verr = $verr/$cnt
puts "Typical Errors #{1e6*$rerr} mm, #{1e6*$verr} mm/s"
