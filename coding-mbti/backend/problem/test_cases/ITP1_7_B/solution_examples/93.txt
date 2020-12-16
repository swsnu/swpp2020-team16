#ITP1_7_B
m=int(0)
while True:
  m=0
  n,x=map(int,input().split())
  if n ==0 and x==0:
    break
  for a in range(1,n-1):
    for b in range(a+1,n):
      for c in range(b+1,n+1):
        if a+b+c==x:
          m=m+1
  print(m)
