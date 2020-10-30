import math,sys
for e in sys.stdin:
 a,b=list(map(int,e.split()));g=math.gcd(a,b)
 print(g,a*b//g)
