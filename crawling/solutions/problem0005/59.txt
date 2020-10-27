import sys
import math
def gcd(x,y):
    if(x%y==0):
        return y
    else:
        return(gcd(y,x%y))
try:
    while True:
        a,b= map(int, input().split())
        max1=gcd(a,b)
        min1=(a*b)//gcd(a,b)
        print(str(max1)+' '+str(min1))
except EOFError:
    pass
