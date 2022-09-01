import { Action } from "redux";
import * as Actions from "./actions";
import { TickerState, TimestampedValue } from "./types";

const initialState: TickerState = {
  autoUpdate: false,
  isPending: false
};

export function TickerReducer(
  state: TickerState = initialState,
  action: Action
): TickerState {
  // STARTED
  if (Actions.updateAsync.started.match(action)) {
    return { ...state, isPending: true, error: undefined };
  }
  // DONE
  else if (Actions.updateAsync.done.match(action)) {
    const prev = state.current;
    const value = action.payload.result.value;
    const timestamp = new Date();
    const current: TimestampedValue = { value, timestamp };
    return { ...state, current, prev, isPending: false };
  }
  // FAILED
  else if (Actions.updateAsync.failed.match(action)) {
    const error = action.payload.error.message;
    return { ...state, isPending: false, error };
  }
  // for any other actions
  else if (Actions.setAutoUpdate.match(action)) {
    const autoUpdate = action.payload;
    return { ...state, autoUpdate };
  } else {
    return state;
  }
}
