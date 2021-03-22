import produce from 'immer';

import { PROBLEM_STATEMENT } from 'constants/actionConstants';

export const initialState = {
  statement: {},
  errorMessage: '',
  isError: false,
};

const problemStatementReducer = produce((state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case PROBLEM_STATEMENT.SET_DETAILS:
      state.statement = {
        id: payload.id,
        title: payload.title,
        description: payload.description,
        submissionCount:payload.submission_count,
      };
      break;
    case PROBLEM_STATEMENT.UPDATE_SUBMISSION_COUNT:
      state.statement = {
        submissionCount:payload,
      };
      break;
    case PROBLEM_STATEMENT.SET_ERROR_MESSAGE:
      state.errorMessage = payload;
      state.isError = true;
      break;
    default:
      return state;
  }
});

export default problemStatementReducer;
