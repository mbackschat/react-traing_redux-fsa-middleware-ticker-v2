import actionCreatorFactory from "typescript-fsa";
import { AppThunk } from "../store";
import { throttled } from "../throttle/throttled";
import { getPrice } from "./coinbase-api";

const actionCreator = actionCreatorFactory("Ticker");

const updateAsync = actionCreator.async<
  {}, // param
  { value: number }, // success
  { message: string } // failure
>("UPDATE_ASYNC");

type UpdateParams = void; // update has no parameter, but you can add props here as you like…

// This is an async thunk action creator. Install Redux Thunk middleware to dispatch it
const _updateThunk = (params: UpdateParams): AppThunk => async (
  dispatch,
  getState
) => {
  const params = {};
  dispatch(updateAsync.started(params));
  try {
    const value = await getPrice();
    dispatch(updateAsync.done({ params, result: { value } }));
  } catch (err) {
    const message = err instanceof TypeError ? err.message : "unknown error";
    dispatch(updateAsync.failed({ params, error: { message } }));
    //
  }
};
// We use the throttled higher-order function to get a thunk that is throttled…
const update = (params: UpdateParams) =>
  throttled(_updateThunk(params), "Ticker/UPDATE", 1000);

const setAutoUpdate = actionCreator<boolean>("AUTOUPDATE");

export { update, setAutoUpdate, updateAsync };
