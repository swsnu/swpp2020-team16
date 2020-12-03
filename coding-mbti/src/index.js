import ReactDOM from 'react-dom';
import './index.css';
import appWrapper from './appWrappers';
import App from './App';

const propsForAppComponent = {};

ReactDOM.render(
  appWrapper(App, propsForAppComponent),
  document.getElementById('root'),
);
