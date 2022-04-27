import { DataStateModel, OrderModel, QuestModel, StateModel } from '../../utils/utils';


export enum ResponseStatus{
  Ok = 201,
  BadRequest = 400,
  NotFound = 404,

}

export enum ErrorMsg {
  Other= 'Something went wrong...',
  NotFound = 'not-found',
}

export enum ActiveTab {
  Main, Contacts, Other
}

export enum DataAction {
  SetQuests = 'set-quests',
  SetQuest = 'set-quest',
  SetIsOrderSent = 'set-is-order-sent',
  SetError = 'set-error',
  SetIsResponseReceived = 'set-is-response-received',
  SetActiveTab = 'set-active-tab',
}

const initialState: DataStateModel = {
  quests: [],
  isResponseReceived: false,
  errorMsg: '',
  activeTab: ActiveTab.Main,
};


const resetIsResponseReceivedAndError=(dispatch:any) =>{
  dispatch(DataActionCreator.setError(''));
  dispatch(DataActionCreator.setIsResponseReceived(false));
}

export const DataOperation = {

  getQuests() {
    return (dispatch: any, state: StateModel, api: any) => {
      resetIsResponseReceivedAndError(dispatch);
      api
        .get(`/quests`)
        .then((response: any) => {
          dispatch(DataActionCreator.setQuests(response.data));
        })
        .catch((error: any) => {
          if (error.response.status === ResponseStatus.BadRequest) {
            dispatch(DataActionCreator.setError(ErrorMsg.Other));
          }
          dispatch(DataActionCreator.setError(error.message));
        });
    };
  },

  getQuest(id: number) {
    return (dispatch: any, state: StateModel, api: any) => {
      resetIsResponseReceivedAndError(dispatch);
      api
        .get(`/quests/${id}`)
        .then((response: any) => {
                 dispatch(DataActionCreator.setQuest(response.data));
        })
        .catch((error: any) => {
          if (error.response.status === ResponseStatus.BadRequest) {
            dispatch(DataActionCreator.setError(ErrorMsg.Other));
          } else if (error.response.status === ResponseStatus.NotFound) {
            dispatch(DataActionCreator.setError(ErrorMsg.NotFound));
          } else {
            dispatch(DataActionCreator.setError(error.message));
          }

        });
    };
  },

  sendOrder(order: OrderModel) {
    return (dispatch: any, state: StateModel, api: any) => {
      dispatch(DataActionCreator.setError(''));
      api
        .post(`/orders`, order)
        .then((response: any) => {
          if (response.status === ResponseStatus.Ok) {
            dispatch(DataActionCreator.setIsOrderSent(true));
          }else {
            dispatch(DataActionCreator.setError(ErrorMsg.Other));
          }
        })
        .catch((error: any) => {
          if (error.response.status === ResponseStatus.BadRequest) {
            dispatch(DataActionCreator.setError(ErrorMsg.Other));
          } else {
            dispatch(DataActionCreator.setError(error.message));
          }

        });
    };
  },

};

export const DataActionCreator = {
  setQuests(quests: QuestModel[]) {
    return { type: DataAction.SetQuests, payload: quests };
  },
  setQuest(quest: QuestModel | null) {
    return { type: DataAction.SetQuest, payload: quest };
  },
  setIsOrderSent(isOrderSent: boolean) {
    return { type: DataAction.SetIsOrderSent, payload: isOrderSent };
  },
  setError(error: string) {
    return { type: DataAction.SetError, payload: error };
  },
  setIsResponseReceived(isResponseReceived: boolean) {
    return { type: DataAction.SetIsResponseReceived, payload: isResponseReceived };
  },
  setActiveTab(tabIndex: ActiveTab) {
    return { type: DataAction.SetActiveTab, payload: tabIndex };
  },
};


export const dataReducer = (state: DataStateModel = initialState, action: any) => {
  switch (action.type) {
    case DataAction.SetQuests:
      return Object.assign({}, state, {
        quests: action.payload,
        isResponseReceived: true,
        errorMsg: '',
      });
    case DataAction.SetQuest:
      return Object.assign({}, state, {
        currentQuest: action.payload,
        isResponseReceived: true,
        errorMsg: '',
      });
    case DataAction.SetIsOrderSent:
      return Object.assign({}, state, {
        isOrderSent: action.payload,
        isResponseReceived: true,
        errorMsg: '',
      });
    case DataAction.SetError:
      return Object.assign({}, state, { errorMsg: action.payload, isResponseReceived: true });
    case DataAction.SetActiveTab:
      return Object.assign({}, state, { activeTab: action.payload });
    case DataAction.SetIsResponseReceived:
      return Object.assign({}, state, { isResponseReceived: action.payload });
  }
  return state;
};
