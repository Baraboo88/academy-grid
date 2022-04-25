import * as renderer from 'react-test-renderer';
import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { appTheme } from '../../app/common';
import 'jest-styled-components';

import { MOCK_TEXT } from '../../../utils/test-utils';
import PageTitle from './page-title';

it(`PageTitle successfully rendered`, () => {
  const tree = renderer.create(<ThemeProvider
    theme={appTheme}><PageTitle>{MOCK_TEXT}</PageTitle></ThemeProvider>);
  expect(tree).toMatchSnapshot();
});
