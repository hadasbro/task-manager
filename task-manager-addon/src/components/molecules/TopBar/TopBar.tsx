import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { IconButton } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import FormatListNumberedRtlIcon from '@material-ui/icons/FormatListNumberedRtl';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HeaderSearch from '../../atoms/HeaderSearch/HeaderSearch';
import { useAppContainerStyles } from '../../../styles/styles/app';
import { AppContainerProps, DrawerProps } from '../../templates/AppContainer/AppContainer';
import { Routes } from '../../../types/interfaces/routing';
import { selectTodayUndoneTodosCount } from '../../../store/selectors/todoSelectors';
import { selectRingingReminders, selectTodaysRemindersCount } from '../../../store/selectors/remindersSelectors';

/**
 * TopBar
 *
 * @param open
 * @param handleDrawerOpen
 * @param title
 * @param showSearchBar
 * @constructor
 */
const TopBar: FC<DrawerProps & AppContainerProps & { routes: Routes }> = ({
  routes,
  open,
  title,
  showSearchBar = true,
  handleDrawerOpen = () => {},
}) => {
  const classes = useAppContainerStyles();

  const todaysTodosCount = useSelector(selectTodayUndoneTodosCount);
  const ringingReminders = useSelector(selectRingingReminders);

  return (
    <AppBar position="static" className={clsx(classes.appBar, { [classes.appBarShift]: open })}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          {title}
        </Typography>

        {showSearchBar && <HeaderSearch />}

        <div className={classes.grow} />

        <div className={classes.sectionDesktop}>
          <NavLink to={routes.todo.path!}>
            <IconButton aria-label="Todos" color="inherit">
              <Badge badgeContent={todaysTodosCount} color="secondary">
                <FormatListNumberedRtlIcon />
              </Badge>
            </IconButton>
          </NavLink>
          <NavLink to={routes.reminders.path!}>
            <IconButton aria-label="Reminders" color="inherit">
              <Badge badgeContent={ringingReminders.length} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </NavLink>
          <NavLink to={routes.notes.path!}>
            <IconButton edge="end" aria-label="Notes" aria-haspopup="true" color="inherit">
              <AssignmentIcon />
            </IconButton>
          </NavLink>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
