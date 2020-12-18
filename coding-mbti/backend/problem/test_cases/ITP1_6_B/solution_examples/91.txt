#ITP1_6_B


n= int(input())

T=[[0 for j in range(13)]for m in range(4)]
format(T)

for i in range(n):
    a,b = input().split()
    b=int(b)
    
    if a=='S':
      T[0][b-1] = 1
    elif a=='H':
      T[1][b-1] = 1
    elif a=='C':
      T[2][b-1] = 1
    else:
      T[3][b-1] = 1
for c in range(4):
  for d in range (13):
    if T[c][d] == 0:
      if c==0:
        K = "S"
      elif c==1:
        K = "H"
      elif c==2:
        K = "C"
      else:
        K = "D"
      print(K,d+1)
    else:
      pass

