import { StateModel } from '../utils/utils';
import { Action, ActiveTab, reducer } from './reducer';
import { MOCK_TEXT, mockQuests } from '../utils/test-utils';


const initialState:StateModel = {
  quests: [],
  isResponseReceived: false,
  errorMsg: '',
  activeTab: ActiveTab.Main
};



it(`Reducer set quests success`, () => {
  expect(reducer(initialState, {type: Action.SetQuests, payload: mockQuests})).toEqual({
    quests: mockQuests,
    isResponseReceived: true,
    errorMsg: '',
    activeTab: ActiveTab.Main
  });
});


it(`Reducer set quest success`, () => {
  expect(reducer(initialState, {type: Action.SetQuest, payload: mockQuests[0]})).toEqual({
    quests: [],
    currentQuest: mockQuests[0],
    isResponseReceived: true,
    errorMsg: '',
    activeTab: ActiveTab.Main
  });
});

it(`Reducer reset quest success`, () => {
  expect(reducer(initialState, {type: Action.ResetQuest})).toEqual({
    quests: [],
    currentQuest:null,
    isResponseReceived: false,
    errorMsg: '',
    activeTab: ActiveTab.Main
  });
});


it(`Reducer set is order sent success`, () => {
  expect(reducer(initialState, {type: Action.SetIsOrderSent, payload: true})).toEqual({
    quests: [],
    isOrderSent: true,
    isResponseReceived: true,
    errorMsg: '',
    activeTab: ActiveTab.Main
  });
});

it(`Reducer set error success`, () => {
  expect(reducer(initialState, {type: Action.SetError, payload: MOCK_TEXT})).toEqual({
    quests: [],
    isResponseReceived: true,
    errorMsg: MOCK_TEXT,
    activeTab: ActiveTab.Main
  });
});

it(`Reducer set isResponseReceived success`, () => {
  expect(reducer(initialState, {type: Action.SetIsResponseReceived, payload: false})).toEqual({
    quests: [],
    isResponseReceived: false,
    errorMsg: '',
    activeTab: ActiveTab.Main
  });
});

it(`Reducer set active tab success`, () => {
  expect(reducer(initialState, {type: Action.SetActiveTab, payload: ActiveTab.Contacts})).toEqual({
    quests: [],
    isResponseReceived: false,
    errorMsg: '',
    activeTab: ActiveTab.Contacts
  });
});



