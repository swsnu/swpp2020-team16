/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/* M-UIs */
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

/* ACE Editor */
import AceEditor from 'react-ace';
import { cloneObj } from '../utils/testingUtils';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';

import brFileSystem from './brython/fileSystem';
import { initBrythonRunner, createTestFiles } from './brython/utils';

import SignDialog from './SignDialog';
import CodeIDEProceedDialog from './CodeIDEProceedDialog';

export default function CodeIDE(props) {
  const { signedIn, pid, handleSubmit, problemInputs, problemOutputs } = props;

  const testFiles = createTestFiles(problemInputs, problemOutputs);
  const initialFiles = { ...brFileSystem, ...testFiles };

  const [runner, setRunner] = useState(null);
  const [files, setFiles] = useState(initialFiles);
  const [openProceedDialog, setOpenProceedDialog] = useState(false);
  const [openSignDialog, setOpenSignDialog] = useState(false);
  const [codeEraseCnt, setCodeEraseCnt] = useState(0);

  useEffect(() => {
    setRunner(initBrythonRunner('time-with-pass-count', 'output'));
  }, []);

  function clickResetPythonCode() {
    setFiles({
      ...files,
      'userCode.py': {
        ...brFileSystem['userCode.py'],
      },
    });
    setCodeEraseCnt(0);
    document.getElementById('output').value = '';
  }

  async function clickRunPythonCode() {
    document.getElementById('output').value = '';
    const fs = cloneObj(files);
    await runner.runCodeWithFiles(fs['userCode.py'].body, fs);
    document.getElementById('output').value += '\n코드 실행이 완료되었습니다.';
  }

  async function clickTestPythonCode() {
    document.getElementById('output').value = '';
    const fs = cloneObj(files);
    await runner.runCodeWithFiles(fs['test-single.py'].body, fs);
    document.getElementById('output').value += '\n코드 실행이 완료되었습니다.';
  }

  function handleSubmitWithTestCheck(forceSubmit = false) {
    const timeNpass = document
      .getElementById('time-with-pass-count')
      .value.split(' ')
      .map((el) => Number(el));

    if (timeNpass.length === 1) timeNpass.push(0);

    if (!forceSubmit && timeNpass[1] !== problemInputs.length) {
      setOpenProceedDialog(true);
      return;
    }

    const evaluation = (timeNpass[1] / problemInputs.length) * 100;

    handleSubmit(pid, {
      code: files['userCode.py'].body,
      erase_cnt: codeEraseCnt,
      elapsed_time: timeNpass[0],
      evaluation: Math.round(evaluation),
    });
  }

  async function clickSubmitPythonCode() {
    if (!signedIn) {
      setOpenSignDialog(true);
      return;
    }

    document.getElementById('output').value = '';
    const fs = cloneObj(files);
    await runner.runCodeWithFiles(fs['test-all.py'].body, fs);
    document.getElementById('output').value += '\n코드 실행이 완료되었습니다.';

    handleSubmitWithTestCheck();
    setFiles(initialFiles);
  }

  function clickUploadPythonCode(e) {
    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result;
      setFiles({
        ...files,
        'userCode.py': {
          ...files['userCode.py'],
          body: content,
        },
      });
    };
    reader.readAsText(e.target.files[0]);
  }

  function handleUserWriteCode(value) {
    if (files['userCode.py'].body.length > value.length) {
      setCodeEraseCnt(codeEraseCnt + 1);
    }

    setFiles({
      ...files,
      'userCode.py': {
        ...files['userCode.py'],
        body: value,
      },
    });
  }

  return (
    <>
      <Container>
        <Grid item xs={12}>
          <AceEditor
            name="ace-editor"
            mode="python"
            theme="monokai"
            height="350px"
            width="100%"
            onChange={(newCode) => handleUserWriteCode(newCode)}
            fontSize={14}
            showPrintMargin
            showGutter
            highlightActiveLine
            value={files['userCode.py'].body}
            setOptions={{
              showLineNumbers: true,
              tabSize: 4,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              backgroundColor: '#272822',
              width: `${100}%`,
              height: `${150}px`,
            }}
          >
            <TextareaAutosize
              id="output"
              readOnly
              style={{
                backgroundColor: '#272822',
                outline: 'none',
                color: 'white',
                width: `${100}%`,
                height: `${150}px`,
                margin: '0px',
                resize: 'none',
              }}
              data-role="none"
            />
          </div>
        </Grid>
        <Grid
          container
          item
          xs={12}
          style={{
            backgroundColor: '#272822',
            marginBottom: '5vw',
            height: `${50}px`,
          }}
          justify="center"
          alignItems="center"
        >
          <Grid item xs={2} align="center">
            <Button
              id="run"
              variant="contained"
              size="large"
              color="secondary"
              onClick={clickRunPythonCode}
            >
              RUN
            </Button>
          </Grid>
          <Grid item xs={2} align="center">
            <Button
              id="test"
              variant="contained"
              size="large"
              color="secondary"
              onClick={clickTestPythonCode}
            >
              Test
            </Button>
          </Grid>
          <Grid item xs={2} align="center">
            <Button
              id="submit"
              variant="contained"
              size="large"
              color="primary"
              onClick={clickSubmitPythonCode}
            >
              SUBMIT
            </Button>
          </Grid>
          <Grid item xs={2} align="center" />
          <Grid item xs={2} align="center">
            <Button
              id="reset"
              variant="outlined"
              size="large"
              color="primary"
              onClick={clickResetPythonCode}
            >
              Reset
            </Button>
          </Grid>
          <Grid item xs={2} align="center">
            <input
              id="upload"
              type="file"
              hidden
              onChange={clickUploadPythonCode}
            />
            <label htmlFor="upload">
              <Button
                color="primary"
                variant="outlined"
                size="large"
                component="span"
              >
                Upload
              </Button>
            </label>
          </Grid>
        </Grid>
        <textarea id="time-with-pass-count" hidden />
      </Container>
      <CodeIDEProceedDialog
        open={openProceedDialog}
        onClose={() => setOpenProceedDialog(false)}
        proceedSumbit={() => handleSubmitWithTestCheck(true)}
      />
      <SignDialog
        open={openSignDialog}
        onClose={() => setOpenSignDialog(false)}
      />
    </>
  );
}

CodeIDE.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  pid: PropTypes.number.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  problemInputs: PropTypes.arrayOf(PropTypes.string),
  problemOutputs: PropTypes.arrayOf(PropTypes.string),
};
CodeIDE.defaultProps = {
  problemInputs: ['1', '2'],
  problemOutputs: ['1', '2'],
};
