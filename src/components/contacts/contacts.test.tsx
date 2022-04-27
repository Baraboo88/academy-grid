import * as Enzyme from 'enzyme';
import { mount } from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import toJson from 'enzyme-to-json';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';
import Contacts from './contacts';
import { appTheme } from '../app/common';
import { getTestStore } from '../../utils/test-utils';
import { BrowserRouter } from 'react-router-dom';

Enzyme.configure({ adapter: new EnzymeReactAdapter() });

it(`Contacts successfully rendered`, () => {
  const tree = mount(<Provider store={getTestStore()}><BrowserRouter><ThemeProvider
    theme={appTheme}><Contacts /></ThemeProvider></BrowserRouter></Provider>);
   expect(toJson(tree, { mode: `deep` })).toMatchSnapshot();
});
