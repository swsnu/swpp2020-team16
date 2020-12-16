while 1:
 n,x=map(int,input().split())
 if n+x==0:break
 print(sum(max(0,(x-a-1)//2-max(a,x-a-1-n))for a in range(1,x//3)))
