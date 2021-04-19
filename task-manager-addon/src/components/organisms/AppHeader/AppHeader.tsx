import React, { FC } from 'react';
import { AppContainerProps, DrawerProps } from '../../templates/AppContainer/AppContainer';
import LeftNav from '../../molecules/LeftNav/LeftNav';
import TopBar from '../../molecules/TopBar/TopBar';
import { routes } from '../../../routing/routes';

/**
 * TopBar
 *
 * @param open
 * @param handleDrawerOpen
 * @param handleDrawerClose
 * @param title
 * @param showSearchBar
 * @constructor
 */
const AppHeader: FC<DrawerProps & AppContainerProps> = ({
  open,
  handleDrawerOpen,
  handleDrawerClose,
  title,
  showSearchBar = false,
}) => {
  return (
    <>
      <TopBar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        title={title}
        showSearchBar={showSearchBar}
        routes={routes}
      />
      <LeftNav open={open} handleDrawerClose={handleDrawerClose} title={title} routes={routes} />
    </>
  );
};

export default AppHeader;
