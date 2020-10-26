while(True):
    try:
        (a, b) = map(int, input().split(" "))
        (x, y) = (a, b)
        while (x != 0):
            (x, y) = (y%x, x)
        print("%s %s" %(y, a*b//y))
    except:
        break
