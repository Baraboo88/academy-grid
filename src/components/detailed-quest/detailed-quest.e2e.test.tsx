import * as Enzyme from 'enzyme';
import { mount, shallow } from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { DetailedQuest } from './detailed-quest';
import { BrowserRouter } from '../common/common';
import { getTestStore, mockQuests } from '../../utils/test-utils';
import { appTheme } from '../app/common';
import { ErrorMsg } from '../../reducer/reducer';

Enzyme.configure({ adapter: new EnzymeReactAdapter() });


describe(`DetailedQuest e2e`, () => {

  const mockHistory = { push: jest.fn() };
  const mockResetCurrentQuestHandler = jest.fn();
  const mockOnMount = jest.fn();
  // @ts-ignore
  let app;
  const routeComponentPropsMock = {
    history: mockHistory as any,
    location: {} as any,
    match: {
      params: {
        id: "1",
      },
    } as any,
  };

  beforeEach(() =>{
      app = mount(<Provider store={getTestStore()}><BrowserRouter><ThemeProvider
      theme={appTheme}><DetailedQuest onMount={mockOnMount}
                                      resetCurrentQuest={mockResetCurrentQuestHandler}
                                      currentQuest={mockQuests[0]} {...routeComponentPropsMock} errorMsg={ErrorMsg.NOT_FOUNT}/></ThemeProvider></BrowserRouter></Provider>);

  })

  it(`Should onMount successfully working`, () => {
    expect(mockOnMount).toHaveBeenCalledTimes(1);
    expect(mockOnMount).toHaveBeenCalledWith(1);
  });

  it(`Should resetCurrentQuest successfully working`, () => {
    // @ts-ignore
    app.unmount();
    expect(mockResetCurrentQuestHandler).toHaveBeenCalledTimes(1);
  })

  it(`Should push work if not found`, () => {
    expect(mockHistory.push).toHaveBeenCalledTimes(1);
    expect(mockHistory.push).toHaveBeenCalledWith("/not-found");
  })
});

