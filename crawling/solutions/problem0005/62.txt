def gcd(y, x):
    if x == 0:
        return y
    return gcd(x, y%x)
try:
    while True:
        a, b = sorted(map(int, input().split()), reverse=True)
        print(gcd(a,b), a*b//gcd(a,b))
except:
    pass
