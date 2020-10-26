def gcd(a, b) :
    if a % b == 0 :
        return b
    else :
        return gcd(b, a % b)

while True :
    try :
        a, b = map(int, input().split())
    except EOFError :
        break
    
    a, b = max(a, b), min(a, b)
    x = gcd(a, b)
    print(x, a * b // x)
