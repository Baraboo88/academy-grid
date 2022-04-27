import * as Enzyme from 'enzyme';
import { mount } from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';

import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';
import { getTestStore, mockQuests } from '../../../../utils/test-utils';
import { appTheme } from '../../../app/common';

import { BrowserRouter } from 'react-router-dom';
import { QuestsCatalog } from './quests-catalog';


Enzyme.configure({ adapter: new EnzymeReactAdapter() });


describe(`QuestsCatalog e2e`, () => {
  const mockOnMount = jest.fn();

  beforeEach(() => {

    mount(<Provider store={getTestStore()}><BrowserRouter><ThemeProvider
      theme={appTheme}><QuestsCatalog quests={mockQuests}
                                      onMount={mockOnMount}
                                      isResponseReceived={false}
                                      errorMsg={''} /></ThemeProvider></BrowserRouter></Provider>);
  })


  it(`Should onMount successfully working`, () => {
    expect(mockOnMount).toHaveBeenCalledTimes(1);
    expect(mockOnMount).toHaveBeenCalledWith();
  });

});
