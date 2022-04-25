import * as Enzyme from 'enzyme';
import { mount } from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import toJson from 'enzyme-to-json';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';
import { findByTestAtr, getTestStore } from '../../../../utils/test-utils';
import { appTheme } from '../../../app/common';
import { BrowserRouter } from 'react-router-dom';
import { BookingModal } from './booking-modal';


Enzyme.configure({ adapter: new EnzymeReactAdapter() });


describe(`BookingModal e2e`, () => {
  const MOCK_IS_ORDER_SENT = true
  const MOCK_BOOKING_MODAL_ERROR = ''
  const mockModalCloseHandler = jest.fn();
  const mockSendOrderHandler = jest.fn();
  const mockSetIsOrderSentHandler = jest.fn();

  let app:any;

  beforeEach(() => {
    app = mount(<Provider store={getTestStore()}><BrowserRouter><ThemeProvider
      theme={appTheme}><BookingModal setIsOrderSent={mockSetIsOrderSentHandler} errorMsg={MOCK_BOOKING_MODAL_ERROR}
                                     onBookingModalClose={mockModalCloseHandler} isOrderSent={MOCK_IS_ORDER_SENT}
                                     sendOrder={mockSendOrderHandler} /></ThemeProvider></BrowserRouter></Provider>);
  })


  it(`Should addOrder works correctly`, () => {
    const formField = findByTestAtr(app, `test-addOrder`);
    formField.simulate(`submit`);
    expect(mockSendOrderHandler).toHaveBeenCalledTimes(1);
  });

  it(`Should Model close work correctly`, () => {
    const formField =  findByTestAtr(app, `test-model-close`);
    formField.simulate(`click`);
    expect(mockModalCloseHandler).toHaveBeenCalledTimes(2);
  });

  it(`Should Model close work correctly`, () => {
    const formField =  findByTestAtr(app, `test-model-close`);
    formField.simulate(`click`);
    expect(mockModalCloseHandler).toHaveBeenCalledTimes(2);
  });

  it(`Should IsOrderSent reset`, () => {
    app.unmount();
    expect(mockSetIsOrderSentHandler).toHaveBeenCalledTimes(1);
    expect(mockSetIsOrderSentHandler).toHaveBeenCalledWith(false);
  });
});