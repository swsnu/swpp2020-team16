while True:
    try:
        a, b = map(int, input().split(" "))
        if a < b:
            key = a
            a = b
            b = key
        A = a
        B = b
        while a % b != 0:
            key = a % b
            a = b
            b = key
        key = int(A * B / b)
        print(b, key)
    except:
        break
