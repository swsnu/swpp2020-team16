import math
import sys
if __name__ == '__main__':

	for line in sys.stdin:
		a,b = map(int,line.split())
		print(math.gcd(a,b),(a*b) // math.gcd(a,b))

