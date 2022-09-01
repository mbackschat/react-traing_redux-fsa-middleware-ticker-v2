import { AppThunk } from "../store";

// Extended Thunks with FSA action props: type, meta
interface AppThunkWithTypeMeta<M> extends AppThunk {
  type: string;
  meta: M;
}

interface ThrottleMeta {
  throttleDuration: number;
}

export function throttled(
  thunk: AppThunk,
  type: string,
  throttleDuration: number
): AppThunkWithTypeMeta<ThrottleMeta> {
  const extendedThunk: AppThunkWithTypeMeta<ThrottleMeta> = async (...args) => {
    return thunk(...args);
  };
  extendedThunk.type = type;
  extendedThunk.meta = { throttleDuration };
  return extendedThunk;
}
