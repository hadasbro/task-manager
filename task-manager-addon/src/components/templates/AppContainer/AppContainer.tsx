import React, { FC } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useAppContainerStyles } from '../../../styles/styles/app';
import styles from '../../../styles/App.module.scss';
import AppHeader from '../../organisms/AppHeader/AppHeader';
import AlertModule from '../../molecules/AlertModule/AlertModule';
import { useToggle } from '../../../hooks/switchers/useToggle';

/**
 * AppContainerProps
 */
export type AppContainerProps = {
  title: string;
  children?: any;
  showSearchBar?: boolean;
};

/**
 * DrawerProps
 */
export type DrawerProps = {
  open: boolean;
  handleDrawerOpen?: () => void;
  handleDrawerClose?: () => void;
};
/**
 * AppContainer
 *
 * @param title
 * @param children
 * @param showSearchBar
 * @constructor
 */
const AppContainer: FC<AppContainerProps> = ({ children, title, showSearchBar = false }) => {
  const classes = useAppContainerStyles();

  const [open, toggle] = useToggle(false);

  const handleDrawerToggle = () => {
    toggle();
  };

  return (
    <div className={clsx(classes.grow, 'App', styles.main)}>
      <CssBaseline />
      <AppHeader
        title={title}
        open={open}
        handleDrawerOpen={handleDrawerToggle}
        handleDrawerClose={handleDrawerToggle}
        showSearchBar={showSearchBar}
      />
      <main className={clsx(classes.content, { [classes.contentShift]: open })}>
        <AlertModule />
        {children}
      </main>
    </div>
  );
};

export default AppContainer;
