import { Ticker, TickerButtons } from "./Ticker";

export const App = () => {
  return (
    <div className="App">
      <Ticker />
      <TickerButtons />
      <br />
      <p>Features:</p>
      <ul>
        <li>Update – Thunk fetches Bitcoin price from Coinbase server.</li>
        <ul>
          <li>
            Throttling: a Middlware ensures that there are at least 2s between
            updates.
          </li>
        </ul>
        <li>
          Auto-Update – Thunk triggers Update as long as auto-update flag is set
          in store.
        </li>
      </ul>
    </div>
  );
};
