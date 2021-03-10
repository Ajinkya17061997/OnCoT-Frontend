import { all } from 'redux-saga/effects';
import headerSaga from 'sagas/timerSaga';
import driveRulesSaga from 'sagas/rulesSaga';
import formSaga from 'sagas/formSaga';
import driveSagas from 'sagas/userDriveSagas';
import languageSagas from 'sagas/languageSagas';
import statementRequestSaga from 'sagas/problemsSaga';
import driveTimerSaga from 'sagas/driveTimerSaga';

export default function* rootSagas() {
  yield all([
    formSaga(),
    driveSagas(),
    driveRulesSaga(),
    headerSaga(),
    languageSagas(),
    statementRequestSaga(),
    driveTimerSaga(),
  ]);
}
