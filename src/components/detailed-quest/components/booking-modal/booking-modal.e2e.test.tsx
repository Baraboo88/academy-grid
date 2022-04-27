import * as Enzyme from 'enzyme';
import { mount } from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';
import { findByTestAtr, getTestStore } from '../../../../utils/test-utils';
import { appTheme } from '../../../app/common';
import { BrowserRouter } from 'react-router-dom';

import { OrderModel } from '../../../../utils/utils';
import { BookingModal } from '../components';


Enzyme.configure({ adapter: new EnzymeReactAdapter() });

export const mockOrder: OrderModel = { name: 'Mock Name', phone: '975093', isLegal: true, peopleCount: '3' };

describe(`BookingModal e2e`, () => {

  const onMockModalClose = jest.fn();
  const onMockNameChange = jest.fn();
  const onMockPeopleCountChange = jest.fn();
  const onMockPhoneChange = jest.fn();
  const onMockIsLegalChange = jest.fn();
  const onMockFormSubmit = jest.fn();
  let app: any;

  beforeEach(() => {
    app = mount(<Provider store={getTestStore()}><BrowserRouter><ThemeProvider
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
  });


  it(`Should Model close works correctly`, () => {
    const closeButton = findByTestAtr(app, `test-model-close`);
    closeButton.simulate(`click`);
    expect(onMockModalClose).toHaveBeenCalledTimes(1);
  });

  it(`Should name change works correctly`, () => {
    const formField = findByTestAtr(app, `test-name-changed`);
    formField.simulate(`change`);
    expect(onMockNameChange).toHaveBeenCalledTimes(1);
  });

  it(`Should people count change works correctly`, () => {
    const formField = findByTestAtr(app, `test-people-count-changed`);
    formField.simulate(`change`);
    expect(onMockPeopleCountChange).toHaveBeenCalledTimes(1);
  });


  it(`Should phone change works correctly`, () => {
    const formField = findByTestAtr(app, `test-phone-changed`);
    formField.simulate(`change`);
    expect(onMockPhoneChange).toHaveBeenCalledTimes(1);
  });

  it(`Should is legal change works correctly`, () => {
    const formField = findByTestAtr(app, `test-is-legal-changed`);
    formField.simulate(`change`);
    expect(onMockIsLegalChange).toHaveBeenCalledTimes(1);
  });


  it(`Should submit works correctly`, () => {
    const formField = findByTestAtr(app, `test-submit`);
    formField.simulate(`submit`);
    expect(onMockFormSubmit).toHaveBeenCalledTimes(1);
  });
});
