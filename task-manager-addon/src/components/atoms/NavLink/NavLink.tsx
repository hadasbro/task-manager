import React, { FC } from 'react';
import { Link } from '@reach/router';

const NavLink: FC<{ to: string }> = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        style: {
          color: isCurrent ? 'red' : 'inherit',
          fontStyle: 'inherit',
          textDecoration: 'none',
        },
      };
    }}
  />
);

export default NavLink;
