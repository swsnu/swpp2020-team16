import { createMount } from '@material-ui/core/test-utils';
import Check from './Check';
import appWrappers from '../../appWrappers';
import * as utils from '../../components/brython/utils';

describe('<Check/>', () => {
  let mount;
  let testingProps;
  let testingComponent;
  let wrappedComponent;
  let mountedComponent;
  let target;

  const runCodeWithFilesSpy = jest.fn();
  jest.spyOn(utils, 'initBrythonRunner').mockImplementation(() => ({
    runCodeWithFiles: runCodeWithFilesSpy
  }));

  beforeAll(() => {
    mount = createMount();
  });
  afterAll(() => {
    mount.cleanUp();
  });
  beforeEach(() => {
    testingComponent = Check;
    testingProps = { match: { params: { pid: '1' } } };
    wrappedComponent = appWrappers(testingComponent, testingProps);
  });

  it('should render withour any error', () => {
    /* GIVEN - specific */
    mountedComponent = mount(wrappedComponent);

    /* WHEN */
    target = mountedComponent.find('Showprob').exists();

    /* THEN */
    expect(target).toBeTruthy();

    // const component = mount(
    //   <Provider store={store}>
    //     <Check match={{ params: { pid: '1' } }} />
    //   </Provider>,
    // );
    // const wrapper = component.find('Showprob');
    // expect(wrapper.length).toBe(1);
  });
});
