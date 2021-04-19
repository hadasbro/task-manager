/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { loadAppUserWorklogSagaAction } from 'store/saga/actionEffects/activity/loadAppUserWorklogSaga';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet-async';
import AppContainer from '../../templates/AppContainer/AppContainer';
import { RoutePage } from '../../../types/interfaces/routing/RoutePage';
import MarginAutoBox from '../../atoms/CenteredBox/MarginAutoBox';
import { usePaperStyles } from '../../../styles/styles/modules';
import { WorklogListing } from '../../atoms/WorklogList/WorklogListing';
import { selectAppUserWorklogArray } from '../../../store/selectors/activitySelectors';
import { useAppDispatch } from '../../../store/redux/rootReducer';
import { WorklogUser } from '../../../types/interfaces/selecttors/worklog';
import { selectTimerLogs } from '../../../store/selectors/timerSelectors';
import { Dict } from '../../../types/templates/Dict';
import { DayjsObj } from '../../../types/interfaces/datetime/DayjsObj';
import TodoEntity from '../../../models/entities/Todo';
import { SimpleList } from '../../molecules/SimpleList/SimpleList';

/**
 * Timer
 *
 * @param meta
 * @param section
 * @constructor
 */
const Timer: FC<RoutePage> = ({ meta, section }) => {
  const { title, description } = meta;

  const { headerTitle, showSearchBar } = section;

  const dispatch = useAppDispatch();

  const classes = usePaperStyles();

  const appUserWorklog: WorklogUser[] = useSelector(selectAppUserWorklogArray);

  const timerLogs: Dict<Dict<[DayjsObj, DayjsObj]>, TodoEntity['id']> = useSelector(selectTimerLogs);

  console.log('timerLogs', timerLogs);
  useEffect(() => {
    dispatch(loadAppUserWorklogSagaAction());
  });

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      <AppContainer title={headerTitle} showSearchBar={showSearchBar}>
        <div className={clsx(classes.root)}>
          <MarginAutoBox cssProperties={{ width: '90%', marginBottom: '40px' }}>
            <>
              <Grid container spacing={8}>
                <Grid item xs={6}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    align="center"
                    style={{ marginTop: '30px', marginBottom: '20px' }}
                  >
                    Last logged activity
                  </Typography>

                  <WorklogListing worklog={appUserWorklog} />
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={8}>
                    <Grid item xs={12}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        align="center"
                        style={{ marginTop: '30px', marginBottom: '20px' }}
                      >
                        Last activity to be loged
                      </Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <SimpleList />
                    </Grid>
                    <Grid item xs={2}>
                      <Button variant="contained" color="primary" onClick={() => {}}>
                        Save all
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </>
          </MarginAutoBox>
        </div>
      </AppContainer>
    </>
  );
};

export default Timer;
