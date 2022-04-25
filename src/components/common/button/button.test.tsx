import * as renderer from 'react-test-renderer';
import * as React from 'react';

import { MOCK_TEXT } from '../../../utils/test-utils';
import { Button } from '../common';
import { ThemeProvider } from 'styled-components';
import { appTheme } from '../../app/common';

import 'jest-styled-components';

it(`Button successfully rendered`, () => {

  const tree = renderer.create(<ThemeProvider
    theme={appTheme}><Button>{MOCK_TEXT}</Button></ThemeProvider>);
  expect(tree).toMatchSnapshot();
});


