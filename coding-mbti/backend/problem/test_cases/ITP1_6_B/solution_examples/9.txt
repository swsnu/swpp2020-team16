import itertools

n = int(input())
a = [input() for _ in range(n)]

suits = ['S', 'H', 'C', 'D']
cards = ["%s %d" % (s, r) for s, r in itertools.product(suits, range(1, 14))]
answers = [c for c in cards if c not in a]
for card in answers:
    print(card)

