n=int(input())
card=[]
for suit in ["S","H","C","D"]:
    for rank in list(map(str,range(1,14))):
        card.append(suit+" "+rank)
for i in range(n):
    card.remove(input())
for c in card:
    print(c)  

