# SGP4
SGP4 stands for Simplified General Perturbations 4 and is arguably the most widely used propagator for simulating earth satellite orbits.
This module is my personal project to produce implementations in multiple languages.  There is an official government document released decades
ago that describes the theory and the software.  That document is known as Spacetrack Report #3.  In 2006 researchers at the Center for Space
Standards and Innovation ([CSSI](http://www.centerforspace.com/)) published a detailed study of the algorithm and more modern software implementations.  In addition to the paper they also
released the [software](http://www.centerforspace.com/downloads/).  Most importantly they produced an extensive set of test cases that cover multiple orbit regimes, potential singularities, and other
tricky orbits.

# License
This code is released under an unlicense.  Do what you want with it completely at your own risk.  It is based on code released by the Center for Space Standards & Innovation ([CSSI](http://www.centerforspace.com/)).  Their [code](http://www.centerforspace.com/downloads/) is based on a US Government standard.  No liability and no warranty are offered.

# C

gcc -o testsgp4 SGP4.c TLE.c TestSGP4.c -lm
./testsgp4
Typical errors r=6.722191e-03 mm, v=4.812040e-04 mm/s

# C++
g++ -o testsgp4 TestSGP4.cpp TLE.cpp SGP4.c

Typical errors r=6.722191e-03 mm, v=4.812040e-04 mm/s

# C#
dotnet run

Typical errors	r=0.00672218292027499 mm	v=0.00481204064816902 mm/s

# FORTRAN 90
I'm a bit proud of this port myself.  I've been seeing SGP4 in FORTRAN for decades now.  However, all the other versions I've seen were using COMMON data blocks.  By porting the code from C to FORTRAN 90, I was able to organize the code in modules and take advantage of custom data types, ElsetRec and TLE.  Now others can include these modules in their code without having to have the common block.
gfortran ElsetRec.f90 SGP4.f90 TLE.f90 TestSGP4.f90  -o testsgp4

Typical errors r=   6.7121279555256517E-003  mm, v=   4.8048366357605730E-004  mm/s

# Java

javac -d . *.java
java -classpath . sgp4.TestSGP4

Typical errors	r=0.006722149979022173 mm	v=4.812041812093286E-4 mm/s

# JavaScript
In the js directory open sgp4.html in a browser to view the results.  Calling javascript from the cli, you can run testsgp4.js which will call the verify() method.

Typical errors r = 0.006722036443346485 mm, v = 0.00048120408916018905 mm/s

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


# Ruby
The Ruby version was ported from the Python version. To run the code go to the ruby directory and type:

ruby TestSGP4.rb

Typical Errors 0.006722191115878764 mm, 0.0004812040288887651 mm/s
