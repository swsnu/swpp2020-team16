n=int(input())
cs = [ (s,k) for s in ['S','H','C','D'] for k in range(1,14) ]
for _ in range(n):
    s,k=input().split()
    cs.remove((s,int(k)))
for (s, k) in cs:
    print(s, k)
