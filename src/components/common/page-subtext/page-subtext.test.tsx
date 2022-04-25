import * as renderer from 'react-test-renderer';
import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { appTheme } from '../../app/common';
import 'jest-styled-components';
import PageSubtext from './page-subtext';
import { MOCK_TEXT } from '../../../utils/test-utils';

it(`PageSubtext successfully rendered`, () => {
  const tree = renderer.create(<ThemeProvider
    theme={appTheme}><PageSubtext>{MOCK_TEXT}</PageSubtext></ThemeProvider>);
  expect(tree).toMatchSnapshot();
});
