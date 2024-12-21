const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
  initialized: false,
};

export const userActions = {
  loadingStart: "USER/LOADING",
  loadingSuccess: "USER/LOADING/SUCCESS",
  loadingError: "USER/LOADING/ERROR",
  initialize: "USER/INITIALIZE",
};

export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case userActions.loadingStart:
      return {
        ...state,
        loading: true,
      };
    case userActions.loadingSuccess:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case userActions.loadingError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case userActions.initialize:
      return {
        ...state,
        user: action.payload,
        initialized: true,
      };
    default:
      return state;
  }
}
