/* eslint-disable func-names */
import { ActionCreatorWithOptionalPayload, createAction as createActionToolkit, PayloadAction } from '@reduxjs/toolkit';
import {
  ActionEffect,
  createActionType,
  ActionSagaReturnType,
  DefaultSagaActions,
  KeySimple,
  ActionSagaObject,
  WatchArg,
} from './types';
import { createActionWatcher } from './createActionWatcher';

/**
 * createSagaWithAction
 *
 * create new Action and (optionally) watchers for Saga
 *
 * Example:
 *
 // create actions saga
 const as = createActionSaga({ *action2(actions: PayloadAction<number>) {yield true;}, });

 // use watchers in root saga
 function* rootSaga() {yield all([fork(as.watchers.action2)]);}

 // use, actionToDispatch actions
 const actionToDispatch = useDispatch();
 actionToDispatch(as.actions.action2(12));

 // call original effects
 function* test() {yield call(as.effects.action2, { type: 'action2', payload: 12 });}

 * @param saga
 * @param watch
 *
 * TODO - new signature
 * createSagaWithAction = <S extends ActionSagaObject<K>, K extends KeySimple = DefaultSagaActions>(
 * saga: SingleSagaNarrowed<S, K> & SingleKeyLiteral<K> & Partial<{ [k in K]: unknown }>,
 * watch: WatchArg = null,
 * )
 */
export const createSagaWithAction = <S extends ActionSagaObject<K>, K extends KeySimple = DefaultSagaActions>(
  saga: S,
  watch: WatchArg = null,
): ActionSagaReturnType<typeof saga, K> => {
  type RT = ActionSagaReturnType<S, K>;

  let action: RT['action'] = null as any;
  let effect: RT['effect'] = null as any;
  let watcher: RT['watcher'] = null as any;

  const actions: RT['actions'] = {} as any;
  const effects: RT['effects'] = {} as any;
  const watchers: RT['watchers'] = {} as any;

  let iteration = 0;

  Object.entries<ActionEffect<PayloadAction<any>>>(saga).forEach(([k, v]) => {
    // created redux actions
    const actionType = createActionType(k);

    const singleAction: ActionCreatorWithOptionalPayload<any> = createActionToolkit(actionType);

    actions[k] = singleAction;

    // original generator function
    const singleEffect = v;

    effects[k] = singleEffect;

    // watchers
    const singleWatcher = createActionWatcher(watch, actionType, singleEffect);

    watchers[k] = singleWatcher;

    if (iteration === 0) {
      action = singleAction as RT['action'];
      watcher = singleWatcher as RT['watcher'];
      effect = singleEffect as RT['effect'];
    }

    iteration += 1;
  });

  return {
    action,
    watcher,
    effect,
    actions,
    watchers,
    effects,
  };
};
