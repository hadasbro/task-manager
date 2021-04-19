import React, { FC, useMemo } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { NavLink } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FormatListNumberedRtlIcon from '@material-ui/icons/FormatListNumberedRtl';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SettingsIcon from '@material-ui/icons/Settings';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SettingsInputHdmiIcon from '@material-ui/icons/SettingsInputHdmi';
import { useAppContainerStyles } from '../../../styles/styles/app';
import { AppContainerProps, DrawerProps } from '../../templates/AppContainer/AppContainer';
import { Route } from '../../../types/interfaces/routing/Route';
import { isDefined } from '../../../types/guards/general/isDefined';
import { Routes } from '../../../types/interfaces/routing';
import { isRoute } from '../../../types/guards/routing/isRoute';

/**
 * iconFromName
 *
 * @param iconName
 */
function iconFromName(iconName: string) {
  switch (iconName) {
    case 'DashboardIcon':
      return <DashboardIcon />;
    case 'FormatListNumberedRtlIcon':
      return <FormatListNumberedRtlIcon />;
    case 'NotificationsIcon':
      return <NotificationsIcon />;
    case 'AssignmentIcon':
      return <AssignmentIcon />;
    case 'SettingsIcon':
      return <SettingsIcon />;
    case 'SettingsInputHdmiIcon':
      return <SettingsInputHdmiIcon />;
    case 'AccessTimeIcon':
      return <AccessTimeIcon />;
    default:
      return <></>;
  }
}

/**
 * Link
 *
 * @param path
 * @param pageData
 * @constructor
 */
const Link: FC<Route> = ({ path, pageData }) => {
  return (
    <>
      <NavLink to={path!}>
        <ListItemIcon style={{ minWidth: 35 }}>{iconFromName(pageData.nav!.icon)}</ListItemIcon>
      </NavLink>
      <NavLink to={path!}>
        <ListItemText primary={pageData.nav!.name} />
      </NavLink>
    </>
  );
};
/**
 * LeftNav
 *
 * @param title
 * @constructor
 */
const LeftNav: FC<DrawerProps & AppContainerProps & { routes: Routes }> = ({
  open,
  routes,
  handleDrawerClose = () => {},
}) => {
  const classes = useAppContainerStyles();

  const theme = useTheme();

  const menuItems = useMemo(() => {
    return Object.values(routes)
      .filter(route => isRoute(route))
      .map(route => route as Route)
      .filter(route => isDefined(route.pageData.nav))
      .map(route => (
        <ListItem button key={route.key!}>
          <Link {...route} />
        </ListItem>
      ));
  }, [routes]);

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{ paper: classes.drawerPaper }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>{menuItems}</List>
    </Drawer>
  );
};

export default LeftNav;
