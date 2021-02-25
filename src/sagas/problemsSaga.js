import getStatement from "apis/problemStatementAPI";
import { PROBLEM_STATEMENT_REDUCER } from "constants/actionConstants";
import { call, put, takeLatest } from "redux-saga/effects";
import statementAction, { statementActionFailed } from "../actions/problemStatementActions";

//Problem statememt Saga
function* statementSaga(action){
  try{
    const response = yield call(getStatement,action.payload);
    yield put(statementAction(response.data));
  }catch(error){
    yield put(statementActionFailed("Something Went Wrong"));
  }
}

//watcherSaga
export default function* statementRequestSaga() {
  yield takeLatest(PROBLEM_STATEMENT_REDUCER.STATEMENT_REQUEST, statementSaga);
}
