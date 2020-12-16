# -*- coding:utf-8 -*-

n = int(input())
a = ['']*n
b = [0]*n
for i in range(n):
    a[i],b[i] = input().split()

array_S = []
for i in range(14):
    count = 0
    for j in range(n):
        if i == int(b[j]):
            if a[j] == 'S':
                break
        count += 1
        if count == n:
            array_S.append(i)
            
array_H = []
for i in range(14):
    count = 0
    for j in range(n):
        if i == int(b[j]):
            if a[j] == 'H':
                break
        count += 1
        if count == n:
            array_H.append(i)

array_C = []
for i in range(14):
    count = 0
    for j in range(n):
        if i == int(b[j]):
            if a[j] == 'C':
                break
        count += 1
        if count == n:
            array_C.append(i)
            
array_D = []
for i in range(14):
    count = 0
    for j in range(n):
        if i == int(b[j]):
            if a[j] == 'D':
                break
        count += 1
        if count == n:
            array_D.append(i)
            
for i in range(1,len(array_S)):
    print('S',array_S[i],sep =' ')
for i in range(1,len(array_H)):
    print('H',array_H[i],sep =' ')
for i in range(1,len(array_C)):
    print('C',array_C[i],sep =' ')
for i in range(1,len(array_D)):
    print('D',array_D[i],sep =' ')
