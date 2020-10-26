import sys
def gcd(a,b):
    if a%b==0:
        return b
    return gcd(b,a%b)

r=[list(map(int,line.split())) for line in sys.stdin]
for i in r:
    o=gcd(i[0],i[1])
    p=i[0]*i[1]/o
    print(o,int(p))

