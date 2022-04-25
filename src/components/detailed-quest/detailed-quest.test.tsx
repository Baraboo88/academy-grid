import * as Enzyme from 'enzyme';
import { mount } from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import toJson from 'enzyme-to-json';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';
import { DetailedQuest } from './detailed-quest';
import { BrowserRouter } from '../common/common';
import { getTestStore, mockQuests } from '../../utils/test-utils';
import { appTheme } from '../app/common';
import { ErrorMsg } from '../../reducer/reducer';

Enzyme.configure({ adapter: new EnzymeReactAdapter() });


it(`DetailedQuest successfully rendered`, () => {
  const mockHistory = { push: jest.fn };
  const mockResetCurrentQuestHandler = jest.fn();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const routeComponentPropsMock = {
    history: mockHistory as any,
    location: {} as any,
    match: {
      params: {
        id: 0,
      },
    } as any,
  };

  const tree = mount(<Provider store={getTestStore()}><BrowserRouter><ThemeProvider
    theme={appTheme}><DetailedQuest resetCurrentQuest={mockResetCurrentQuestHandler}  {...routeComponentPropsMock}
                                    currentQuest={mockQuests[0]}  /></ThemeProvider></BrowserRouter></Provider>);
  expect(toJson(tree, { mode: `deep` })).toMatchSnapshot();
});

