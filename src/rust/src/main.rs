#![allow(warnings)]
mod sgp4;
use sgp4::elset_rec::ElsetRec as ElsetRec;
use sgp4::tle::TLE as TLE;

use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;

macro_rules! scan {
    ( $string:expr, $( $x:ty ),+ ) => {{
        let mut iter = $string.split_whitespace();
        ($(iter.next().and_then(|word| word.parse::<$x>().ok()),)*)
    }}
}


fn main() {
    let filein = "../../data/SGP4-VER.TLE".to_string();
    let filever = "../../data/tcppver.out".to_string();
    let mut tles = sgp4::tle::read_tles(filein);

    let mut r:[f64;3];
    let mut v:[f64;3];
    let mut vr:[f64;3];
    let mut vv:[f64;3];

    let mut linestr:String;
    let mut i:usize;

    let mut tle = & mut TLE::new();

    let mut mins:f64 = 0.0;

    vr = [0.0,0.0,0.0];
    vv = [0.0,0.0,0.0];

    let mut rdist:f64 = 0.0;
    let mut vdist:f64 = 0.0;
    let mut rerr:f64 = 0.0;
    let mut verr:f64 = 0.0;
    let mut cnt2:i32 = 0;


    i = 0;
    if let Ok(lines) = read_lines(filever){
      for line in lines {
          linestr = line.unwrap();
          if linestr.contains("xx")
          {
              tle = tles.get_mut(i).unwrap();
              i = i + 1;
          }
          else
          {
	      let output = scan!(linestr, f64, f64, f64, f64, f64, f64, f64);

              mins = output.0.unwrap();
              vr[0] = output.1.unwrap();
              vr[1] = output.2.unwrap();
              vr[2] = output.3.unwrap();
              vv[0] = output.4.unwrap();
              vv[1] = output.5.unwrap();
              vv[2] = output.6.unwrap();


              let rv = tle.get_rv(mins);
              r = rv.0;
              v = rv.1;

              rdist = dist(&r,&vr);
              vdist = dist(&v,&vv);

              if tle.object_num == 33334
              {
                  rdist = 0.0;
                  vdist = 0.0;
              }

              rerr = rerr + rdist;
              verr = verr + vdist;
              cnt2 = cnt2+1;

              if(rdist > 1e-7 || vdist > 1e-8)
              {
                  println!("{}\t{}\t{}\t{}",tle.object_num,mins,rdist,vdist);
              }

          }
      }
    }

    rerr = rerr/(cnt2 as f64);
    verr = verr/(cnt2 as f64);

    println!("Typical errors r={} mm, v={} mm/s",1e6*rerr,1e6*verr);



}

fn dist(v1:&[f64; 3],v2:&[f64; 3]) -> f64
{
    let mut tmp:f64 = 0.0;
    let mut sum:f64 = 0.0;

    tmp = v1[0]-v2[0];
    sum = sum + tmp*tmp;
    tmp = v1[1]-v2[1];
    sum = sum + tmp*tmp;
    tmp = v1[2]-v2[2];
    sum = sum + tmp*tmp;

    return sum.sqrt();
}

fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where P: AsRef<Path>, {
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}
