import * as renderer from 'react-test-renderer';
import * as React from 'react';


import ContactsMap from './contacts-map';

it(`ContactMap successfully rendered`, () => {

  const tree = renderer.create(
    <ContactsMap />);
   expect(tree).toMatchSnapshot();
});

