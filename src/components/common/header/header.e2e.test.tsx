import * as Enzyme from 'enzyme';
import { mount } from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import { ThemeProvider } from 'styled-components';
import { Header } from './header';
import { appTheme } from '../../app/common';
import { findByTestAtr, testInitialState } from '../../../utils/test-utils';
import 'jest-styled-components';
import { BrowserRouter } from '../common';

Enzyme.configure({ adapter: new EnzymeReactAdapter() });

describe(`Header e2e`, () => {
  const onTabChange = jest.fn();
  let app = mount(<BrowserRouter><ThemeProvider
    theme={appTheme}><Header activeTab={testInitialState.data.activeTab}
                             setActiveTab={onTabChange} /></ThemeProvider></BrowserRouter>);
  const links = findByTestAtr(app, `test-header-link-click`);

  it(`tab reset is working`, () => {
    links.forEach((link: any) => link.simulate(`click`));
    expect(onTabChange).toHaveBeenCalledTimes(3);
  });

});
