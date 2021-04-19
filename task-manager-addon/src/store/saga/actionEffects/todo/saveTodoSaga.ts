import { call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { createActionSagaWatchEvery } from '../../../utils/saga/helpers';
import { ListingElementData } from '../../../../components/organisms/ListingElementForm/ListingElementForm';
import { todosSliceActions } from '../../../redux/slices/todoSlice';
import { apploggerError, apploggerUserAlertSuccess } from '../../sagaChannels/generic/alert/helpers';

/**
 * saveTodoSaga
 */
const saveTodoSaga = createActionSagaWatchEvery({
  *saveTodoSaga({ payload: newTodoData }: PayloadAction<ListingElementData>) {
    try {
      if (newTodoData.entityId) {
        yield put(todosSliceActions.editTodo(newTodoData));
        yield call(apploggerUserAlertSuccess, 'Todo edited successfully');
      } else {
        yield put(todosSliceActions.addNewTodo(newTodoData));
        yield call(apploggerUserAlertSuccess, 'Added new todo');
      }
    } catch (e) {
      yield call(apploggerError, e);
    }
  },
});

export const { action: saveTodoSagaAction, watcher: saveTodoSagaWatcher, effect: saveTodoSagaEffect } = saveTodoSaga;
