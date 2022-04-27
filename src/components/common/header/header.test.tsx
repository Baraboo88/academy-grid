import * as Enzyme from 'enzyme';
import { mount } from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';

import toJson from 'enzyme-to-json';

import { ThemeProvider } from 'styled-components';
import { Header } from './header';
import { appTheme } from '../../app/common';
import { getTestStore, testInitialState } from '../../../utils/test-utils';
import 'jest-styled-components';
import { BrowserRouter } from '../common';

Enzyme.configure({ adapter: new EnzymeReactAdapter() });

it(`Header successfully rendered`, () => {
  const mockFunc = jest.fn();
  const tree = mount(<Provider store={getTestStore()}><BrowserRouter><ThemeProvider
    theme={appTheme}><Header activeTab={testInitialState.data.activeTab}
                             setActiveTab={mockFunc} /></ThemeProvider></BrowserRouter></Provider>);
  expect(toJson(tree, { mode: `deep` })).toMatchSnapshot();
});
