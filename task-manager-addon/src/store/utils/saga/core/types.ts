/* eslint-disable func-names */
import { Action, AnyAction } from 'redux';
import { PayloadAction, ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { SagaReturnType, Effect } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { Nullable } from '../../../../types/templates/Nullable';
import { isDefined } from '../../../../types/guards/general/isDefined';
import { createActionWatcher } from './createActionWatcher';
import { Dict } from '../../../../types/templates/Dict';
import { AnyOf } from '../../../../types/templates/AnyOf';

/**
 * All watech types
 */
export enum WatcherType {
  TAKE = 'TAKE',
  TAKE_WHILE = 'TAKE_WHILE',
  TAKE_LATEST = 'TAKE_LATEST',
  TAKE_MAYBE = 'TAKE_MAYBE',
  TAKE_EVERY = 'TAKE_EVERY',
  TAKE_LEADING = 'TAKE_LEADING',
  THROTTLE = 'THROTTLE',
  DEBOUNCE = 'DEBOUNCE',
}

/**
 * Default allowed saga actions
 */
export type DefaultSagaActions = 'action1' | 'action2';

/**
 * KeySimple
 */
export type KeySimple = string;

/**
 * WatcherTypeExtended
 *
 * watchers type with additional params
 */
export type WatcherTypeExtended = {
  watcher: WatcherType;
  params: Dict<any>;
};

/**
 * isWatcherTypeExtended
 *
 * @param el
 */
export const isWatcherTypeExtended = (el: WatcherType | WatcherTypeExtended): el is WatcherTypeExtended => {
  return (el as WatcherTypeExtended).params !== undefined;
};

/**
 * createActionType
 *
 * Create actions type from name
 *
 * @param actionName
 * @param group
 */
export const createActionType = (actionName: KeySimple, group?: string): string => {
  if (isDefined(group)) {
    return `${group}/${actionName}`;
  }

  return `${actionName}`;
};

/**
 * SingleKeyLiteral
 *
 * const a1 : SingleKeyLiteral<'anything'|'somethingElse'> = { anything: 1 } // OK
 * const a2 : SingleKeyLiteral<'anything'|'somethingElse'> = { somethingElse: 2 } // OK
 * const a3 : SingleKeyLiteral<'anything'|'somethingElse'> = { anything: 1, somethingElse: 2 } // NOT OK
 */
export type SingleKeyLiteral<K extends KeySimple, V = any> = {
  [P in K]: Record<P, V> & Partial<Record<Exclude<K, P>, never>>;
}[K];

/**
 * ActionEffect
 *
 * Kind of Redux actions with payload but returning generator
 * Used for initialising Sagas and corresponding Actions
 * Like that we can declare Saga which will also have corresponding
 * actions in Redux and (optionally) corresponding watchers.
 *
 * Action will be just action(actions: PayloadAction<boolean>) { ... },
 *
 * Example:
 *   function * action(actions: PayloadAction<boolean>) {
 *     yield 123;
 *   },
 */
export type ActionEffect<A extends Action = AnyAction> = (action: A) => Generator<any, any, any>;

/**
 * GeneralEffect
 */
export type GeneralEffect = () => Generator<any, any, any>;

/**
 * WatcherEffect
 *
 * e.g.
 * function * () {
 *   yield takeLatest(actionType, actionEffect);
 * };
 */
export type WatcherEffect = () => Generator<Effect, any, any>;

/**
 * ActionSagaObject
 *
 * Example:
 * { * action(actions: PayloadAction<boolean>) {yield 123;},} }
 */
export type ActionSagaObject<K extends KeySimple = KeySimple> = SingleKeyLiteral<K, ActionEffect<PayloadAction<any>>>;

/**
 * SimpleSagaObject
 */
export type SimpleSagaObject<K extends KeySimple = KeySimple> = SingleKeyLiteral<K>;

/**
 * ActionSagaReturnType
 */
export type ActionSagaReturnType<S extends SingleSaga<K>, K extends string = DefaultSagaActions> = {
  action: AnyOf<ReduxActions<S>>;
  watcher: AnyOf<Watchers<S>>;
  effect: AnyOf<Effects<S>>;
  actions: ReduxActions<S>;
  watchers: Watchers<S>;
  effects: Effects<S>;
};

export type SimpleSagaReturnType<S extends SingleSaga<K>, K extends string = DefaultSagaActions> = {
  action: AnyOf<ReduxActions<S>>;
  watcher: AnyOf<Watchers<S>>;
  effect: AnyOf<Effects<S>>;
  actions: ReduxActions<S>;
  watchers: Watchers<S>;
  effects: Effects<S>;
};

/**
 * ActionCreationWithOptionalPayload
 */
export type ActionCreationWithOptionalPayload<T> = T extends (action: infer Action) => any
  ? Action extends { payload: infer P }
    ? ActionCreatorWithPayload<P>
    : ActionCreatorWithoutPayload
  : ActionCreatorWithoutPayload;

/**
 * ReduxActions
 *
 * {
 *   action: (actions: PayloadAction<number>) => { ... }
 *   action2: (actions: PayloadAction<string>) => { ... }
 * }
 */
export type ReduxActions<S extends ActionSagaObject> = {
  [K in keyof S]: ActionCreationWithOptionalPayload<S[K]>;
};

/**
 * Watchers
 */
export type Watchers<S extends ActionSagaObject> = {
  [K in keyof S]: SagaReturnType<typeof createActionWatcher>;
};

/**
 * Effects
 */
export type Effects<S extends ActionSagaObject> = {
  [K in keyof S]: S[K];
};

/**
 * EffectsWithActionType
 *
 * Extended effects with a rule that if the original effects is also
 * an actions with payload then, calling the effects will be possible
 * only with actions.type to be original actions name. For exmaple
 *
 * const as = createActionSaga({ *action2(actions: PayloadAction<number>) {yield true;}, });
 * as.effects.action2({ type: 'action2', payload: 12 });
 *
 */
export type EffectsWithActionType<S extends ActionSagaObject> = {
  [K in keyof S]: S[K] extends (action: infer Action) => any
    ? Action extends { payload: infer P }
      ? ActionEffect<PayloadAction<P, K & string>>
      : S[K]
    : S[K];
};

/**
 * WatchArg
 *
 * watchers or watchers with extra parametera
 */
export type WatchArg = Nullable<WatcherType | WatcherTypeExtended>;

/**
 * SingleSaga
 *
 * Literal with string keys with requirement that they should be specified
 * "!" is default key which makes list of allowed keys = "never", so
 * passing "!" we force this type to be unresolvable. The role of "!"
 * is to be "never" in this context, so in particular SingleSaga<"!"> == never
 *
 * Examples:

 const test: SingleSaga<'a'|'b'> = {
    a: 1, // OK
    b: 1, // OK
    c 1, // disallowed!
  };

 const test2: SingleSaga<'!'> = {
    a: 1, // disallowed!
    b: 1, // disallowed!
    ...,  // any other key is disallowed!
  };
 */
export type SingleSaga<K extends string = '!'> = {
  [key in K & Exclude<string, '!'>]: ActionEffect<PayloadAction<any>>;
};

/**
 * SingleSagaNarrowed
 *
 * Object with keys narrowed down only to the specific subset.
 * This is just a wrapper for SingleSaga<T>
 *
 * In example:

 // considering
 type DefaultSagaActions = 'a' | 'b' | 'c';

 // and T to be SingleSaga<DefaultSagaActions>
 const test: SingleSagaNarrowed<T, 'a'|'b'|'d'> = {
    a: 1,
    b: 2,
    c: 2, // this is disallowed (because we specify keys to be one of 'a'|'b'|'d')
    d: 2, // this is also disallowed because, despite d is in allowed keys, d is not in the set of keys we narrow down to
  };

 // also the type of test variable is SingleSaga<"a"> | SingleSaga<"b"> | SingleSaga<"c">
 // and at the same time we specify allowed keys to be 'a'|'b'|'d' so
 // finally all allowed keys are from intersection of those 2 sets, so 'a'|'b'
 *
 */
export type SingleSagaNarrowed<S, AK extends string> = S extends SingleSaga<infer K>
  ? SingleSaga<K & AK> extends SingleSaga<infer E>
    ? E extends never
      ? SingleSaga<'!'>
      : SingleSaga<E>
    : never
  : never;
