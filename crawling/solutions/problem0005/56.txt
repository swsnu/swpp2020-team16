while True:
    try:
        lst = list(map(int, input().split()))
        a, b = lst[0], lst[1]
        while b != 0:
            a, b = b, a % b
            
        c = lst[0]* lst[1]/ a
        print('{:.0f}'.format(a), end = " ")
        print('{:.0f}'.format(c))

    except:
        break
