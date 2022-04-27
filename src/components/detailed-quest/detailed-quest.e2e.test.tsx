import * as Enzyme from 'enzyme';
import { mount } from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { DetailedQuest } from './detailed-quest';
import { BrowserRouter } from '../common/common';
import { getTestStore, mockQuests } from '../../utils/test-utils';
import { appTheme } from '../app/common';
import { ErrorMsg } from '../../reducer/data/data-reducer';

Enzyme.configure({ adapter: new EnzymeReactAdapter() });


describe(`DetailedQuest e2e`, () => {

  const mockHistory = { push: jest.fn() };
  const mockResetCurrentQuest = jest.fn();
  const mockOnMount = jest.fn();
  const mockSendOrder = jest.fn();
  const mockSetIsOrderSent = jest.fn();
  // @ts-ignore
  let app:any;
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
      theme={appTheme}><DetailedQuest setIsOrderSent={mockSetIsOrderSent} isOrderSent={true} sendOrder={mockSendOrder} onMount={mockOnMount}
                                      resetCurrentQuest={mockResetCurrentQuest}
                                      currentQuest={mockQuests[0]} {...routeComponentPropsMock} errorMsg={ErrorMsg.NotFound}/></ThemeProvider></BrowserRouter></Provider>);

  })

  it(`Should onMount successfully working`, () => {
    expect(mockOnMount).toHaveBeenCalledTimes(1);
    expect(mockOnMount).toHaveBeenCalledWith(1);
  });

  it(`Should resetCurrentQuest successfully working`, () => {
    // @ts-ignore
    app.unmount();
    expect(mockResetCurrentQuest).toHaveBeenCalledTimes(1);
  })

  it(`Should history push work if not found`, () => {
    expect(mockHistory.push).toHaveBeenCalledTimes(1);
    expect(mockHistory.push).toHaveBeenCalledWith("/not-found");
  })

  it(`Should addOrder works correctly`, () => {
    expect(mockSetIsOrderSent).toHaveBeenCalledTimes(1);
    expect(mockSetIsOrderSent).toHaveBeenCalledWith(false);
  });
});

