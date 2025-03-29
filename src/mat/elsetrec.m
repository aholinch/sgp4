%% This class implements the elsetrec data type from Vallado's SGP4 code.
%%
%% define SGP4Version  "SGP4 Version 2016-03-09"
%% 
%% Author: aholinch
%% Created: 2018-09-09

classdef elsetrec < handle
  properties
    whichconst = SGP4.wgs72;
    satid = '0';
    epochyr = 0;
    epochtynumrev = 0;
    error = 0;
    operationmode = 'a';
    init = 'y';
    method = '';  
    a = 0;
    altp = 0;
    alta = 0;
    epochdays = 0;
    jdsatepoch = 0;
    jdsatepochF = 0;
    nddot = 0;
    ndot = 0;
    bstar = 0;
    rcse = 0;
    inclo = 0;
    nodeo = 0;
    ecco = 0;
    argpo = 0;
    mo = 0;
    no_kozai = 0;
  
    %% sgp4fix add new variables from tle
    classification = 'U';
    intldesg = '';
    ephtype = 0;
    elnum = 0;
    revnum = 0;
  
    %% sgp4fix add unkozai'd variable
    no_unkozai = 0;
  
    %% sgp4fix add singly averaged variables
    am = 0;
    em = 0;
    im = 0;
    Om = 0;
    om = 0;
    mm = 0;
    nm = 0;
    t = 0;
  
    %% sgp4fix add constant parameters to eliminate mutliple calls during execution
    tumin = 0;
    mu = 0;
    radiusearthkm = 0;
    xke = 0; 
    j2 = 0;
    j3 = 0;
    j4 = 0;
    j3oj2 = 0;
  
    %%     Additional elements to capture relevant TLE and object information:     
    dia_mm = 0; %% RSO dia in mm
    period_sec = 0; %% Period in seconds
    active = 0; %% "Active S/C" flag (0=n, 1=y) 
    not_orbital = 0; %% "Orbiting S/C" flag (0=n, 1=y)  
    rcs_m2 = 0; %% "RCS (m^2)" storage  

    %% temporary variables because the original authors call the same method with different variables
    ep = 0;
    inclp = 0;
    nodep = 0;
    argpp = 0;
    mp = 0;


    isimp = 0;
    aycof = 0;
    con41 = 0;
    cc1 = 0;
    cc4 = 0;
    cc5 = 0;
    d2 = 0;
    d3 = 0;
    d4 = 0;
    delmo = 0;
    eta = 0;
    argpdot = 0;
    omgcof = 0;
    sinmao = 0;
    t2cof = 0;
    t3cof = 0;
    t4cof = 0;
    t5cof = 0;
    x1mth2 = 0;
    x7thm1 = 0;
    mdot = 0;
    nodedot = 0;
    xlcof = 0;
    xmcof = 0;
    nodecf = 0;

    %% deep space
    irez = 0;
    d2201 = 0;
    d2211 = 0;
    d3210 = 0;
    d3222 = 0;
    d4410 = 0;
    d4422 = 0;
    d5220 = 0;
    d5232 = 0;
    d5421 = 0;
    d5433 = 0;
    dedt = 0;
    del1 = 0;
    del2 = 0;
    del3 = 0;
    didt = 0;
    dmdt = 0;
    dnodt = 0;
    domdt = 0;
    e3 = 0;
    ee2 = 0;
    peo = 0;
    pgho = 0;
    pho = 0;
    pinco = 0;
    plo = 0;
    se2 = 0;
    se3 = 0;
    sgh2 = 0;
    sgh3 = 0;
    sgh4 = 0;
    sh2 = 0;
    sh3 = 0;
    si2 = 0;
    si3 = 0;
    sl2 = 0;
    sl3 = 0;
    sl4 = 0;
    gsto = 0;
    xfact = 0;
    xgh2 = 0;
    xgh3 = 0;
    xgh4 = 0;
    xh2 = 0;
    xh3 = 0;
    xi2 = 0;
    xi3 = 0;
    xl2 = 0;
    xl3 = 0;
    xl4 = 0;
    xlamo = 0;
    zmol = 0;
    zmos = 0;
    atime = 0;
    xli = 0;
    xni = 0;
    snodm = 0;
    cnodm = 0;
    sinim = 0;
    cosim = 0;
    sinomm = 0;
    cosomm = 0;
    day = 0;
    emsq = 0;
    gam = 0;
    rtemsq = 0; 
    s1 = 0;
    s2 = 0;
    s3 = 0;
    s4 = 0;
    s5 = 0;
    s6 = 0;
    s7 = 0; 
    ss1 = 0;
    ss2 = 0;
    ss3 = 0;
    ss4 = 0;
    ss5 = 0;
    ss6 = 0;
    ss7 = 0;
    sz1 = 0;
    sz2 = 0;
    sz3 = 0;
    sz11 = 0;
    sz12 = 0;
    sz13 = 0;
    sz21 = 0;
    sz22 = 0;
    sz23 = 0;
    sz31 = 0;
    sz32 = 0;
    sz33 = 0;
    z1 = 0;
    z2 = 0;
    z3 = 0;
    z11 = 0;
    z12 = 0;
    z13 = 0;
    z21 = 0;
    z22 = 0;
    z23 = 0;
    z31 = 0;
    z32 = 0;
    z33 = 0;
    argpm = 0;
    inclm = 0;
    nodem = 0;
    dndt = 0;
    eccsq = 0;
    
    %% for initl
    ainv = 0;
    ao = 0;
    con42 = 0;
    cosio = 0;
    cosio2 = 0;
    omeosq = 0;
    posq = 0;
    rp = 0;
    rteosq = 0;
    sinio = 0;
  end

  methods
    function er = elsetrec()
    end

    function disp(er)
      sprintf('%f\t%f\t%f\t%f\t%f\t%f\t%f\t%f\t%f\t%f\t%f\n', er.inclo, er.nodeo, er.ecco, er.argpo, er.mo, er.no_kozai, er.jdsatepoch, er.jdsatepochF, er.ndot, er.nddot, er.bstar)
    
    end
  end

end
