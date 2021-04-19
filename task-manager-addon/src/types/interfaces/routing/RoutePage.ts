import { Dict } from '../../templates/Dict';

/**
 * RoutePage
 */
export interface RoutePage {
  section: {
    headerTitle: string;
    showSearchBar: boolean;
  };

  meta: {
    title: string;
    description: string;
  };

  nav?: {
    name: string;
    icon: string;
  };

  data?: Dict<any>;
}
