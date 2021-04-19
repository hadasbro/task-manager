import { apiConfigSliceInitialState } from '../../store/redux/slices/apiConfigSlice';
import { settingsSliceInitialState } from '../../store/redux/slices/settingsSlice';
import { ConfiguratorWizardContext } from './types';

/**
 * configuratorContextDefault
 *
 * because we use the same kind of data in context (app's settings, api settings etc,
 * so we can initialise Context with the same data we use for initialising Store)
 */
export const configuratorContextDefault: ConfiguratorWizardContext = {
  controls: {
    activeStep: 0,
    skipped: new Set<number>(),
    alert: null,
    steps: [],
  },
  data: {
    apiConfig: apiConfigSliceInitialState.apiConfig,
    settings: settingsSliceInitialState.settings,
    verified: true,
  },
  handlers: {
    handleBack: () => {},
    handleSkip: () => {},
    handleReset: () => {},
    handleNext: () => {},
    setAlert: () => {},
    setData: () => {},
    updateData: () => {},
  },
};
