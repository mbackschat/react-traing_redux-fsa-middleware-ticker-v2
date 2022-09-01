import { AppThunk } from "../store";
import { setAutoUpdate, update } from "./actions";
import { getAutoUpdate, getPending } from "./selectors";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// This ensures that we do not start two async thunks in parallel.
let autoUpdateThunkRunning = false;

const startAutoUpdate = (delayInMs: number): AppThunk => async (
  dispatch,
  getState
) => {
  if (getAutoUpdate(getState())) {
    return;
  }
  dispatch(setAutoUpdate(true));
  if (autoUpdateThunkRunning) {
    console.log(
      "Skipping AutoUpdate thunk because another thunk is already running."
    );
    return;
  }
  autoUpdateThunkRunning = true;
  do {
    if (!getPending(getState())) {
      dispatch(update()); // triggers call to coinbase
    } else {
      console.log(
        "AutoUpdate: skipping dispatch because update is in progress."
      );
    }
    await sleep(delayInMs);
  } while (getAutoUpdate(getState()));
  console.log("AutoUpdate Thunk has stopped.");
  autoUpdateThunkRunning = false;
};

const stopAutoUpdate = (): AppThunk => (dispatch, getState) => {
  dispatch(setAutoUpdate(false));
};

export { startAutoUpdate, stopAutoUpdate };
