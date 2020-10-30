Str = input()
Str = list(Str)
STR = []
for i in range(len(Str)-1,-1,-1):
    STR.append(Str[i])
print(''.join(STR))
