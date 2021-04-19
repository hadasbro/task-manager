/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { updateSettingsSagaAction } from 'store/saga/actionEffects/settings/updateSettingsSaga';
import { loadMetasSagaAction } from 'store/saga/actionEffects/meta/loadMetasSaga';
import { tasksListLoadSagaAction } from 'store/saga/actionEffects/tasks/tasksListLoadSaga';
import { userDataSliceActions } from 'store/redux/slices/userDataSlice';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import AppContainer from '../../templates/AppContainer/AppContainer';
import ActiveTaskContainer from '../../molecules/ActiveTaskContainer/ActiveTask';
import VersionBox from '../../molecules/TodoBar/VersionBox';
import FiltersPanelContainer from '../../organisms/FiltersPanelContainer/FiltersPanelContainer';
import AppearanceQuickOptions from '../../molecules/AppearanceOptions/Apperance';
import ActivityModuleWrapper from '../../templates/ActivityModule/ActivityModule';
import TasksContainer from '../../templates/TasksContainer/TasksContainer';
import { RoutePage } from '../../../types/interfaces/routing/RoutePage';
import { selectSettings } from '../../../store/selectors/settingsSelectors';
import { SettingsInterface } from '../../../types/interfaces/objects/Setting';
import { TimerBox } from '../../atoms/TimerBox/TimerBox';

/**
 * Tasks
 * @constructor
 */
const Tasks: FC<RoutePage> = ({ meta, section }) => {
  const { title, description } = meta;
  const { headerTitle, showSearchBar } = section;

  const dispatch = useDispatch();

  const allSettings = useSelector(selectSettings);

  const { t: translator } = useTranslation();

  useEffect(() => {
    dispatch(tasksListLoadSagaAction());
  }, []);

  /**
   * onUpdateSettings
   *
   * @param settingsToUpdate
   */
  const onUpdateSettings = (settingsToUpdate: Partial<SettingsInterface>) => {
    dispatch(updateSettingsSagaAction(settingsToUpdate));
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <AppContainer title={headerTitle} showSearchBar={showSearchBar}>
        <TimerBox />
        <Grid container>
          <Grid item xs={9}>
            <ActiveTaskContainer />
          </Grid>
          <Grid item xs={3}>
            <VersionBox />
          </Grid>
          <Grid item xs={9}>
            <Grid container>
              <Grid item xs={9}>
                <FiltersPanelContainer />
              </Grid>
              <Grid item xs={3}>
                <AppearanceQuickOptions {...allSettings} onUpdateHandler={onUpdateSettings} />
              </Grid>
              <Grid item xs={12}>
                <TasksContainer />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container>
              <Grid item xs={12}>
                <ActivityModuleWrapper />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AppContainer>
    </>
  );
};

// noinspection JSUnusedGlobalSymbols
export default Tasks;
