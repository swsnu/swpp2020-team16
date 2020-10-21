def solve(a, b):
  if a % b == 0:
    return b
  else:
    return solve(b, a % b)
  
while True:
  try:
    a, b = map(int, input().split())
    lcm = solve(a,b)
    print(lcm, a * b // lcm)

  except:
    break
 
