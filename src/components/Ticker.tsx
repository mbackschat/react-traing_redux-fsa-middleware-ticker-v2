import { useSelector } from "react-redux";
import { update } from "../ticker/actions";
import { startAutoUpdate, stopAutoUpdate } from "../ticker/autoupdate.thunk";
import {
  getAutoUpdate,
  getDelta,
  getStatus,
  getValues
} from "../ticker/selectors";
import { useAppDispatch } from "./hooks";

function Ticker() {
  const values = useSelector(getValues);
  const autoUpdate = useSelector(getAutoUpdate);
  const status = useSelector(getStatus);
  const delta = useSelector(getDelta);
  console.log("Ticker rendered");

  return (
    <div>
      <h1>Bitcoin Ticker</h1>
      <h2>Current: {values.current ?? "–"}</h2>
      <div>{status}&nbsp;</div>
      <div>Autoupdate is {autoUpdate ? "on" : "off"}</div>
      <h3>
        Prev: {values.prev ?? "–"}, Delta: {delta}
      </h3>
    </div>
  );
}

function StartAutoUpdateButton() {
  const dispatch = useAppDispatch();
  return (
    <button onClick={() => dispatch(startAutoUpdate(10000))}>
      Auto Update every 10s
    </button>
  );
}

function StopAutoUpdateButton() {
  const dispatch = useAppDispatch();
  return (
    <button onClick={() => dispatch(stopAutoUpdate())}>Stop Auto Update</button>
  );
}

function TickerButtons() {
  const dispatch = useAppDispatch();
  const autoUpdate = useSelector(getAutoUpdate);
  const autoUpdateButton = !autoUpdate ? (
    <StartAutoUpdateButton />
  ) : (
    <StopAutoUpdateButton />
  );

  console.log("TickerButtons rendered");
  return (
    <div>
      <button onClick={() => dispatch(update())}>Update</button>
      {autoUpdateButton}
    </div>
  );
}

export { Ticker, TickerButtons };
