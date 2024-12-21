import API from "../../utils/API";
import { userActions } from "./reducer";

export function login(email, password) {
  return async (dispatch) => {
    dispatch({ type: userActions.loadingStart });
    try {
      const query = new URLSearchParams({
        email,
        password,
      }).toString();

      const data = await API.getUsersByQuery(`users?${query}`);

      if (data.length !== 1) {
        throw new Error("This user does not exist");
      }

      const [user] = data;

      dispatch({ type: userActions.loadingSuccess, payload: user });
    } catch (error) {
      dispatch({ type: userActions.loadingError, payload: error.message });
    }
  };
}

export function register(email, password) {
  return async (dispatch) => {
    dispatch({ type: userActions.loadingStart });
    try {
      const existingUsers = await API.getUsersByQuery(`email=${email}`);

      if (existingUsers.length > 0) {
        throw new Error("This user already exists");
      }

      const user = await API.signUp(email, password);

      dispatch({ type: userActions.loadingSuccess, payload: user });
    } catch (error) {
      dispatch({ type: userActions.loadingError, payload: error.message });
    }
  };
}

export function logout() {
  return async (dispatch) => {
    dispatch({ type: userActions.loadingStart });
    try {
      dispatch({ type: userActions.loadingSuccess, payload: null });
    } catch (error) {
      dispatch({ type: userActions.loadingError, payload: error.message });
    }
  };
}

export function initialize() {
  return async (dispatch) => {
    dispatch({ type: userActions.loadingStart });
    try {
      const id = localStorage.getItem("userId");

      if (id) {
        const user = await API.getUser(id);
        dispatch({ type: userActions.loadingSuccess, payload: user });
      } else {
        dispatch({ type: userActions.loadingSuccess, payload: null });
      }
    } catch (error) {
      dispatch({ type: userActions.loadingError, payload: error.message });
    } finally {
      dispatch({ type: userActions.initialize });
    }
  };
}
