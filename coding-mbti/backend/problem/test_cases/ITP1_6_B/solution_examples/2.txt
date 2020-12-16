_, *C = open(0).readlines()
C = set(C)
xs = [" %d\n" % i for i in range(1, 14)]
ans = []
for s in "SHCD":
    for x in xs:
        card = s+x
        if card not in C:
            ans.append(card)
open(1, 'w').writelines(ans)
