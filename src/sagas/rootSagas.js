import { all } from 'redux-saga/effects';
import headerSaga from 'sagas/timerSaga';
import driveRulesSaga from 'sagas/rulesSaga';
import formSaga from 'sagas/formSaga';
import driveSagas from 'sagas/userDriveSagas';
import languageSagas from 'sagas/languageSagas';

export default function* rootSagas() {
  yield all([
    formSaga(),
    driveSagas(),
    driveRulesSaga(),
    headerSaga(),
    languageSagas(),
  ]);
}
