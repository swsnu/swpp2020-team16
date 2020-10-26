import math
while True:
    try:
        a, b = map(int, input().split())
    except:
        break
    GCD = math.gcd(a, b)
    LCM = (a*b)//GCD
    print(GCD, LCM)
