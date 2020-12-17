const testAll = `# -*- coding: UTF-8 -*-
from userCode import main
import time

def test_runner():
    file_no = 0
    output_files = []
    input_files = []
    test_pass_count = 0

    while True:
        try:
            output_file = open(f"data/output_{file_no}.txt", 'r')
            input_file = open(f"data/input_{file_no}.txt", 'r')
        except FileNotFoundError:
            break
        output_files.append(output_file)
        input_files.append(input_file)
        file_no += 1

    tests = list(zip(input_files, output_files))

    t0 = time.perf_counter()
    for test_idx, test in enumerate(tests):
        input_file = test[0]
        output_file = test[1]

        input_lines = input_file.readlines()
        output_lines = output_file.readlines()
        if output_lines[0]  == '':
            output_lines = output_lines[1:]
        user_output_lines = main(input_lines) 

        if(len(user_output_lines) != len(output_lines)):
            print(f'test case [{test_idx}] failure')
            print("solution:", output_lines)
            print("user output:", user_output_lines)
            continue

        test_pass = 1
        for idx in range(len(output_lines)):
            if output_lines[idx] != user_output_lines[idx]:
                test_pass = 0
        
        if not test_pass:
            print(f'test case [{test_idx}] failure')
            print("solution:", output_lines)
            print("user output:", user_output_lines)
            
        test_pass_count += test_pass
        
    t1 = (time.perf_counter() - t0) * 1000.0

    with open('time-pass-result.py', 'a') as f:
        delimiter = " "
        f.write(t1)
        f.write(delimiter)
        f.write(test_pass_count)

test_runner()
`;

const testSingle = `# -*- coding: UTF-8 -*-
from userCode import main

output_file = open(f"data/output_0.txt", 'r')
input_file = open(f"data/input_0.txt", 'r')

input_lines = input_file.readlines()
output_lines = output_file.readlines()
user_output_lines = main(input_lines)

print(f"Single test case started.")
print(f"When you click 'submit' button, more test cases will be run!")
print("")

for idx in range(len(output_lines)):
    if output_lines[idx] == user_output_lines[idx]:
        print(f"  output line [{idx+1} / {len(output_lines)}] passed")
    else:
        print(f"  output line [{idx+1} / {len(output_lines)}] failed :(")
        print(f"    ㄴin {idx+1}'s line,")
        print(f"    ㄴExpecting {output_lines[idx]}, but your output is {user_output_lines[idx]}.")
        break

print("")

`;

export { testAll, testSingle };
