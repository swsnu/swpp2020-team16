import fractions
while True:
    try:
        a,b = map(int,input().split())
    except:
        break
    print(fractions.gcd(a,b),a*b // fractions.gcd(a,b))
