import { mockQuests } from '../utils/test-utils';
import { OrderModel, QuestModel, StateModel } from '../utils/utils';

const BAD_REQUEST = 400;

export const ErrorMsg ={
  other: 'Something went wrong...',
  data: 'Please check the data'
}


export const Action = {
  SET_QUESTS: 'set-quests',
  SET_QUEST: 'set-quest',
  SET_IS_ORDER_SENT: 'set-is-order-sent',
  SET_ERROR: 'set-error'
};

const initialState:StateModel = {
  quests: [],
  isResponseReceived: false,
  errorMsg: ''
};


export const Operation = {

  getQuests() {
    return (dispatch:any, state:StateModel, api:any) => {
      api
        .get(`/quests`)
        .then((response:any) => {
          dispatch(ActionCreator.setQuests(response.data));
        })
        .catch((error:any) => {
          if (error.response.status === BAD_REQUEST) {
            dispatch(ActionCreator.setError(ErrorMsg.other));
          }
          dispatch(ActionCreator.setError(error.message));
        });
    };
  },

  getQuest(id:number) {
    return (dispatch:any, state:StateModel, api:any) => {
      api
        .get(`/quests/${id}`)
        .then((response:any) => {
          dispatch(ActionCreator.setQuest(response.data));
        })
        .catch((error:any) => {
          if (error.response.status === BAD_REQUEST) {
            dispatch(ActionCreator.setError(ErrorMsg.other));
          }
          dispatch(ActionCreator.setError(error.message));
        });
    };
  },

  sendOrder(order:OrderModel) {
    return (dispatch:any, state:StateModel, api:any) => {
      api
        .post(`/orders`, order)
        .then((response:any) => {
          dispatch(ActionCreator.setQuest(response.data));
        })
        .catch((error:any) => {
          if (error.response.status === BAD_REQUEST) {
            dispatch(ActionCreator.setError(ErrorMsg.other));
          }
          dispatch(ActionCreator.setError(error.message));
        });
    };
  },

}

export const ActionCreator = {
  setQuests(quests: QuestModel[]) {
    return {type: Action.SET_QUESTS, payload: quests};
  },
  setQuest(quest: QuestModel | null) {
    return {type: Action.SET_QUEST, payload: quest};
  },
  setIsOrderSent(isOrderSent: QuestModel) {
    return {type: Action.SET_IS_ORDER_SENT, payload: isOrderSent};
  },
  setError(error: string) {
    return {type: Action.SET_QUEST, payload: error};
  },
}



export const reducer = (state: StateModel = initialState, action:any) => {
  switch (action.type) {
    case Action.SET_QUESTS:
      return Object.assign({}, state, {
        quests: action.payload,
        isResponseReceived: true,
        errorMsg: ''
      });
    case Action.SET_QUEST:
      return Object.assign({}, state, {
        currentQuest: action.payload,
        errorMsg: ''
      });
    case Action.SET_IS_ORDER_SENT:
      return Object.assign({}, state, {
        isOrderSent: action.payload,
        isResponseReceived: true,
        errorMsg: ''
      });
    case Action.SET_ERROR:
      return Object.assign({}, state, {errorMsg: action.payload});

  }
  return state;
};
