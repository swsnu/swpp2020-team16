c = []
for i in ["S","H","C","D"]:
    for j in range(1,14):
        c.append("{} {}".format(i,j))
n = int(input())
a = [] 
for i in range(n):
    a.append(input())
d = [i for i in c if i not in a]
if len(d) != 0:
    print(*d,sep="\n")
