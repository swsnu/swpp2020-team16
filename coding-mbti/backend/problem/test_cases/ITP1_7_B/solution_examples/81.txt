while True:
    cnt = 0
    n, x = map(int, input().split())
    if n == x == 0: break
    for i in range(1,n-1):
        for j in range(i+1,n):
            for k in range(j+1,n+1):
                if x == i+j+k:
                    cnt+=1
    print(cnt)
