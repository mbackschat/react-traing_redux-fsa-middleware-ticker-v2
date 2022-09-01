import { composeWithDevTools } from "@redux-devtools/extension";
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore
} from "redux";
import thunk, {
  ThunkAction,
  ThunkDispatch,
  ThunkMiddleware
} from "redux-thunk";
import { trottleMiddleware } from "./throttle/middleware";
import { TickerReducer } from "./ticker/reducers";
import { TickerState } from "./ticker/types";

const reducer = combineReducers({
  ticker: TickerReducer
});

interface RootState {
  ticker: TickerState;
}

const thunkMiddleware: ThunkMiddleware<RootState, AnyAction> = thunk;

const configureStore = (initialState?: RootState) =>
  createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(trottleMiddleware, thunkMiddleware))
  );

const store = configureStore();

type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>;
type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
// typeof store.dispatch; it seems that this type inference does not work with composeWithDevTools

export { store };
export type { AppThunk, RootState, AppDispatch };
