/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint max-len: ["error", { "code": 130 }] */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import raw from 'raw.macro';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';

function isBrythonScriptLoaded() {
  return !!(
    document.getElementById('brython_sdk') &&
    document.getElementById('brython_stdlib')
  );
}

function initBrython() {
  return window.brython();
}

function setBrythonEditorInputHandler() {
  // set editor input handler
  const parser = raw('./brython/codeEditorScript.py');
  const script = document.createElement('script');
  script.type = 'text/python3';
  script.text = parser;

  document.body.appendChild(script);
  return () => {
    document.body.removeChild(script);
  };
}

function onLoad(editor) {
  return editor;
}

function CodeIDE(props) {
  const [code, setCode] = useState(
    '#happy coding! fixedFunctionName required.'
  );
  const onSubmit = async () => {
    const response = await axios.post('/api/analysis/test/', {
      source_code: code,
      elapsed_time: 10,
    });
    props.onPutTestResult(response.data);
    if (props.pid === '5') {
      props.history.push('/test/result');
    } else {
      props.history.replace(`${parseInt(props.pid, 10) + 1}`);
    }
  };

  useEffect(() => {
    // after loading necessary brython scripts, inititate brython
    if (isBrythonScriptLoaded()) {
      window.addEventListener('load', initBrython);
    }
    setBrythonEditorInputHandler();
  }, []);

  return (
    <Container>
      <Grid item xs={12}>
        <AceEditor
          name="ace-editor"
          mode="python"
          theme="monokai"
          height="500px"
          width="100%"
          onLoad={onLoad}
          onChange={(newCode) => setCode(newCode)}
          fontSize={14}
          showPrintMargin
          showGutter
          highlightActiveLine
          value={code}
          setOptions={{
            showLineNumbers: true,
            tabSize: 4,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <textarea
          id="console"
          style={{
            display: 'inline',
            backgroundColor: '#272822',
            color: 'white',
            width: `${100}%`,
            height: `${300}px`,
            padding: '1vw',
          }}
        />
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={6} align="center">
          <Button id="run" variant="outlined" size="large" color="secondary">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RUN&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Button>
        </Grid>

        <Grid item xs={6} align="center">
          <Button
            id="submit"
            variant="outlined"
            size="large"
            color="primary"
            onClick={onSubmit}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SUBMIT&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Button>
        </Grid>
        <textarea hidden id="code-pipe" />
      </Grid>
    </Container>
  );
}

CodeIDE.propTypes = {
  history: PropTypes.instanceOf(Object),
  pid: PropTypes.string,
  onPutTestResult: PropTypes.func,
};
CodeIDE.defaultProps = {
  history: {},
  pid: '0',
  onPutTestResult: () => {},
};

export default CodeIDE;
