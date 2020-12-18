n = int(input())
S = list(map(int, input().split()))
q = int(input())
T = list(map(int, input().split()))


def binary_search(A, key):
    left = 0
    right = n
    while left < right:
        mid = int((left + right)/2)
        if A[mid] == key:
            return True
        elif key < A[mid]:
            right = mid
        else:
            left = mid + 1
    return False

cnt = 0
for i in T:
    if binary_search(S, i):
        cnt += 1

print(cnt)
