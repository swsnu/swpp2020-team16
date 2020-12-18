# coding=utf-8

###
### for atcorder program
###

import sys
import math
import array

# math class
class mymath:
    ### pi
    pi = 3.14159265358979323846264338

    ### Prime Number
    def pnum_eratosthenes(self, n):
        ptable = [0 for i in range(n+1)]
        plist = []

        for i in range(2, n+1):
            if ptable[i]==0:
                plist.append(i)
                for j in range(i+i, n+1, i):
                    ptable[j] = 1
        return plist

    ### GCD
    def gcd(self, a, b):
        if b == 0:
            return a
        return self.gcd(b, a%b)

    ### LCM
    def lcm(self, a, b):
        return (a*b)//self.gcd(a,b)

    ### Mat Multiplication
    def mul(self, A, B):
        ans = []
        for a in A:
            c = 0
            for j, row in enumerate(a):
                c += row*B[j]
            ans.append(c)
        return ans

mymath = mymath()

### output class
class output:
    ### list
    def list(self, l):
        l = list(l)
        print(" ", end="")
        for i, num in enumerate(l):
            print(num, end="")
            if i != len(l)-1:
                print(" ", end="")
        print()

output = output()

### input sample
#i = input()
#A, B, C = [x for x in input().split()]
#N, K = [int(x) for x in input().split()]
#inlist = [int(w) for w in input().split()]
#R = float(input())
#A = [int(x) for x in input().split()]
#for line in sys.stdin.readlines():
#    x, y = [int(temp) for temp in line.split()]

### output sample
#print("{0} {1} {2:.5f}".format(A//B, A%B, A/B))
#print("{0:.6f} {1:.6f}".format(R*R*math.pi,R*2*math.pi))
#print(" {}".format(i), end="")

def main():
    A = []

    while(True):
        n, x = [int(x) for x in input().split()]
        if (n == 0) and (x == 0):
            break
        else:
            A.append([n,x])
    
    for nx in A:
        ans = 0
        for i in range(1,nx[0]+1):
            for j in range(i+1,nx[0]+1):
                for k in range(j+1,nx[0]+1):
                    if (nx[1] == i+j+k):
                        ans += 1
        print(ans)

if __name__ == '__main__':
    main()
