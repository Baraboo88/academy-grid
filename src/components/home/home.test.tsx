import { getTestStore } from '../../utils/test-utils';
import * as Enzyme from 'enzyme';
import { mount } from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';

import toJson from 'enzyme-to-json';
import HomePage from './home';
import { BrowserRouter } from '../common/common';
import { appTheme } from '../app/common';
import { ThemeProvider } from 'styled-components';

Enzyme.configure({ adapter: new EnzymeReactAdapter() });

it(`Home successfully rendered`, () => {
  const tree = mount(<Provider store={getTestStore()}><BrowserRouter><ThemeProvider
    theme={appTheme}><HomePage/></ThemeProvider></BrowserRouter></Provider>);
  expect(toJson(tree, { mode: `deep` })).toMatchSnapshot();
});
