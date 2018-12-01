import json
from TLE import TLE
from math import sqrt

cnt = 0
rerr = 0
verr = 0

# compare the propagated TLE to entries
def check(tle, entries, lastrv):
    for entry in entries:
        lastrv = checkRV(tle,entry,lastrv)

    return lastrv

def checkRV(tle,entry,lastrv):
    min = entry['minutesSinceEpoch']
    rv = tle.getRV(min)

    if(tle.sgp4Error == 0):
        rdist = dist(rv[0],entry['r'])
        vdist = dist(rv[1],entry['v'])
    else:
        rdist = dist(lastrv[0],entry['r'])
        vdist = dist(lastrv[1],entry['v'])

    if(rdist > 1.2e-7 or vdist > 1e-8):
#        print tle.objectNum, min, rdist, vdist, tle.sgp4Error
# an attempt at making python2/3 independent printing
        print("\nError")
        print(tle.objectNum)
        print(min)
        print(rdist)
        print(vdist)
        print(tle.sgp4Error)

    global cnt
    global rerr
    global verr
    cnt = cnt+1
    rerr = rerr + rdist
    verr = verr + vdist
    return rv

# two-norm vec3
def dist(v1, v2):
    tmp = 0
    tot = 0 

    tmp = v1[0]-v2[0]
    tot += tmp*tmp
    tmp = v1[1]-v2[1]
    tot += tmp*tmp
    tmp = v1[2]-v2[2]
    tot += tmp*tmp

    return sqrt(tot)



# Read JSON
verinlist = 0 
veroutlist = 0

# read tles
with open('../../data/sgp4-ver.json') as json_file:  
    verinlist = json.load(json_file)

# read output
with open('../../data/sgp4-ver.out.json') as json_file:  
    veroutlist = json.load(json_file)

# loop over tles
ind = 0
verout = 0
lastrv = [[0,0,0],[0,0,0]]
for verin in verinlist:
    verout = veroutlist[ind]
    tle = TLE(verin['line1'],verin['line2'])

    # the original verification had a loop where rv were not reset, 
    # so in case of an error we need the previous rv
    lastrv = check(tle,verout['entries'],lastrv)

    ind=ind+1

rerr = rerr/cnt
verr = verr/cnt
print("Typical Errors")
print(1e6*rerr)
print("mm")
print(1e6*verr)
print("mm/s")
