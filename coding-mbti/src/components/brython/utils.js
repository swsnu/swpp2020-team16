export function createTestFiles(problemInputs, problemOutputs) {
  const zip = (arr0, arr1) => arr0.map((k, i) => [k, arr1[i]]);
  const testFiles = zip(problemInputs, problemOutputs)
    .map((testCase, idx) => {
      const inputFile = {};
      inputFile[`data/input_${idx}.txt`] = {
        type: 'text',
        body: testCase[0],
      };
      const outputFile = {};
      outputFile[`data/output_${idx}.txt`] = {
        type: 'text',
        body: testCase[1],
      };
      return [inputFile, outputFile];
    })
    .flat()
    .reduce((acc, cur) => {
      acc[Object.keys(cur)[0]] = cur[Object.keys(cur)[0]];
      return acc;
    }, {});

  return testFiles;
}

export function initBrythonRunner(testResultElement, outputElement) {
  return new window.BrythonRunner({
    onFileUpdate(filename, data) {
      document.getElementById(testResultElement).value = data.body;
    },
    stdout: {
      write(content) {
        document.getElementById(outputElement).value += content;
      },
      flush() { },
    },
    stderr: {
      write(content) {
        document.getElementById(outputElement).value += content;
      },
      flush() { },
    },
  });
}
