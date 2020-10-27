import math
while True:
  try:
    a,b=map(int,input().split())
    def lcm(x,y):
      return (x*y)//math.gcd(x,y)
    print(math.gcd(a,b),lcm(a,b))
  except:
    break
