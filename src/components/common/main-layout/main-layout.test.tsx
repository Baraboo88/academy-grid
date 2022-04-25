import * as Enzyme from 'enzyme';
import { mount } from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';

import toJson from 'enzyme-to-json';

import { ThemeProvider } from 'styled-components';
import { appTheme } from '../../app/common';
import { getTestStore, testInitialState } from '../../../utils/test-utils';

import { BrowserRouter } from '../common';
import MainLayout from './main-layout';
import 'jest-styled-components';

Enzyme.configure({ adapter: new EnzymeReactAdapter() });

it(`MainLayout successfully rendered`, () => {
  const tree = mount(<Provider store={getTestStore()}><BrowserRouter><ThemeProvider
    theme={appTheme}><MainLayout ><div/></MainLayout></ThemeProvider></BrowserRouter></Provider>);
  expect(toJson(tree, { mode: `deep` })).toMatchSnapshot();
});
