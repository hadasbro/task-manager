import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, Typography, Container } from '@material-ui/core';
import { routes } from '../routing/routes';
import Router from '../routing/Router';
import { AlertDialog } from './atoms/AlertDialog/AlertDialog';
import { loadMetasSagaAction } from '../store/saga/actionEffects/meta/loadMetasSaga';

/**
 * App
 * @constructor
 */
export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMetasSagaAction());
  }, []);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <AlertDialog />
        <Typography component="div">
          <BrowserRouter>
            <Router routes={routes} />
          </BrowserRouter>
        </Typography>
      </Container>
    </>
  );
};
