/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import raw from 'raw.macro';

/* M-UIs */
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

/* ACE Editor */
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';

/* react-alert HOOK */
import { useAlert } from 'react-alert';

//                                          //
//          initiators for brython          //
//                                          //

const isBrythonScriptLoaded = () => !!(
  document.getElementById('brython_sdk') &&
  document.getElementById('brython_stdlib')
);
const initBrython = () => window.brython();
const setBrythonEditorInputHandler = () => {
  const parser = raw('./brython/codeEditorScript.script');
  const script = document.createElement('script');
  script.type = 'text/python3';
  script.text = parser;
  document.body.appendChild(script);
};

//                                          //
//          event handlers for IDE          //
//                                          //

/*
    onCodeChange: handle user's code change

      - Basically, this function updates state for user's code.
      - Meanwhile, it also handles erase-counts.
          It checks the length of (prev) code and (updated) newCode,
          and if (updated) newCode is shorter, it adds eraseCount by 1.
*/
const onCodeChange = (newCode, code, eraseCount, setEraseCount, setCode) => {
  const deleted = newCode.length - code.length < 0;
  if (deleted) {
    setEraseCount(eraseCount + 1);
  }
  setCode(newCode);
};

/*
    onClickSubmit: handle user's click submit button

      - validates if the user is logged in.
        [TODO: must not validate with pid! use login cookie or whatever based on login data. ]s
      - aggregates solution data, then call props' handleSubmit function to save it to DB.
*/
const onClickSubmit = (loggedIn, code, eraseCount, elapsedTime, props, alert) => {
  if (loggedIn === false) {
    alert.show('You need to Login!');
  } else {
    const solution = {
      code,
      erase_cnt: eraseCount,
      elapsed_time: elapsedTime,
    };
    props.handleSubmit(props.pid, solution);
  }
};

export default function CodeIDE(props) {
  const alert = useAlert();

  const [code, setCode] = useState('#happy coding! fixedFunctionName required.');
  const [eraseCount, setEraseCount] = useState(0);

  useEffect(() => {
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
          onChange={(newCode) => onCodeChange(
            newCode, code, eraseCount, setEraseCount, setCode
          )}
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
          readOnly
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
        <Grid item xs={4} align="center">
          <Button
            id="run"
            variant="outlined"
            size="large"
            color="secondary"
          >
            RUN
          </Button>
        </Grid>
        <Grid item xs={4} align="center">
          <Button
            id="test"
            variant="outlined"
            size="large"
            color="secondary"
          >
            Test
          </Button>
        </Grid>
        <Grid item xs={4} align="center">
          <Button
            id="submit"
            variant="outlined"
            size="large"
            color="primary"
            onClick={() => {
              let elapsedTime;

              if (document.getElementById('elapsed-time') === null) {
                elapsedTime = 0;
              } else {
                elapsedTime = document.getElementById('elapsed-time').value;
              }

              onClickSubmit(
                props.loggedIn,
                code,
                eraseCount,
                elapsedTime,
                props,
                alert
              );
            }}
          >
            SUBMIT
          </Button>
        </Grid>
        <textarea
          hidden
          id="code-pipe"
          value={code}
          readOnly
        />
        <textarea
          id="elapsed-time"
        />
      </Grid>
    </Container>
  );
}

CodeIDE.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  pid: PropTypes.number.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  problemInput: PropTypes.object.isRequired,
  problemOutput: PropTypes.object.isRequired
};
