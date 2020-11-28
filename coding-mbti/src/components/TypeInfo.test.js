import { createShallow } from '@material-ui/core/test-utils';
import TypeInfo from './TypeInfo';
import appWrappers from '../appWrappers';

describe('<TypeInfo/>', () => {
  describe('should handle valid user types.', () => {
    let shallow;
    let testingProps;
    let testingComponent;
    let wrappedComponent;
    let shallowComponent;
    let target;

    const testCases = [
      'UTEJ', 'MTEJ', 'UTEC', 'MTEC',
      'UTFJ', 'MTFJ', 'UTFC', 'MTFC',
      'UIEJ', 'MIEJ', 'UIEC', 'MIEC',
      'UIFJ', 'MIFJ', 'UIFC', 'MIFC'
    ];

    testCases.forEach(userType => {
      beforeAll(() => {
        shallow = createShallow();
      });

      it(`if type is [${userType}] and it is proper, it should render component without error.`, () => {
        /* GIVEN - specific */
        testingComponent = TypeInfo;
        testingProps = { type: userType };
        wrappedComponent = appWrappers(testingComponent, testingProps);
        shallowComponent = shallow(wrappedComponent);

        /* WHEN */
        target = shallowComponent.find('TypeInfo').props().type;

        /* THEN */
        expect(target).toBe(userType);
      });

      it(`if type is [${userType}] and it is proper, it should render inner-component without error.`, () => {
        /* GIVEN - specific */
        testingComponent = TypeInfo;
        testingProps = { type: userType };
        wrappedComponent = appWrappers(testingComponent, testingProps);
        shallowComponent = shallow(wrappedComponent);

        /* WHEN */
        target = shallowComponent.find('TypeInfo').dive().find('Styled(MuiBox)').exists();

        /* THEN */
        expect(target).toBeTruthy();
      });
    });
  });

  describe('should throw error on invalid user types.', () => {
    let shallow;
    let testingProps;
    let testingComponent;
    let wrappedComponent;
    let shallowComponent;
    let target;

    const testCases = [
      'invalid user type', 'aaaa', 'bbbb', 'cccc'
    ];

    testCases.forEach(userType => {
      beforeAll(() => {
        shallow = createShallow();
      });

      it(`if type is [${userType}]`, () => {
        /* GIVEN - specific */
        testingComponent = TypeInfo;
        testingProps = { type: userType };
        wrappedComponent = appWrappers(testingComponent, testingProps);
        shallowComponent = shallow(wrappedComponent);

        /* WHEN */
        try {
          shallowComponent.find('TypeInfo').dive();
        } catch (e) {
          target = e;
        }
        /* THEN */
        expect(target).toBeInstanceOf(Error);
      });
    });
  });
});
