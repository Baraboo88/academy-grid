import * as Enzyme from 'enzyme';
import { mount } from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';

import toJson from 'enzyme-to-json';

import { ThemeProvider } from 'styled-components';

import 'jest-styled-components';
import NotFound from './not-found';
import { getTestStore } from '../../utils/test-utils';
import { appTheme } from '../app/common';
import { BrowserRouter } from 'react-router-dom';

Enzyme.configure({ adapter: new EnzymeReactAdapter() });

it(`NotFound successfully rendered`, () => {
  const tree = mount(<Provider store={getTestStore()}><BrowserRouter><ThemeProvider
    theme={appTheme}><NotFound /></ThemeProvider></BrowserRouter></Provider>);
  expect(toJson(tree, { mode: `deep` })).toMatchSnapshot();
});

