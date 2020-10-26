#mathモジュールをインポートする
import math
try:
    while True:
        a,b = map(int,input().split())
        #最小公約数
        num1 = math.gcd(a,b)
        #最大公倍数
        num2 = int(a * b / num1)
        print(str(num1) + " " + str(num2))
#EOFErrorをひろいコードを終了する
except EOFError:
    pass
