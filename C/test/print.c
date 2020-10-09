#include <stdio.h>
int main() {
  printf("int: bytes %d\n", sizeof(char));
  printf("int: bytes %d\n", sizeof(short));
  printf("int: bytes %d\n", sizeof(int));
  printf("int: bytes %d\n", sizeof(long));
  printf("int: bytes %d\n", sizeof(float));
  printf("int: bytes %d\n", sizeof(double));

  float a;
  double b;
  char c;
  enum week {
    Mon, Tues, Wed, Thurs, Fri, Sat, Sun,
  };
  int d[10];

  return 0;
}
