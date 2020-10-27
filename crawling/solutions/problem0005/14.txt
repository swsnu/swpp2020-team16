def get_input():
    while True:
        try:
            yield ''.join(input())
        except EOFError:
            break

N = list(get_input())
for l in range(len(N)):
    a,b = [int(i) for i in N[l].split()]
    A = a
    B = b
    if(a<b):
        c = a
        a = b
        b = c

    while b > 0:
        nexta = b
        nextb = a % b
        a = nexta
        b = nextb

    g = a
    print(g, int(A*B/g))

