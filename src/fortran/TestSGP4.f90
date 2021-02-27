program TestSGP4
  USE ELSETRECMOD
  USE SGP4MOD 
  USE TLEMOD

! custom type to hold tle data and time
  TYPE VERIN_TYPE
    character*70 line1
    character*70 line2
    REAL*8 startmin
    REAL*8 stepmin
    REAL*8 stopmin
  END TYPE VERIN_TYPE

  call doVerify()

  CONTAINS

! Read the tles and the desired minutes and intervals
  SUBROUTINE readVERINs(verins, cnt)
    TYPE(VERIN_TYPE),dimension(:),intent(inout) :: verins
    TYPE(VERIN_TYPE) verin
    INTEGER*4, intent(inout) :: cnt
    character(len=255) line
    integer,parameter :: fh=15
    integer ios


    ios = 0
    cnt = 0

    open(fh, file='../../data/SGP4-VER.TLE')

    do while (ios .EQ. 0)

      read(fh,'(A)',iostat=ios) line
      if(ios .EQ. 0) then
        if(line(1:1) .EQ. '1') then
          cnt = cnt+1
          verin = verins(cnt)
          verin%line1 = line 
          read(fh,'(A)',iostat=ios) line
          verin%line2 = line
          read (line(71:),*) verin%startmin, verin%stopmin, verin%stepmin

          verins(cnt) = verin
        end if
      end if
    end do

    close(fh)

  END SUBROUTINE


!  2-norm distance for two three vectors
  REAL*8 FUNCTION dist(v1, v2)
    real*8, dimension(3), intent(in) :: v1,v2
    real*8 tmp

    dist = 0

    tmp = v1(1)-v2(1)
    dist = dist + tmp*tmp
    tmp = v1(2)-v2(2)
    dist = dist + tmp*tmp
    tmp = v1(3)-v2(3)
    dist = dist + tmp*tmp

    dist = sqrt(dist)
  END FUNCTION dist


  SUBROUTINE runVER(verins, cnt)
    TYPE(VERIN_TYPE),dimension(:),intent(in) :: verins
    INTEGER*4, intent(in) :: cnt
    TYPE(VERIN_TYPE) verin
    integer,parameter :: fh=15
    TYPE(TLE_TYPE) tle
    REAL*8, dimension(3) :: r,v,rv,vv
    character*256 line
    integer*4 int,cnt2,ind
    REAL*8 mins,rdist,vdist,rerr,verr

    mins = 0
    rdist = 0
    vdist = 0
    rerr = 0
    verr = 0

    i = 0
    cnt2 = 1
    ios = 0

    open(fh, file='../../data/tcppver.out')

   do while ((ios .EQ. 0) .AND. (i .LE. cnt2))
!    do while ((ios .EQ. 0) .AND. (i .LE. 4))

      read(fh,'(A)',iostat=ios) line
      if(ios .EQ. 0) then

        ind = index(line,"xx");
        if(ind .GT. 0) then
            i = i+1 
            call parseLines(tle,verins(i)%line1,verins(i)%line2)
        else
              
            read(line,*)mins,rv(1),rv(2),rv(3),vv(1),vv(2),vv(3)

            call getRV(tle,mins,r,v)

            rdist = dist(r,rv)
            vdist = dist(v,vv)
            rerr = rerr + rdist
            verr = verr + vdist
            cnt2 = cnt2+1

            if(rdist .GT. 1e-7 .OR. vdist .GT. 1e-8) then
                print *,tle%objectID,mins,rdist,vdist
            end if

        end if

      end if
    end do

    rerr = 1e6*rerr/cnt2;
    verr = 1e6*verr/cnt2;

    print *,'Typical errors r=',rerr,' mm, v=',verr,' mm/s'

    close(fh)

  END SUBROUTINE runVER


! main verify method
  SUBROUTINE doVerify()
    TYPE(VERIN_TYPE), dimension(100) :: verins
    INTEGER*4 cnt

    call readVERINs(verins,cnt)

    print *,'Read ',cnt,' verins'

    call runVER(verins,cnt)

  END SUBROUTINE

end program TestSGP4
