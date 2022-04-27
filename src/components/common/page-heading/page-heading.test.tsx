import * as renderer from 'react-test-renderer';
import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { appTheme } from '../../app/common';
import 'jest-styled-components';

import PageHeading from './page-heading';

it(`PageHeading successfully rendered`, () => {
  const tree = renderer.create(<ThemeProvider
    theme={appTheme}><PageHeading>
    <div />
  </PageHeading></ThemeProvider>);
  expect(tree).toMatchSnapshot();
});
