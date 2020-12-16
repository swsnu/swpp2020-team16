while True:
    cou = 0
    n,x = map(int,input().split())
    if n==0 and x==0:
        break
    for i in range(1,x//2):
        for j in range(i+1,x//2):
            k = x - i - j
            if i<=n and j<=n and k<=n and k>j:
                cou += 1
    print(cou)
                
