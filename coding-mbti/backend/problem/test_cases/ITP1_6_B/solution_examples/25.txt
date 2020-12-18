
n = int(input())
cards = {}               #空の辞書を作る

for i in range(n):
    card = input()
    cards[card] = True
    
# print(d)

for c in ["S", "H", "C", "D"]:
    for i in range(1, 14):
        key = c + ' ' + str(i)
        if not key in cards:
            print(key)
