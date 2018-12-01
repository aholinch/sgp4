# sgp4
SGP4 implementations in multiple languages

# License
This code is released under an unlicense.  Do what you want with it completely at your own risk.  It is based on code released by the Center for Space Standards & Innovation (CSSI).  Their code is based on a US Government standard.  No liability and no warranty are offered.

# C

gcc -o testsgp4 SGP4.c TLE.c TestSGP4.c -lm
./testsgp4
Typical errors r=6.722191e-03 mm, v=4.812040e-04 mm/s

# Java

javac -d . *.java
java -classpath . sgp4.TestSGP4

Typical errors	r=0.006722149979022173 mm	v=4.812041812093286E-4 mm/s

# JavaScript
In the js directory open sgp4.html in a browser to view the results.  Calling javascript from the cli, you can run testsgp4.js which will call the verify() method.

Typical errors r = 4.483598307712105 mm, v = 0.3209631274698461 mm/s

# Matlab/Octave
The code has been tested with Matlab 7.9.1
ans =
Typical errors r=6.721676E-03 mm        v=4.812042E-04 mm/s

The code has been tested with Octave 4.0.0

octave TestSGP4.m
ans = Typical errors r=6.722191E-03 mm	v=4.812040E-04 mm/s

# Python
The SGP4 and TLE code works in both Python 2 and Python 3.  The TestSGP4 code should also work in both versions and has a dependency on the standard json package. Simply execute your preferred version of python from the python src directory.


Typical Errors
0.00651341005177
mm
0.000481251231334
mm/s


Typical Errors
0.006513410051766991
mm
0.0004812512313336876
mm/s


# R
If you run RStudio from the r directory, call source('TestSGP4.R') to run the test script.


Typical errors r=2.852996E-03 mm   v=4.277355E-06 mm/s

