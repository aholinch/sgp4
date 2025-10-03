#ifndef __sgp4tleheader__
#define __sgp4tleheader__

#include "SGP4.h"
#include <stdint.h>
#ifdef __cplusplus
extern "C" {
#endif


typedef struct TLE {
    ElsetRec rec;
    char line1[70];
    char line2[70];
    char intlid[12];
    char objectID[6];
    int64_t epoch;
    double ndot;
    double nddot;
    double bstar;
    int32_t elnum;
    double incDeg;
    double raanDeg;
    double ecc;
    double argpDeg;
    double maDeg;
    double n;
    int32_t revnum;
    int32_t sgp4Error;
} TLE;

void parseLines(TLE *tle, char *line1, char *line2);

int64_t parseEpoch(ElsetRec *rec, char *str);

void getRVForDate(TLE *tle, int64_t millisSince1970, double r[3], double v[3]);

void getRV(TLE *tle, double minutesAfterEpoch, double r[3], double v[3]);

#ifdef __cplusplus
}
#endif

#endif
