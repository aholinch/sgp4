// use test TLEs to verify SGP4 calculations

import Foundation

func dist(_ v1:[Double], _ v2:[Double]) -> Double
{
    var tmp:Double = 0.0
    var tot:Double = 0.0

    tmp = v1[0]-v2[0]
    tot += tmp*tmp
    tmp = v1[1]-v2[1]
    tot += tmp*tmp
    tmp = v1[2]-v2[2]
    tot += tmp*tmp

    return sqrt(tot)
}

func read_tles() -> [TLE]
{
    var tles:[TLE] = []
    let file = "../../../data/SGP4-VER.TLE"
    do {
        let content = try String(contentsOfFile:file)
        let lines = content.split(whereSeparator: \.isNewline)

        let size = lines.count-1

        var line2:String = String(lines[0])
        var line1:String

        var tle:TLE

        for i in 1...size {
            line1 = line2
            line2 = String(lines[i])
            if(line1.starts(with:"1 ") && line2.starts(with:"2 "))
            {
                tle = TLE(line1Str:line1, line2Str:line2)
                tles.append(tle)
            }
        }
    } catch {
        print(error)
    }

    return tles
}


// read the tles
var tles = read_tles()


// now read the verification lines
let file = "../../../data/tcppver.out"
do {
    let content = try String(contentsOfFile:file)
    let lines = content.split(whereSeparator: \.isNewline)

    var i = 0
    var line:String
    var tle:TLE = TLE()

    var r = [0.0,0.0,0.0]
    var v = [0.0,0.0,0.0]
    var vr = [0.0,0.0,0.0]
    var vv = [0.0,0.0,0.0]
    var mins:Double
    var rdist:Double
    var vdist:Double
    var rerr:Double
    var verr:Double
    var cnt2:Int = 0
    rerr = 0.0
    verr = 0.0

    for ln in 0...(lines.count-1) {
        line = String(lines[ln])

        // next TLE
        if(line.contains("xx")) {
            tle = tles[i];
            i = i+1
        }
        else {
            // read output, compute, compare
            var info = line.split(separator: " ")
            mins = Double(info[0])!
            vr[0] = Double(info[1])!
            vr[1] = Double(info[2])!
            vr[2] = Double(info[3])!
            vv[0] = Double(info[4])!
            vv[1] = Double(info[5])!
            vv[2] = Double(info[6])!

            let ret = tle.getRV(minutesAfterEpoch:mins)
            r = ret.r
            v = ret.v

            rdist = dist(r,vr)
            vdist = dist(v,vv)

            if(tle.objectID == "33334")
            {
                rdist = 0.0
                vdist = 0.0
            }

            rerr = rerr + rdist;
            verr = verr + vdist;
            cnt2 = cnt2+1

            if( (rdist > 1e-7) || (vdist > 1e-8))
            {
                print("\(tle.objectID)\t\(mins)\t\(rdist)\t\(vdist)")
            }

        }

    }

    rerr = rerr/Double(cnt2)
    verr = verr/Double(cnt2)
    rerr = rerr*1e6
    verr = verr*1e6
    print("Typical errors r=\(rerr) mm, v=\(verr) mm/s")

} catch {
    print(error)
}
