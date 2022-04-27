import * as renderer from 'react-test-renderer';
import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { appTheme } from '../../app/common';
import 'jest-styled-components';
import Footer from './footer';


it(`Footer successfully rendered`, () => {
  const tree = renderer.create(<ThemeProvider
    theme={appTheme}><Footer /></ThemeProvider>);
  expect(tree).toMatchSnapshot();
});
