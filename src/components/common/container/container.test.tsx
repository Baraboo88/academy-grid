import * as renderer from 'react-test-renderer';
import * as React from 'react';

import { ThemeProvider } from 'styled-components';
import { appTheme } from '../../app/common';

import 'jest-styled-components';

import Container from './container';

it(`Container successfully rendered`, () => {

  const tree = renderer.create(<ThemeProvider
    theme={appTheme}><Container><div/></Container></ThemeProvider>);
  expect(tree).toMatchSnapshot();
});
