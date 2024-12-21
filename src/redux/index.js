import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import { userReducer } from "./user/reducer";
import { notesReducer } from "./notes/reducer";

const rootReducer = combineReducers({
  user: userReducer,
  notes: notesReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
