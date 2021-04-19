import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsersForAutosuggestSagaAction } from '../../store/saga/actionEffects/people/loadUsersForAutosuggestSaga';
import { selectAutosuggestUser } from '../../store/selectors/activitySelectors';
import { Nullable } from '../../types/templates/Nullable';
import UserEntity from '../../models/entities/User';
import { isDefined } from '../../types/guards/general/isDefined';

/**
 * UserSearcherHookType
 */
type UserSearcherHookType = {
  user: Nullable<UserEntity>;
  suggestedUsers: UserEntity[];
  chooseUser: (user: Nullable<UserEntity>, callback?: Nullable<(value: Nullable<UserEntity>) => void>) => void;
  initChoosenUser: (user: Nullable<UserEntity>) => void;
  loadSuggestions: (str: string) => void;
};

/**
 * useUserSearcher
 *
 * @param initUser
 */
export const useUserSearcher = (initUser?: Nullable<UserEntity>): UserSearcherHookType => {
  const dispatch = useDispatch();

  const uid = initUser ? initUser.accountId : null;

  useEffect(() => {
    // first take some starting data so we can see some options
    // just after click on autosuggest box, but before we start typing
    dispatch(loadUsersForAutosuggestSagaAction(null));
  }, [uid]);

  const [user, setUser] = useState<Nullable<UserEntity>>(initUser || null);

  const suggestedUsers = useSelector(selectAutosuggestUser);

  /**
   * loadSuggestions
   *
   * @param str
   */
  const loadSuggestions = (str: string) => {
    dispatch(loadUsersForAutosuggestSagaAction(str));
  };

  /**
   * chooseUser
   *
   * @param user
   * @param callback
   */
  const chooseUser = (user: Nullable<UserEntity>, callback?: Nullable<(value: Nullable<UserEntity>) => void>) => {
    setUser(user);

    if (isDefined(callback)) {
      callback(user);
    }
  };

  /**
   * initChoosenUser
   *
   * @param user
   */
  const initChoosenUser = (user: Nullable<UserEntity>) => {
    setUser(user);
  };

  return {
    user,
    suggestedUsers,
    chooseUser,
    initChoosenUser,
    loadSuggestions,
  };
};
