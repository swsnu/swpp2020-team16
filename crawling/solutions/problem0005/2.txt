def gcd(m, n):
    while n:
        m, n = n, m % n
    return m
def lcm(m, n):
    return m // gcd(m, n) * n

for line in open(0).readlines():
    a, b = map(int, line.split())
    print(gcd(a, b), lcm(a, b))

