import { ActionSagaObject, SingleKeyLiteral, SingleSagaNarrowed, WatchArg, WatcherType } from './core/types';
import { createSagaWithAction } from './core/createSagaWithAction';
import { SagaActions } from '../../saga/consts';
import { isNotEmpty } from '../../../types/guards/general/isNotEmpty';

/**
 * Saga object
 *
 * e.g.
 {*actions(actions: PayloadAction<number>) {yield true;}}

 That type allows only 1 element in an object and this element is forced to be one of allowed saga actions
 for example, assuming below:

 enum SagaActions {action5 = 'action5', action2 = 'action2'}

 only param {action5: any} OR {action2: any} will be allowed, while e.g. param {actionOther: any}
 will be disallowed and also {action5: any, action2: any} will be disallowed. For example:

 This is allowed:
 {*action2(actions: PayloadAction<number>) {yield true;}}

 This is allowed also:
 {*action5(actions: PayloadAction<number>) {yield true;}}

 This is not allowed (2 different keys, no matter if from the same, allowed set or not)
 {
 *action2(actions: PayloadAction<number>) {yield true;},
 *action5(actions: PayloadAction<number>) {yield true;}
 }

 This is not allowed (2 different keys, no matter if from the same, allowed set or not)
 {
 *action2(actions: PayloadAction<number>) {yield true;},
 *action35(actions: PayloadAction<number>) {yield true;}
 }

 This is not allowed (key action100 is not allowed)
 {*action100(actions: PayloadAction<number>) {yield true;}}
 */
type SingleSagaParam<S> = SingleSagaNarrowed<S, SagaActions> &
  SingleKeyLiteral<SagaActions> &
  Partial<{ [k in SagaActions]: any }>;

/**
 * createActionSaga
 *
 * Simple Saga + corresponding actions (no watcher)
 *
 * Usage: createActionSaga({*action2(actions: PayloadAction<number>) {yield true;}});
 * @param saga
 * @param watch
 */
const createActionSaga = <S extends ActionSagaObject<SagaActions>>(saga: S, watch: WatchArg = null) => {
  return createSagaWithAction<S, SagaActions>(saga, watch);
};

/**
 * createActionSagaWatch
 *
 * Usage:
 * createActionSagaWatch({*action2(actions: PayloadAction<number>) {yield true;}});
 *
 * Saga + corresponding actions + watchers (take())
 * @param saga
 * @see createActionSaga
 */
const createActionSagaWatch = <S extends ActionSagaObject<SagaActions>>(saga: S) => {
  return createSagaWithAction<S, SagaActions>(saga, WatcherType.TAKE);
};

/**
 * createActionSagaWatchOneByOne
 *
 * Saga + corresponding actions + watchers (take() + while)
 * @param saga
 */
const createActionSagaWatchOneByOne = <S extends ActionSagaObject<SagaActions>>(saga: S) => {
  return createSagaWithAction<S, SagaActions>(saga, WatcherType.TAKE_WHILE);
};

/**
 * createActionSagaWatchEvery
 *
 * Saga + corresponding actions + watchers (takeEvery())
 *
 * @param saga
 */
const createActionSagaWatchEvery = <S extends ActionSagaObject<SagaActions>>(saga: S) => {
  return createSagaWithAction<S, SagaActions>(saga, WatcherType.TAKE_EVERY);
};

/**
 * createActionSagaWatch
 *
 * Saga + corresponding actions + watchers (takeLatest())
 *
 * @param saga
 * @see createActionSaga
 */
const createActionSagaWatchLatest = <S extends ActionSagaObject<SagaActions>>(saga: S) => {
  return createSagaWithAction<S, SagaActions>(saga, WatcherType.TAKE_LATEST);
};

/**
 * createActionSagaWatchMaybe
 *
 * @param saga
 * @see createActionSaga
 */
const createActionSagaWatchMaybe = <S extends ActionSagaObject<SagaActions>>(saga: S) => {
  return createSagaWithAction<S, SagaActions>(saga, WatcherType.TAKE_MAYBE);
};

/**
 * createActionSagaWatchLeading
 *
 * @param saga
 * @see createActionSaga
 */
const createActionSagaWatchLeading = <S extends ActionSagaObject<SagaActions>>(saga: S) => {
  return createSagaWithAction<S, SagaActions>(saga, WatcherType.TAKE_LEADING);
};

/**
 * createActionSagaWatchThrottle
 *
 * @param saga
 * @param ms - miliseconds
 */
const createActionSagaWatchThrottle = <S extends ActionSagaObject<SagaActions>>(saga: S, ms: number = 500) => {
  let params = {};

  if (isNotEmpty(ms)) {
    params = { ms };
  }

  return createSagaWithAction<S, SagaActions>(saga, { watcher: WatcherType.THROTTLE, params });
};

/**
 * createActionSagaWatchDebounce
 *
 * @param saga
 * @param ms - miliseconds
 */
const createActionSagaWatchDebounce = <S extends ActionSagaObject<SagaActions>>(saga: S, ms: number = 500) => {
  let params = {};

  if (isNotEmpty(ms)) {
    params = { ms };
  }

  return createSagaWithAction<S, SagaActions>(saga, { watcher: WatcherType.DEBOUNCE, params });
};

export {
  createActionSaga,
  createActionSagaWatch,
  createActionSagaWatchEvery,
  createActionSagaWatchLatest,
  createActionSagaWatchMaybe,
  createActionSagaWatchLeading,
  createActionSagaWatchThrottle,
  createActionSagaWatchDebounce,
  createActionSagaWatchOneByOne,
};

/*

  // ##### Example ##### //

  const as = createActionSaga({
    *action2(actions: PayloadAction<number>) {yield true;},
  });

  const {actions: myAction, watchers: myWatcher, effects: myEffect} = as;
*/
