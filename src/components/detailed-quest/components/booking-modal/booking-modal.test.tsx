import * as Enzyme from 'enzyme';
import { mount } from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import toJson from 'enzyme-to-json';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';
import { getTestStore } from '../../../../utils/test-utils';
import { appTheme } from '../../../app/common';

import { BrowserRouter } from 'react-router-dom';
import { BookingModal } from './booking-modal';


Enzyme.configure({ adapter: new EnzymeReactAdapter() });




it(`BookingModal successfully rendered`, () => {
  const MOCK_IS_ORDER_SENT = true
   const MOCK_BOOKING_MODAL_ERROR = ''
  const mockModalCloseHandler = jest.fn();
  const mockSendOrderHandler = jest.fn();
  const mockSetIsOrderSent = jest.fn();
  const tree = mount(<Provider store={getTestStore()}><BrowserRouter><ThemeProvider
    theme={appTheme}><BookingModal setIsOrderSent={mockSetIsOrderSent} errorMsg={MOCK_BOOKING_MODAL_ERROR}
                                   onBookingModalClose={mockModalCloseHandler} isOrderSent={MOCK_IS_ORDER_SENT}
                                   sendOrder={mockSendOrderHandler} /></ThemeProvider></BrowserRouter></Provider>);
  expect(toJson(tree, { mode: `deep` })).toMatchSnapshot();
});
