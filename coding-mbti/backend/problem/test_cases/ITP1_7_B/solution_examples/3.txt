readline = open(0).readline
ans = []
while 1:
    N, X = map(int, readline().split())
    if not N:
        break
    res = 0
    for x in range(1, N+1):
        for y in range(x+1, N+1):
            z = X - x - y
            if y < z <= N:
                res += 1
    ans.append("%d\n" % res)
open(1, 'w').writelines(ans)
