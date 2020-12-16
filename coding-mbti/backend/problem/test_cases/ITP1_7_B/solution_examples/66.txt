while True:
	n,x = map(int,input().split(" "))

	if n == 0 and x == 0:
		break

	#データリスト作成
	data = [m for m in range(1,n+1)]
	data_list = []
	cnt = 0
	#n種類の数字があって、xになる組み合わせは？
	for i in range(1,n+1):
		for j in range(1+i,n+1):
			for k in range(1+j,n+1):
				if i+j+k == x:
					cnt += 1

	print(cnt)

