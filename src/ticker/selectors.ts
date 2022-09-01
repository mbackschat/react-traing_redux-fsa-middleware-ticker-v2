import { RootState } from "../store";

export function getAutoUpdate(state: RootState) {
  return state.ticker.autoUpdate;
}

export function getPending(state: RootState) {
  return state.ticker.isPending;
}

export function getValues(state: RootState) {
  return {
    current: state.ticker.current?.value,
    prev: state.ticker.prev?.value
  };
}

export function getStatus(state: RootState) {
  const { isPending, error, current } = state.ticker;
  let status: string;
  if (isPending) {
    status = "Loading...";
  } else if (error !== undefined) {
    status = `Error: ${error}`;
  } else if (current) {
    status = `Updated at ${current.timestamp.toLocaleTimeString()}`;
  } else {
    status = "";
  }
  return status;
}

export function getDelta(state: RootState) {
  const { current, prev } = state.ticker;
  const currentVal = current?.value;
  const prevVal = prev?.value;
  const delta = prevVal && currentVal ? currentVal - prevVal : 0;
  return Math.round(delta * 100) / 100; // round to 2 decimal places;
}
