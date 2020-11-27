import initialCode from './userInitialCode';
import { testAll, testSingle } from './testCode';

const brythonFileSystem = {
    'hello.py': {
        type: 'text',
        body: 'print("hello world")',
    },
    'data/': {
        type: 'dir',
        body: '',
    },
    'test-all.py': {
        type: 'text',
        body: testAll,
    },
    'test-single.py': {
        type: 'text',
        body: testSingle,
    },
    'time-pass-result.py': {
        type: 'text',
        body: '',
    },
    'userCode.py': {
        type: 'text',
        body: initialCode,
    }
};

export default brythonFileSystem;
