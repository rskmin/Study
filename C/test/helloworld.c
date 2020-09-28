#include <stdio.h>

int main(void) {
    int t = 1, i = 2;
    while (i <= 10) {
        t = t * i;
        i = i + 1;
    }
    printf("t=%d, i=%d", t, i);
    return 0;
}
