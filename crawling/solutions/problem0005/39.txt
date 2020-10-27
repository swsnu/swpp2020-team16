import math

while True :
    try :
        a, b = map(int, input().split())
        Gcd = math.gcd(a, b)
        Lcm = (a * b) // Gcd
        print(Gcd, Lcm) 
    except :
        break

