import { Middleware } from "redux";
import { RootState } from "../store";

// Contains the action types to throttle
const throttled = new Set<string>();

export const trottleMiddleware: Middleware<
  {}, // Most middleware do not modify the dispatch return value
  RootState
> = (storeApi) => (next) => (action) => {
  const throttleDuration = action?.meta?.throttleDuration;
  // if action has not the throttledDuration meta field set,
  // then bypass throttling logic
  if (!throttleDuration || typeof throttleDuration !== "number") {
    return next(action);
  }

  // If action type is currently throttled, then ignore action
  if (throttled.has(action.type)) {
    console.log(`Skipping ${action.type} due to throttling…`);
    return;
  } else {
    throttled.add(action.type);
    setTimeout(() => {
      throttled.delete(action.type);
    }, throttleDuration);
    return next(action);
  }
};
