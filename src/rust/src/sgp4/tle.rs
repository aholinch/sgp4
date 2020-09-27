// This module knows how to parse two line element sets and access the individual elements.
// 
// @author aholinch

use chrono::prelude::*;

use super::elset_rec::ElsetRec as ElsetRec;

use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;


#[derive(Debug)]
pub struct TLE {
    pub rec: ElsetRec,
    pub line1: String,
    pub line2: String,
    pub intlid: String,
    pub object_num: i32,
    pub epoch:  DateTime<Utc>,

    pub ndot: f64,
    pub nddot: f64,
    pub bstar: f64,
    pub elnum: i64,
    pub inc_deg: f64,
    pub raan_deg: f64,
    pub ecc: f64,
    pub argp_deg: f64,
    pub ma_deg: f64,
    pub n: f64,
    pub revnum: i64,
    pub parse_errors: String,
    pub sgp4_error: i32
    
}

// java-style substr, do not use on large strings
pub fn substr(text: &String, ind1:i32, ind2:i32) -> String{
    let mut l1int = (*text).clone();
    let mut txt = l1int.split_off(ind1 as usize);
    let i2 = ind2-ind1;
    let _dumb = txt.split_off(i2 as usize);
    return txt;
}

pub fn gd(sstr:&String, start:i32, end:i32) -> f64 {
    return gdd(sstr,start,end,0.0);
}
    
pub fn gdd(sstr:&String, start:i32, end:i32, _def_val:f64) -> f64 {
    let num:f64; // = def_val;
    num = substr(sstr,start,end).trim().parse::<f64>().unwrap();
    return num;
}
    
pub fn gdi(sign:String, sstr:&String, start:i32, end:i32) -> f64 {
    return gdid(sign,sstr,start,end,0.0);
}
    
pub fn gdid(sign:String, sstr:&String, start:i32, end:i32, _def_val:f64) -> f64 {

    let mut num:f64; // = def_val;
    let mut text = substr(sstr,start,end);
    text = text.trim().to_string();
    let t2 = "0.".to_string()+&text;
    num = t2.parse::<f64>().unwrap();
    if sign.chars().nth(0) == Some('-') {num *= -1.0;}
    return num;
}


impl Default for TLE {
    fn default() -> TLE { 
      TLE {
        rec: ElsetRec::new(),
        line1: "".to_string(),
        line2: "".to_string(),
        intlid: "".to_string(),
        object_num: 0,
        epoch: Utc::now(),
        ndot: 0.0,
        nddot: 0.0,
        bstar: 0.0,
        elnum: 0,
        inc_deg: 0.0,
        raan_deg: 0.0,
        ecc: 0.0,
        argp_deg: 0.0,
        ma_deg: 0.0,
        n: 0.0,
        revnum: 0,
        parse_errors: "".to_string(),
        sgp4_error: 0,
      }
    }
}

impl TLE {
    pub fn new() -> Self {
        Default::default()
    }


    // Parses the two lines optimistically.  No exceptions are thrown but some parse errors will
    // be accumulated as a string.  Call getParseErrors() to see if there are any.
    // 
    // @param line1
    // @param line2
    //
    pub fn parse_lines(&mut self, line1:&String, line2:&String) {

        let mut rec = ElsetRec::new();
        let text = substr(&line1,18,32);
        let epc = self.parse_epoch(text,&mut rec);
        self.epoch = epc;

        self.line1 = line1.clone();
        self.line2 = line2.clone();

        let l1int = line1.clone();
        self.object_num = gd(&line1,2,7) as i32;
        rec.classification = l1int.chars().nth(7).unwrap();
        //                 1         2         3         4         5         6
        //       0123456789012345678901234567890123456789012345678901234567890123456789
        //line1="1 00005U 58002B   00179.78495062  .00000023  00000-0  28098-4 0  4753";
        //line2="2 00005  34.2682 348.7242 1859667 331.7664  19.3264 10.82419157413667";
        self.intlid = substr(&line1,9, 17).trim().to_string();
        self.ndot = gdi(line1.chars().nth(33).unwrap().to_string(),&line1,35,44);
        self.nddot = gdi(line1.chars().nth(44).unwrap().to_string(),&line1,45,50);
        self.nddot *= f64::powf(10.0, gd(&line1,50,52));
        self.bstar = gdi(line1.chars().nth(53).unwrap().to_string(),&line1,54,59);
        self.bstar *= f64::powf(10.0, gd(&line1,59,61));
        
        self.elnum = gd(&line1,64,68) as i64;
        
        self.inc_deg = gd(&line2,8,16);
        self.raan_deg = gd(&line2,17,25);
        self.ecc = gdi("+".to_string(),&line2,26,33);
        self.argp_deg = gd(&line2,34,42);
        self.ma_deg = gd(&line2,43,51);
        
        self.n = gd(&line2,52,63);
        
        self.revnum = gd(&line2,63,68) as i64;

        self.rec = rec;

        self.set_vals_to_rec();
    }
    
