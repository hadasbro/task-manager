import { StepType } from '../../components/organisms/ConfiguratorStepper/Stepper';
import { Nullable } from '../../types/templates/Nullable';
import ApiConfigInterface from '../../types/interfaces/objects/Config';
import { SettingsInterface } from '../../types/interfaces/objects/Setting';

/**
 * ControlsContext
 */
export type ControlsContext = {
  activeStep: number;
  skipped: Set<number>;
  alert: Nullable<string>;
  steps: StepType[];
};

/**
 * DataContext
 */
export type DataContext = {
  apiConfig: ApiConfigInterface;
  settings: SettingsInterface;
  verified: boolean;
};

/**
 * HandlersContext
 */
export type HandlersContext = {
  handleBack: () => void;
  handleSkip: () => void;
  handleReset: () => void;
  handleNext: () => void;
  setAlert: (alert: Nullable<string>) => void;
  setData: (data: DataContext) => void;
  updateData: (data: Partial<DataContext>) => void;
};

/**
 * ConfiguratorWizardContext
 */
export type ConfiguratorWizardContext = {
  controls: ControlsContext;
  handlers: HandlersContext;
  data: DataContext;
};
