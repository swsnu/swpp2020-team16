while True:
  (n, x) = input().rstrip('\r\n').split(' ')
  n = int(n)
  x = int(x)

  if n == 0 and x == 0:
    break

  a = []
  for ii in range(n):
    a.append(ii + 1)

  c = 0
  for ii in range(len(a)):
    for jj in range(ii + 1, len(a)):
      for kk in range(jj + 1, len(a)):
        if a[ii] + a[jj] + a[kk] == x:
          c += 1
  print(c)

