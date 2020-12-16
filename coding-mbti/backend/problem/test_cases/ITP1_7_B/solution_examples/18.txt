# -*- coding: utf-8 -*-
"""
"""
import sys
from sys import stdin
from math import factorial
input = stdin.readline


def solve(n, x):
    ans = 0
    for a in range(1, n+1):
        for b in range(a+1, n+1):
            if b < (x - a - b) <= n:
                ans += 1
    return ans


def main(args):
    while True:
        n, x = map(int, input().split())
        if n == 0 and x == 0:
            break
        ans = solve(n, x)
        print(ans)


if __name__ == '__main__':
    main(sys.argv[1:])

