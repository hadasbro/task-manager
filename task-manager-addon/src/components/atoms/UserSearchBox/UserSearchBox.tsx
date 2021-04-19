/* eslint-disable spaced-comment,react-hooks/exhaustive-deps */
import React, { ChangeEvent, FC, useEffect } from 'react';
import { AccountCircle } from '@material-ui/icons';
import clsx from 'clsx';
import { Autocomplete } from '@material-ui/lab';
import { InputAdornment, TextField } from '@material-ui/core';
import { useTLineStyles } from '../../../styles/styles/modules';
import MarginAutoBox from '../CenteredBox/MarginAutoBox';
import UserEntity from '../../../models/entities/User';
import { Nullable } from '../../../types/templates/Nullable';
import { useUserSearcher } from '../../../hooks/ui/useUserSearcher';

/**
 * UserSearchBoxProps
 */
type UserSearchBoxProps = { initUser?: Nullable<UserEntity>; handleChange?: (value: Nullable<UserEntity>) => void };

/**
 * UserSearchBox
 *
 * @constructor
 */
const UserSearchBox: FC<UserSearchBoxProps> = ({ initUser = null, handleChange }) => {
  const classes = useTLineStyles();

  const { user, suggestedUsers, chooseUser, initChoosenUser, loadSuggestions } = useUserSearcher();

  useEffect(() => {
    initChoosenUser(initUser);
  }, [initUser]);

  /**
   * handleAutosuggestChange
   *
   * update options during typing
   *
   * @param value
   */
  const handleAutosuggestChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    loadSuggestions(value);
  };

  /**
   * handleChoose
   *
   * actionToDispatch choosed option (user) and process
   * (set state and call callback)
   *
   * @param user
   */
  const handleChoose = (user: Nullable<UserEntity>) => {
    chooseUser(user, handleChange);
  };

  return (
    <MarginAutoBox cssProperties={{ width: '65%' }}>
      <div className={clsx(classes.formControl, classes.autosuggest)}>
        <Autocomplete
          getOptionLabel={(option: UserEntity) =>
            `${option.displayName} ${option.emailAddress ? `[${option.emailAddress}]` : ''}`
          }
          value={user}
          options={suggestedUsers}
          onChange={(event: any, newValue: Nullable<UserEntity>) => handleChoose(newValue)}
          renderInput={params => (
            <TextField
              {...params}
              onChange={handleAutosuggestChange}
              label="For user"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </div>
    </MarginAutoBox>
  );
};

export default UserSearchBox;
