S = input()

cnt = -1

for i in range(len(S)) :
    if i == len(S) - 1 :
        print(S[0])
    else :
        print(S[cnt], sep = "", end = "")
        cnt -= 1
