import math

while True:
    try:
        a, b = [int(x) for x in input().split()]
        print(math.gcd(a,b), a*b // math.gcd(a,b))
    except EOFError:
        break
    
