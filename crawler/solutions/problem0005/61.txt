def GCD(a, b):
    if b == 0:
        return a
    return GCD(b, a % b)

def LCM(a, b):
    return a * b // GCD(a, b)

import sys
s = sys.stdin.readlines()
n = len(s)
for i in range(n):
    x, y = map(int, s[i].split())
    print(GCD(x, y), LCM(x, y))

