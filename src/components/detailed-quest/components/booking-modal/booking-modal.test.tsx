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
import BookingModal from './booking-modal';
import { mockOrder } from './booking-modal.e2e.test';


Enzyme.configure({ adapter: new EnzymeReactAdapter() });


it(`BookingModal successfully rendered`, () => {

  const onMockModalClose = jest.fn();
  const onMockNameChange = jest.fn();
  const onMockPeopleCountChange = jest.fn();
  const onMockPhoneChange = jest.fn();
  const onMockIsLegalChange = jest.fn();
  const onMockFormSubmit = jest.fn();

  const tree = mount(<Provider store={getTestStore()}><BrowserRouter><ThemeProvider
    theme={appTheme}><BookingModal onBookingModalClose={onMockModalClose} name={mockOrder.name}
                                   peopleCount={mockOrder.peopleCount}
                                   phone={mockOrder.phone}
                                   isLegal={mockOrder.isLegal}
                                   modalError={''}
                                   onNameChange={onMockNameChange}
                                   onPeopleCountChange={onMockPeopleCountChange}
                                   onPhoneChange={onMockPhoneChange}
                                   onIsLegalChange={onMockIsLegalChange}
                                   onFormSubmit={onMockFormSubmit} /></ThemeProvider></BrowserRouter></Provider>);


  expect(toJson(tree, { mode: `deep` })).toMatchSnapshot();
});
