import sys


def euc(n,m):
    if max(n,m)%min(n,m) == 0:
        return min(n,m)
    else:
        return euc(min(n,m), max(n,m)%min(n,m))


for line in sys.stdin:
    a,b = [int(i) for i in line.split()]
    print(euc(a,b),int(a*b/euc(a,b)))

