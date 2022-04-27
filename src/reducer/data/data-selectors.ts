import { StateModel } from '../../utils/utils';

export const i = 0;


export const getQuests = (state: StateModel) => state.data.quests;

export const getCurrentQuest = (state: StateModel) => state.data.currentQuest ? state.data.currentQuest : null;

export const getActiveTab =  (state: StateModel) => state.data.activeTab;

export const getIsOrderSent =(state: StateModel) => !!state.data.isOrderSent;

export const getErrorMsg = (state: StateModel) => state.data.errorMsg ;

export const getIsResponseReceived = (state: StateModel) => state.data.isResponseReceived;
