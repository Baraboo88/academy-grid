import { DataStateModel } from '../../utils/utils';

import { MOCK_TEXT, mockQuests } from '../../utils/test-utils';
import { DataAction, ActiveTab, dataReducer } from './data-reducer';


const initialState:DataStateModel = {
  quests: [],
  isResponseReceived: false,
  errorMsg: '',
  activeTab: ActiveTab.Main
};



it(`Reducer setQuests success`, () => {
  expect(dataReducer(initialState, {type: DataAction.SetQuests, payload: mockQuests})).toEqual({
    quests: mockQuests,
    isResponseReceived: true,
    errorMsg: '',
    activeTab: ActiveTab.Main
  });
});


it(`Reducer setQuest success`, () => {
  expect(dataReducer(initialState, {type: DataAction.SetQuest, payload: mockQuests[0]})).toEqual({
    quests: [],
    currentQuest: mockQuests[0],
    isResponseReceived: true,
    errorMsg: '',
    activeTab: ActiveTab.Main
  });
});

it(`Reducer setIsOrder sent success`, () => {
  expect(dataReducer(initialState, {type: DataAction.SetIsOrderSent, payload: true})).toEqual({
    quests: [],
    isOrderSent: true,
    isResponseReceived: true,
    errorMsg: '',
    activeTab: ActiveTab.Main
  });
});

it(`Reducer setError success`, () => {
  expect(dataReducer(initialState, {type: DataAction.SetError, payload: MOCK_TEXT})).toEqual({
    quests: [],
    isResponseReceived: true,
    errorMsg: MOCK_TEXT,
    activeTab: ActiveTab.Main
  });
});

it(`Reducer isResponseReceived success`, () => {
  expect(dataReducer(initialState, {type: DataAction.SetIsResponseReceived, payload: false})).toEqual({
    quests: [],
    isResponseReceived: false,
    errorMsg: '',
    activeTab: ActiveTab.Main
  });
});

it(`Reducer setActive tab success`, () => {
  expect(dataReducer(initialState, {type: DataAction.SetActiveTab, payload: ActiveTab.Contacts})).toEqual({
    quests: [],
    isResponseReceived: false,
    errorMsg: '',
    activeTab: ActiveTab.Contacts
  });
});



