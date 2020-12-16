
list_s = ["S1","S2","S3","S4","S5","S6","S7","S8","S9","S10","S11","S12","S13"]
list_h = ["H1","H2","H3","H4","H5","H6","H7","H8","H9","H10","H11","H12","H13"]
list_c = ["C1","C2","C3","C4","C5","C6","C7","C8","C9","C10","C11","C12","C13"]
list_d = ["D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13"]

num = int(input())

for i in range(num):
	c,cn = input().split(" ")
	if c == "S":
		if str(c+cn) in list_s:
			a = list_s.index(str(c+cn))
			list_s.pop(a)
	if c == "H":
		if str(c+cn) in list_h:
			a = list_h.index(str(c+cn))
			list_h.pop(a)
	if c == "C":
		if str(c+cn) in list_c:
			a = list_c.index(str(c+cn))
			list_c.pop(a)

	if c == "D":
		if str(c+cn) in list_d:
			a = list_d.index(str(c+cn))
			list_d.pop(a)

[print(i[0:1],i[1:]) for i in list_s]
[print(i[0:1],i[1:]) for i in list_h]
[print(i[0:1],i[1:]) for i in list_c]
[print(i[0:1],i[1:]) for i in list_d]

