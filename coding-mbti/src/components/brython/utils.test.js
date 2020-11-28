import * as utils from './utils';

describe('utils', () => {
    window.BrythonRunner = jest.fn();
    it('initBrythonRunner should work', () => {
        utils.initBrythonRunner('a', 'b');
    });
    it('createTestFiles should work', () => {
        utils.createTestFiles(['a'], ['b']);
    });
});
