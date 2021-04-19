import { Nullable } from '../../../types/templates/Nullable';
import { StoreException } from '../../../exceptions/store/StoreException';

/**
 * LoadingState
 */
export interface LoadingState {
  meta: {
    metaLoading: boolean;
    metaError: Nullable<StoreException>;
    projectsLoading: boolean;
    projectsError: Nullable<StoreException>;
    typesLoading: boolean;
    typesError: Nullable<StoreException>;
    prioritiesLoading: boolean;
    prioritiesError: Nullable<StoreException>;
    statusesLoading: boolean;
    statusesError: Nullable<StoreException>;
  };

  people: {
    peopleLoading: boolean;
    peopleError: Nullable<StoreException>;
  };

  activity: {
    worklogListLoading: boolean;
    worklogListError: Nullable<StoreException>;
    activityListLoading: boolean;
    activityListError: Nullable<StoreException>;
  };

  settings: {
    updateSettingsLoading: boolean;
    updateSettingsError: Nullable<StoreException>;
  };

  tasks: {
    tasksListLoading: boolean;
    tasksListError: Nullable<StoreException>;
    currentTaskLoading: boolean;
    currentTaskError: Nullable<StoreException>;
  };
}
