cards = []
symbol = ['S', 'H', 'C', 'D']
for sym in symbol:
    for i in range(1, 14):
        cards.append(sym + ' ' + str(i))

n = int(input())
for i in range(n):
    cards.remove(input())

for card in cards:
    print(card)
