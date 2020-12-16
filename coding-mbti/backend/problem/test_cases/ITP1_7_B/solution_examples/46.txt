while True:
    n,x=map(int, input().split())
    if n==x==0:break
    count=0
    for nmin in range(1,n+1):
        for nmed in range(nmin+1,n+1):
            if n+1>x-nmin-nmed>nmed:
                count+=1
    print(count)
