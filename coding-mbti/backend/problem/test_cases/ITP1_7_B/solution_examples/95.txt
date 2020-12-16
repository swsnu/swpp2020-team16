while True:
	n, x = map(int, input().split())
	if n == 0 and x == 0:
		break
	ans = 0
	for i in range(1, n + 1):
		for j in range(1, i):
			for k in range(1, j):
				if i + j + k == x:
					ans += 1
	print(ans)
