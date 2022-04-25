import * as Enzyme from 'enzyme';
import { mount } from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import toJson from 'enzyme-to-json';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';
import { getTestStore, mockQuests } from '../../../../utils/test-utils';
import { appTheme } from '../../../app/common';

import { BrowserRouter } from 'react-router-dom';
import { QuestsCatalog } from './quests-catalog';

Enzyme.configure({ adapter: new EnzymeReactAdapter() });

export const MOCK_IS_RESPONSE_RECEIVED = true;
export const MOCK_CATALOG_MODAL_ERROR = '';
export const mockSetQuestsHandler = jest.fn();
it(`BookingModal successfully rendered`, () => {

  const tree = mount(<Provider store={getTestStore()}><BrowserRouter><ThemeProvider
    theme={appTheme}><QuestsCatalog quests={mockQuests}
                                    getQuests={mockSetQuestsHandler}
                                    isResponseReceived={MOCK_IS_RESPONSE_RECEIVED}
                                    errorMsg={MOCK_CATALOG_MODAL_ERROR} /></ThemeProvider></BrowserRouter></Provider>);
  expect(toJson(tree, { mode: `deep` })).toMatchSnapshot();
});
