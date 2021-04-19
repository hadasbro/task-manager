import React, { FC, ReactNode, useEffect, useState } from 'react';
import UserEntity from '../../../models/entities/User';
import UserSearchBox from '../../atoms/UserSearchBox/UserSearchBox';
import { Nullable } from '../../../types/templates/Nullable';

/**
 * UserProviderProps
 */
type UserProviderProps = {
  children: (params: { user: Nullable<UserEntity>; setUser: (user: Nullable<UserEntity>) => void }) => ReactNode;
  widthSearchBox?: boolean;
  initUser?: Nullable<UserEntity>;
};

/**
 * UserProvider
 *
 * @param children
 * @param widthSearchBox
 * @param initUser
 * @constructor
 */
const UserProvider: FC<UserProviderProps> = ({ children, widthSearchBox = true, initUser = null }) => {
  const [user, setUser] = useState<Nullable<UserEntity>>(null);

  useEffect(() => {
    setUser(initUser);
  }, [initUser]);

  return (
    <>
      {widthSearchBox && <UserSearchBox initUser={user} handleChange={setUser} />}

      {children({
        user,
        setUser,
      })}
    </>
  );
};

export default UserProvider;
