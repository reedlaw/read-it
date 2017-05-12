// @flow
import type { Action, SubmitState } from '../types';

const initialState = {
  formDisabled: false,
  error: null,
};

const reducer = (
  state: SubmitState = initialState,
  action: Action,
): SubmitState => {
  switch (action.type) {
    case 'SUBMIT_POST': {
      return { ...state, formDisabled: true };
    }

    case 'SUBMIT_POST_DONE': {
      return { ...state, formDisabled: false, error: null };
    }

    case 'SUBMIT_POST_FAIL': {
      return { ...state, formDisabled: false, error: action.payload.error };
    }

    default:
      return state;

  }
};

export default reducer;
