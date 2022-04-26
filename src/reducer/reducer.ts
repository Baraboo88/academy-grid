import { OrderModel, QuestModel, StateModel } from '../utils/utils';


export enum ResponseStatus{
  OK = 201,
  BadRequest = 400,
  NotFound = 404,

}

const NOT_FOUND_ERROR = 404;
const ORDER_OK_STATUS = 201;

export enum ErrorMsg {
  Other= 'Something went wrong...',
  Data = 'Please check the data',
  NotFound = 'not-found',
}

export enum ActiveTab {
  Main, Contacts, Other
}

export enum Action {
  SetQuests = 'set-quests',
  SetQuest = 'set-quest',
  ResetQuest =  'reset-quest',
  SetIsOrderSent = 'set-is-order-sent',
  SetError = 'set-error',
  SetIsResponseReceived = 'set-is-response-received',
  SetActiveTab = 'set-active-tab',
}

const initialState: StateModel = {
  quests: [],
  isResponseReceived: false,
  errorMsg: '',
  activeTab: ActiveTab.Main,
};


const resetIsResponseReceivedAndError=(dispatch:any) =>{
  dispatch(ActionCreator.setError(''));
  dispatch(ActionCreator.setIsResponseReceived(false));
}

export const Operation = {

  getQuests() {
    return (dispatch: any, state: StateModel, api: any) => {
      resetIsResponseReceivedAndError(dispatch);
      api
        .get(`/quests`)
        .then((response: any) => {
          dispatch(ActionCreator.setQuests(response.data));
        })
        .catch((error: any) => {
          if (error.response.status === ResponseStatus.BadRequest) {
            dispatch(ActionCreator.setError(ErrorMsg.Other));
          }
          dispatch(ActionCreator.setError(error.message));
        });
    };
  },

  getQuest(id: number) {
    return (dispatch: any, state: StateModel, api: any) => {
      resetIsResponseReceivedAndError(dispatch);
      api
        .get(`/quests/${id}`)
        .then((response: any) => {
                 dispatch(ActionCreator.setQuest(response.data));
        })
        .catch((error: any) => {

          if (error.response.status === ResponseStatus.BadRequest) {
            dispatch(ActionCreator.setError(ErrorMsg.Other));
          } else if (error.response.status === NOT_FOUND_ERROR) {
            dispatch(ActionCreator.setError(ErrorMsg.NotFound));
          } else {
            dispatch(ActionCreator.setError(error.message));
          }

        });
    };
  },

  sendOrder(order: OrderModel) {
    return (dispatch: any, state: StateModel, api: any) => {

      dispatch(ActionCreator.setError(''));
      api
        .post(`/orders`, order)
        .then((response: any) => {
          if (response.status === ORDER_OK_STATUS) {
            dispatch(ActionCreator.setIsOrderSent(true));
          }

        })
        .catch((error: any) => {
          if (error.response.status === ResponseStatus.BadRequest) {
            dispatch(ActionCreator.setError(ErrorMsg.Other));
          } else {
            dispatch(ActionCreator.setError(error.message));
          }

        });
    };
  },

};

export const ActionCreator = {
  setQuests(quests: QuestModel[]) {
    return { type: Action.SetQuests, payload: quests };
  },
  setQuest(quest: QuestModel | null) {
    return { type: Action.SetQuest, payload: quest };
  },
  resetQuest(){
    return { type: Action.ResetQuest};
  },
  setIsOrderSent(isOrderSent: boolean) {
    return { type: Action.SetIsOrderSent, payload: isOrderSent };
  },
  setError(error: string) {
    return { type: Action.SetError, payload: error };
  },
  setIsResponseReceived(isResponseReceived: boolean) {
    return { type: Action.SetIsResponseReceived, payload: isResponseReceived };
  },
  setActiveTab(tabIndex: ActiveTab) {
    return { type: Action.SetActiveTab, payload: tabIndex };
  },
};


export const reducer = (state: StateModel = initialState, action: any) => {
  switch (action.type) {
    case Action.SetQuests:
      return Object.assign({}, state, {
        quests: action.payload,
        isResponseReceived: true,
        errorMsg: '',
      });
    case Action.SetQuest:
      return Object.assign({}, state, {
        currentQuest: action.payload,
        isResponseReceived: true,
        errorMsg: '',
      });
    case Action.ResetQuest:
      return Object.assign({}, state, {
        currentQuest: null,
        isResponseReceived: false,
        errorMsg: '',
      });
    case Action.SetIsOrderSent:
      return Object.assign({}, state, {
        isOrderSent: action.payload,
        isResponseReceived: true,
        errorMsg: '',
      });
    case Action.SetError:
      return Object.assign({}, state, { errorMsg: action.payload, isResponseReceived: true });
    case Action.SetActiveTab:
      return Object.assign({}, state, { activeTab: action.payload });
    case Action.SetIsResponseReceived:
      return Object.assign({}, state, { isResponseReceived: action.payload });
  }
  return state;
};
