import { Routes } from '../types/interfaces/routing';

/**
 * all Routes
 */
export const routes: Routes = {
  default: {
    key: 'default',
    path: '/',
    from: '/',
    to: '/dashboard',
    exact: true,
    isRedirection: true,
  },
  dashboard: {
    isRoute: true,
    key: 'dashboard',
    path: '/dashboard',
    exact: true,
    page: 'Tasks',
    pageData: {
      section: {
        headerTitle: 'Dashboard',
        showSearchBar: true,
      },
      meta: {
        title: 'Dashboard',
        description: 'My dashboard',
      },
      nav: {
        name: 'Dashboard',
        icon: 'DashboardIcon',
      },
    },
  },
  todo: {
    isRoute: true,
    key: 'todo',
    path: '/todo',
    exact: true,
    page: 'Todos',
    pageData: {
      section: {
        headerTitle: 'My todo list',
        showSearchBar: false,
      },
      meta: {
        title: 'My todo list',
        description: 'My todo list',
      },
      nav: {
        name: 'Todos',
        icon: 'FormatListNumberedRtlIcon',
      },
    },
  },
  reminders: {
    isRoute: true,
    key: 'reminders',
    path: '/reminders',
    exact: true,
    page: 'Reminders',
    pageData: {
      section: {
        headerTitle: 'Reminders',
        showSearchBar: false,
      },
      meta: {
        title: 'Reminders',
        description: 'My reminders',
      },
      nav: {
        name: 'Reminders',
        icon: 'NotificationsIcon',
      },
    },
  },
  notes: {
    isRoute: true,
    key: 'notes',
    path: '/notes',
    exact: true,
    page: 'Notes',
    pageData: {
      section: {
        headerTitle: 'My notes',
        showSearchBar: false,
      },
      meta: {
        title: 'My notes',
        description: 'My notes',
      },
      nav: {
        name: 'Notes',
        icon: 'AssignmentIcon',
      },
    },
  },
  settings: {
    isRoute: true,
    key: 'settings',
    path: '/settings',
    exact: true,
    page: 'AppSettings',
    pageData: {
      section: {
        headerTitle: 'Settings',
        showSearchBar: false,
      },
      meta: {
        title: 'Settings',
        description: 'My settings',
      },
      nav: {
        name: 'Settings',
        icon: 'SettingsIcon',
      },
    },
  },
  timeReport: {
    isRoute: true,
    key: 'timeReport',
    path: '/timer',
    exact: true,
    page: 'Timer',
    pageData: {
      section: {
        headerTitle: 'Time Report',
        showSearchBar: false,
      },
      meta: {
        title: 'Time Report',
        description: 'My time report',
      },
      nav: {
        name: 'Time Report',
        icon: 'AccessTimeIcon',
      },
    },
  },
  installation: {
    isRoute: true,
    key: 'installation',
    path: '/installation',
    exact: true,
    page: 'Configurator',
    pageData: {
      section: {
        headerTitle: 'Configurator Wizzard',
        showSearchBar: false,
      },
      meta: {
        title: 'Configurator Wizzard',
        description: 'Configurator Wizzard',
      },
      nav: {
        name: 'Configurator',
        icon: 'SettingsInputHdmiIcon',
      },
    },
  },
  notfound: {
    isRoute: true,
    key: 'not-found',
    page: 'NotFound',
    pageData: {
      section: {
        headerTitle: 'Not found',
        showSearchBar: false,
      },
      meta: {
        title: 'Not found',
        description: 'Not found',
      },
    },
  },
};
