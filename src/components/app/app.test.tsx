import App from './app';
import { getTestStore } from '../../utils/test-utils';
import * as Enzyme from 'enzyme';
import { mount } from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';

import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new EnzymeReactAdapter() });

it(`App successfully rendered`, () => {
  const tree = mount(<Provider store={getTestStore()}><App /></Provider>);
  expect(toJson(tree, { mode: `deep` })).toMatchSnapshot();
});
