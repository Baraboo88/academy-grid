import { StateModel } from '../utils/utils';

export const i = 0;


export const getQuests = (state: StateModel) => state.quests;

export const getCurrentQuest = (state: StateModel) => state.currentQuest ? state.currentQuest : null;

export const getActiveTab =  (state: StateModel) => state.activeTab;

export const getIsOrderSent =(state: StateModel) => !!state.isOrderSent;

export const getErrorMsg = (state: StateModel) => state.errorMsg ;

export const getIsResponseReceived = (state: StateModel) => state.isResponseReceived;
