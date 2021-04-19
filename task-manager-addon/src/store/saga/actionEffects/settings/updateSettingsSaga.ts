import { PayloadAction } from '@reduxjs/toolkit';
import { put } from 'redux-saga/effects';
import { settingsSliceActions } from 'store/redux/slices/settingsSlice';
import { SettingsInterface } from '../../../../types/interfaces/objects/Setting';
import { createActionSagaWatchOneByOne } from '../../../utils/saga/helpers';

/**
 * updateSettingsSaga
 */
const updateSettingsSaga = createActionSagaWatchOneByOne({
  *updateSettingsSaga({ payload: settings }: PayloadAction<Partial<SettingsInterface>>) {
    yield put(settingsSliceActions.updateSettings(settings));
  },
});

export const {
  action: updateSettingsSagaAction,
  watcher: updateSettingsSagaWatcher,
  effect: updateSettingsSagaEffect,
} = updateSettingsSaga;
