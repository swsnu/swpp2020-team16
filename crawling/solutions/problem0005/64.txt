def gcd(n1,n2):
    if n2==0:
        return n1
    return gcd(n2,n1%n2)

def lcm(n1,n2):
    return n1/gcd(n1,n2)*n2

while True:
    try:
        a,b=[int(i) for i in input().split()]
        print("{} {}".format(int(gcd(a,b)),int(lcm(a,b))))
    except:
        break
