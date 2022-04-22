export const UNAUTHORIZED_CODE = 401;
const BAD_REQUEST = 400;


export const Action = {
  ACTION_EXAMPLE: `action-example`,

  SET_ERROR: `set-error`,

};

const initialState = {
  cards: []
};


export const DataOperation = {

  requestExample() {
    return (dispatch:any, state:any, api:any) => {
      api
        .get(`/hotels`)
        .then((response:any) => {
          dispatch(ActionCreator.setExample(response.data));
        })
        .catch((error:any) => {
          if (error.response && error.response.status === UNAUTHORIZED_CODE) {
            return null;
          } else {
            dispatch(ActionCreator.setError(error.message));
          }
          return null;
        });
    };
  },

}

export const ActionCreator = {
  setExample(id:string) {
    return {type: Action.ACTION_EXAMPLE, payload: id};
  },
  setError(id:string) {
    return {type: Action.ACTION_EXAMPLE, payload: id};
  },

}



export const reducer = (state = initialState, action:any) => {
  switch (action.type) {
    case Action.ACTION_EXAMPLE:
      return Object.assign({}, state, {
        authorizationStatus: action.payload.authStatus,
        userData: action.payload.userData,
        isResponseReceived: true
      });
    case Action.SET_ERROR:
      return Object.assign({}, state, {errorMsg: action.payload});

  }
  return state;
};
