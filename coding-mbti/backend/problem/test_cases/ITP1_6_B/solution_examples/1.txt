n = int(input())
a = list()
for i in range(n):
	x, y = input().split()
	y = int(y)
	if x == "S":
		a.append(y + 0)
	if x == "H":
		a.append(y + 13)
	if x == "C":
		a.append(y + 26)
	if x == "D":
		a.append(y + 39)
for i in range(1, 53):
	if not (i in a):
		if i <= 13:
			print("S {}".format(i - 0))
		elif i <= 26:
			print("H {}".format(i - 13))
		elif i <= 39:
			print("C {}".format(i - 26))
		else:
			print("D {}".format(i - 39))
