export interface TimestampedValue {
  value: number;
  timestamp: Date;
}

export interface TickerState {
  // Data State
  current?: TimestampedValue;
  prev?: TimestampedValue;
  autoUpdate: boolean;

  // Communication State
  isPending: boolean;
  error?: string;
}
