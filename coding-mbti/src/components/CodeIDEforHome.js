import React, { useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import raw from 'raw.macro';
import { useAlert } from 'react-alert';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';

function isBrythonScriptLoaded() {
  return !!(
    document.getElementById('brython_sdk')
    && document.getElementById('brython_stdlib')
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

function CodeIDEforHome() {
  const [code, setCode] = useState(
    '#happy coding! fixedFunctionName required.',
  );
  const alert = useAlert();
  const onSubmit = () => {
    alert.show('You need to Login!');
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
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RUN&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SUBMIT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Button>
        </Grid>
        <textarea hidden id="code-pipe" />
      </Grid>
    </Container>
  );
}

export default CodeIDEforHome;
