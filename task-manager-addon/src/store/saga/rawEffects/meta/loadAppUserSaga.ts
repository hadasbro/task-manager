import { call, put, select } from 'redux-saga/effects';
import { apiConfigSliceActions } from 'store/redux/slices/apiConfigSlice';
import { DI } from '../../../../index';
import { apploggerError } from '../../sagaChannels/generic/alert/helpers';
import { UserRepository } from '../../../../api/repositories/userRepository';
import { selectConfig } from '../../../selectors/apiConfigSelectors';
import ApiConfigInterface from '../../../../types/interfaces/objects/Config';
import { Nullable } from '../../../../types/templates/Nullable';
import UserEntity from '../../../../models/entities/User';

/**
 * loadAppUserSaga
 */
export function* loadAppUserSaga() {
  try {
    const userRepo = DI.resolve(UserRepository);

    const config: ApiConfigInterface = yield select(selectConfig);

    if (!config.apiCredentials.userId) {
      throw new Error('Missing configuration for app user');
    }

    const user: Nullable<UserEntity> = yield call([userRepo, userRepo.getOneById], config.apiCredentials.userId);

    if (!user) {
      throw new Error('Invalid app user');
    }

    yield put(apiConfigSliceActions.loadAppUser(user));
  } catch (e) {
    yield call(apploggerError, e);
  }
}
