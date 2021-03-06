import { call, put } from 'redux-saga/effects';

import driveDetail from 'apis/userDriveApis';
import {
  driveDetailRequest,
  showErrorMessage,
  setUserDriveDetails,
} from 'actions/userDriveActions';
import { driveDetails } from 'sagas/userDriveSagas';

import { setUserProfileDetails } from 'actions/userProfileActions';

const response = {
  data: {
    id: '12345',
    userDetails: {
      id: '1',
      firstname: 'vaibhav',
      lastname: 'chalse',
      email: 'v@gmail.com',
    },
    driveDetails: {
      id: '2',
      name: 'kkwieer drive',
      startTime: '2021-02-22T05:40:45Z',
      endTime: '2021-02-22T08:40:45Z',
    },
    authToken: '12345',
  },
  status: 200,
};

const error = { message: 'failed' };

describe('user drive saga', () => {
  let gen;
  let action;

  beforeEach(() => {
    action = driveDetailRequest('12345');
    gen = driveDetails(action);
  });

  it('must call api', () => {
    expect(gen.next().value).toEqual(call(driveDetail, action.payload.token));
  });

  it('must set drive details', () => {
    gen.next();
    expect(gen.next(response).value).toEqual(
      put(setUserDriveDetails(response.data.driveDetails)),
    );
  });

  it('must set user details', () => {
    gen.next();
    gen.next(response);
    expect(gen.next().value).toEqual(
      put(setUserProfileDetails(response.data.userDetails)),
    );
    expect(gen.next().done).toEqual(true);
  });

  it('must throw error', () => {
    gen.next();
    expect(gen.throw(error).value).toEqual(
      put(showErrorMessage(error.message)),
    );
    expect(gen.next().done).toEqual(true);
  });
});
