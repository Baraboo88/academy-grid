import * as renderer from 'react-test-renderer';
import * as React from 'react';

import { ThemeProvider } from 'styled-components';
import { appTheme } from '../../app/common';

import 'jest-styled-components';

import ContactMap from './contact-map';

it(`ContactMap successfully rendered`, () => {

  const tree = renderer.create(
    <ContactMap />);
  expect(tree).toMatchSnapshot();
});

