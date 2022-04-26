import * as renderer from 'react-test-renderer';
import * as React from 'react';

import 'jest-styled-components';

import ContactsMap from './contacts-map';

it(`ContactMap successfully rendered`, () => {

  const tree = renderer.create(
    <ContactsMap />);
  expect(tree).toMatchSnapshot();
});

