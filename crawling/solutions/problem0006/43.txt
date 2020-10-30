lstr = input()
str = [a for a in lstr]
str.reverse()
for num in range(0,len(str)):
    print(str[num],end="")
print()
