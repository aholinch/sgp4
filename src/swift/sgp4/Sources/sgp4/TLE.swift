// This module knows how to parse two line element sets and access the individual elements.
// 
// @author aholinch

import Foundation

class TLE {
    var rec: ElsetRec = ElsetRec()
    var line1: String = ""
    var line2: String = ""
    var intlid: String = ""
    var objectID: String = "" 
    var epoch: Date = Date()

    var ndot: Double = 0
    var nddot: Double = 0
    var bstar: Double = 0
    var elnum: Int64 = 0
    var inc_deg: Double = 0
    var raan_deg: Double = 0
    var ecc: Double = 0
    var argp_deg: Double = 0
    var ma_deg: Double = 0
    var n: Double = 0
    var revnum: Int64 = 0
    var parse_errors: String = ""
    var sgp4_error: Int32 = 0
    
    init(){
    }

    init(line1Str: String, line2Str: String){
        self.parseLines(line1Str, line2Str)
    }

    func parseLines(_ line1Str: String, _ line2Str: String){
        line1 = line1Str
        line2 = line2Str

        // line1
        objectID = trim(substr(line1,2,7))
        elnum = Int64(gd(line1,64,68))
        intlid = trim(substr(line1,9,17))
        rec.classification = Character(trim(substr(line1,7,8)))

        epoch = parseEpoch(substr(line1,18,32))
        let df = DateFormatter()
        df.dateFormat = "y-MM-dd H:m:ss.SSSS"

        ndot = gdi(33,line1,35,44)
        nddot = gdi(44,line1,45,50)
        var exp = gd(line1,50,52)
        nddot = nddot * pow(10.0,exp)
        bstar = gdi(53,line1,54,59)
        exp = gd(line1,59,61)
        bstar = bstar * pow(10.0,exp)

        // line2
        inc_deg = gd(line2,8,16)
        raan_deg = gd(line2,17,25)
        ecc = gdi(-1,line2,26,33)
        argp_deg = gd(line2,34,42)
        ma_deg = gd(line2,43,51)

        n = gd(line2,52,63)

        revnum = Int64(gd(line2,63,68))


        self.setValsToRec()
    }

    func setValsToRec() {

        let deg2rad = 0.0174532925199433
        let xpdotp = 229.1831180523293

        rec.elnum = elnum;
        rec.revnum = revnum;
        rec.satid = objectID;
        rec.intldesg = intlid;
        rec.bstar = bstar;
        rec.inclo = inc_deg*deg2rad;
        rec.nodeo = raan_deg*deg2rad;
        rec.argpo = argp_deg*deg2rad;
        rec.mo = ma_deg*deg2rad;
        rec.ecco = ecc;
        rec.no_kozai = n/xpdotp;
        rec.ndot = ndot / (xpdotp*1440.0);
        rec.nddot = nddot / (xpdotp*1440.0*1440.0)


        SGP4.sgp4init("a",&rec);

    }

    func parseEpoch(_ str:String) -> Date{
        var year = Int(gd(str,0,2))
        rec.epochyr = Int32(year)

        if(year > 56) {
            year += 1900
        } else {
            year += 2000
        }
        let doy = Int(gd(str,2,5))
        var dfrac = gdi(-1,str,6,str.count)

        rec.epochdays = Double(doy)
        rec.epochdays = rec.epochdays+dfrac

        dfrac *= 24.0
        let hr = Int(dfrac)
        dfrac = 60.0*(dfrac-Double(hr))
        let mn = Int(dfrac)
        dfrac = 60.0*(dfrac-Double(mn))
        let sc = Int(dfrac) 
        dfrac = 1000000.0*(dfrac-Double(sc))
        let micro = Int(dfrac)


        let utc = TimeZone(identifier: "UTC")!
        //TimeZone.ReferenceType.default = utc

        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = utc
        let dateComponents = DateComponents(calendar: calendar, timeZone:utc,
                                    year: year-1,
                                    month: 12,
                                    day: 31, hour: hr, minute: mn, second: sc, nanosecond: 1000*micro)
        var date = calendar.date(from:dateComponents)!

        // adding seems to bring in daylight savings time even though timezone is set to utc, that's why ReferenceType.default = utc
        date = calendar.date(byAdding: .day, value: Int(doy), to: date)!

        let sec:Double = Double(sc)+Double(micro)/1000000.0

        let comp = calendar.dateComponents([.month,.day], from: date)
        let mon = Int(comp.month!)
        let day = Int(comp.day!) 
        let retv = SGP4.jday(year,mon,day,hr,mn,sec)
        rec.jdsatepoch = retv.jd
        rec.jdsatepoch_f = retv.frac
        return date
    }

    func substr(_ str:String, _ start:Int, _ end:Int) -> String {
        let startInd = str.index(str.startIndex, offsetBy: String.IndexDistance(start))
        let endInd = str.index(str.startIndex, offsetBy: String.IndexDistance(end))
        let range = startInd..<endInd
        let mySubstring = str[range]

        return String(mySubstring)
    }

    func trim(_ str:String) -> String {
        return str.trimmingCharacters(in: .whitespacesAndNewlines)
    }

    func gd(_ str:String, _ start:Int, _ end:Int, _ defVal:Double = 0.0) -> Double {
        var num:Double = defVal

        let startInd = str.index(str.startIndex, offsetBy: String.IndexDistance(start))
        let endInd = str.index(str.startIndex, offsetBy: String.IndexDistance(end))
        let range = startInd..<endInd
        let mySubstring = str[range]
        let myStr = String(mySubstring).trimmingCharacters(in: .whitespacesAndNewlines)
        num = Double(myStr) ?? defVal
        return num
    }

    func gdi(_ signInd:Int, _ str:String, _ start:Int, _ end:Int, _ defVal:Double = 0.0) -> Double {
        var num:Double = defVal
        let newStr = "0."+trim(substr(str,start,end))
        num = Double(newStr) ?? defVal

        if(signInd > -1) {
            let sc = substr(str,signInd,signInd+1)
            if(sc == "-") {
                num = -1.0*num
            }
        }

        return num
    }

    func getRV(date:Date) -> (r:[Double],v:[Double])
    {
        let secs = date.timeIntervalSince(epoch)
        let mins = Double(secs)/60.0
        return getRV(minutesAfterEpoch:mins)
    }

    func getRV(minutesAfterEpoch:Double) -> (r:[Double],v:[Double])
    {
        var r = Array(repeating: 0.0, count: 3)
        var v = Array(repeating: 0.0, count: 3)

    	rec.error = 0;
    	SGP4.sgp4(&rec, minutesAfterEpoch, &r, &v);
    	sgp4_error = rec.error;
        return (r,v)
    }
}