    // Set the values to the ElsetRec object.
    fn set_vals_to_rec(&mut self)
    {
        let deg2rad= 0.0174532925199433;
        let xpdotp = 229.1831180523293;

        self.rec.elnum = self.elnum;
        self.rec.revnum = self.revnum;
        self.rec.satnum = self.object_num;
        self.rec.bstar = self.bstar;
        self.rec.inclo = self.inc_deg*deg2rad;
        self.rec.nodeo = self.raan_deg*deg2rad;
        self.rec.argpo = self.argp_deg*deg2rad;
        self.rec.mo = self.ma_deg*deg2rad;
        self.rec.ecco = self.ecc;
        self.rec.no_kozai = self.n/xpdotp;
        self.rec.ndot = self.ndot / (xpdotp*1440.0);
        self.rec.nddot = self.nddot / (xpdotp*1440.0*1440.0);
        
        super::sgp4::sgp4init('a', &mut self.rec);
    }

    fn parse_epoch(&mut self,text: String, rec:&mut ElsetRec) -> chrono::DateTime<Utc> {
        let mut itext = text.clone();
        let mut epch = Utc::now();
        let mut year = substr(&itext,0,2).trim().parse::<i32>().unwrap();
        let mut itext2 = itext.split_off(5);
        itext2 = "0".to_string()+&itext2;
        let mut dfrac = itext2.trim().parse::<f64>().unwrap();
        let doy = substr(&itext,2,5).trim().parse::<i32>().unwrap();

        if year > 56 {
            year = year + 1900;
        } else {
            year = year + 2000;
        }

        epch = epch.with_year(year as i32).unwrap();
        epch = epch.with_ordinal(doy as u32).unwrap();

        dfrac = dfrac * 24.0;
        let hr = dfrac as u32;
        epch = epch.with_hour(hr).unwrap();

        dfrac = dfrac - (hr as f64);
        dfrac = dfrac * 60.0;
        let mn = dfrac as u32;
        epch = epch.with_minute(mn).unwrap();

        dfrac = dfrac - (mn as f64);
        dfrac = dfrac * 60.0;
        let sc = dfrac as u32;
        epch = epch.with_second(sc).unwrap();

        dfrac = dfrac - (sc as f64);
        dfrac = dfrac * 1000000000.0;
        let nn = dfrac as u32;
        epch = epch.with_nanosecond(nn).unwrap();

        let sec = (sc as f64) + dfrac/1000000000.0;

        let mon = epch.month();
        let day = epch.day();

        let (jd1,jd2) = super::sgp4::jday(year as i32, mon as i32, day as i32, hr as i32, mn as i32, sec as f64);
    	rec.jdsatepoch =  jd1;
    	rec.jdsatepoch_f = jd2;

        return epch;
    }

    pub fn get_rv_for_utc(&mut self, date:&chrono::DateTime<Utc>) -> ([f64; 3],[f64; 3])
    {
        let mut mins:f64;

        // get and substract whole seconds
        let d1:i64 = self.epoch.timestamp();
        let d2:i64 = date.timestamp();

        let mut tmps:i64 = d2-d1;
        mins = tmps as f64;
      
        // get and subtract nanoseconds 
        let n1:i64 = self.epoch.timestamp_subsec_nanos() as i64;
        let n2:i64 = date.timestamp_subsec_nanos() as i64;
        tmps = n2 - n1;
        let mut tmpf = tmps as f64;
        tmpf = tmpf / 1e9;
        mins = mins+tmpf;

        // convert to minutes
        mins = mins/60.0;
        println!("{:?}\t{:?}\t{}",self.epoch,date,mins); 
        return self.get_rv(mins);
    }

    pub fn get_rv(&mut self, minutes_after_epoch:f64) -> ([f64; 3],[f64; 3])
    {
        let mut r = [0.0,0.0,0.0];
        let mut v = [0.0,0.0,0.0];
    	
    	self.rec.error = 0;
    	super::sgp4::sgp4(&mut self.rec, minutes_after_epoch, &mut r, &mut v);
    	self.sgp4_error = self.rec.error;

        return (r,v);
    }
}

// I would call this a static helper function in other languages
pub fn read_tles(tlefile:String) -> Vec<TLE>
{
    let mut tles: Vec<TLE> = Vec::<TLE>::new();
    let mut prev_line:String;
    let mut cur_line:String = "987654321".to_string();
    let mut tle:TLE;

    let mut c1:char;
    let mut c2:char;

    if let Ok(lines) = read_lines(tlefile){
      for line in lines {
          prev_line = cur_line;
          cur_line = line.unwrap();

          c1 = prev_line.chars().next().unwrap();
          c2 = cur_line.chars().next().unwrap();

          if c1 == '1' && c2 == '2'
          {
              tle = TLE::new();
              tle.parse_lines(&prev_line,&cur_line);
              tles.push(tle);
          }
      }
    }

    return tles;
}

fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where P: AsRef<Path>, {
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}
