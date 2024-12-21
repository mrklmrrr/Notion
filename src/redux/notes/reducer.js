const INITIAL_STATE = {
  data: [],
  loading: false,
  error: null,
};

export const notesActions = {
  loadingStart: "NOTES/LOADING",
  loadingSuccess: "NOTES/LOADING/SUCCESS",
  loadingError: "NOTES/LOADING/ERROR",
};

export function notesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case notesActions.loadingStart:
      return {
        ...state,
        loading: true,
      };
    case notesActions.loadingSuccess:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case notesActions.loadingError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
