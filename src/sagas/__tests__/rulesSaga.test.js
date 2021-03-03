import { call, put } from 'redux-saga/effects';

import { rulesSaga } from 'sagas/rulesSaga';
import { rulesAction, rulesRequest, rulesRequestFailed } from 'actions/rulesAction';
import { getRules } from 'apis/rulesApi';

describe('Rules Saga', () => {
  let gen;
  const response = {
    data: {
      str : 'LoremIpsum Dolor Sit amet',
    },
  };
  beforeEach(() => {
    gen = rulesSaga(rulesRequest());
  });

  it('API call should be successful', () => {
    expect(gen.next().value).toEqual(call(getRules));
  });

  it('Dispactch success action', () => {
    gen.next();
    expect(gen.next(response).value).toEqual(put(rulesAction(response.data)));
    expect(gen.next().done).toEqual(true);
  });

  it('Dispatch failure action', () => {
    gen.next();
    expect(gen.throw('Something Went Wrong').value).toEqual(put(rulesRequestFailed('Something Went Wrong')));
  });
});
