import * as Enzyme from 'enzyme';
import { mount } from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';
import { findByTestAtr, getTestStore } from '../../../../utils/test-utils';
import { appTheme } from '../../../app/common';
import { BrowserRouter } from 'react-router-dom';
import { BookingModal } from './booking-modal';
import { MOCK_BOOKING_MODAL_ERROR, MOCK_IS_ORDER_SENT } from './booking-modal.test';


Enzyme.configure({ adapter: new EnzymeReactAdapter() });


describe(`BookingModal e2e`, () => {

  const onMockModalClose = jest.fn();
  const mockSendOrder = jest.fn();
  const mockSetIsOrderSent = jest.fn();

  let app:any;

  beforeEach(() => {
    app = mount(<Provider store={getTestStore()}><BrowserRouter><ThemeProvider
      theme={appTheme}><BookingModal setIsOrderSent={mockSetIsOrderSent} errorMsg={MOCK_BOOKING_MODAL_ERROR}
                                     onBookingModalClose={onMockModalClose} isOrderSent={MOCK_IS_ORDER_SENT}
                                     sendOrder={mockSendOrder} /></ThemeProvider></BrowserRouter></Provider>);
  })


  it(`Should addOrder works correctly`, () => {
    const formField = findByTestAtr(app, `test-addOrder`);
    formField.simulate(`submit`);
    expect(mockSendOrder).toHaveBeenCalledTimes(1);
  });

  it(`Should Model close work correctly`, () => {
    const formField =  findByTestAtr(app, `test-model-close`);
    formField.simulate(`click`);
    expect(onMockModalClose).toHaveBeenCalledTimes(2);
  });


  it(`Should IsOrderSent reset`, () => {
    app.unmount();
    expect(mockSetIsOrderSent).toHaveBeenCalledTimes(1);
    expect(mockSetIsOrderSent).toHaveBeenCalledWith(false);
  });
});
