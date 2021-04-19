/* eslint-disable */
import React, { FC } from 'react';
import * as Configurator from '../../organisms/ConfiguratorStepper/Stepper';
import LanguageStep from '../../molecules/ConfiguratorSteps/LanguageStep';
import ApiConfigStep from '../../molecules/ConfiguratorSteps/ApiConfigStep';
import AppearanceStep from '../../molecules/ConfiguratorSteps/AppearanceStep';
import SettingsStep from '../../molecules/ConfiguratorSteps/SettingsStep';
import ConfirmationStep from '../../molecules/ConfiguratorSteps/ConfirmationStep';

/**
 * ConfiguratorWizzard
 *
 * @constructor
 */
const ConfiguratorWizzard: FC<{ resetButton?: boolean }> = () => {
  const steps: Configurator.StepType[] = [
    {
      label: 'Language choose',
      optional: false,
      component: () => <LanguageStep />,
    },
    {
      label: 'Api Configuration',
      optional: false,
      component: () => <ApiConfigStep />,
    },
    {
      label: 'Appearance',
      optional: true,
      component: () => <AppearanceStep />,
    },
    {
      label: 'Settings',
      optional: true,
      component: () => <SettingsStep />,
    },
    {
      label: 'Confirmation',
      optional: false,
      component: () => <ConfirmationStep />,
    },
  ];

  return (
    <Configurator.Stepper steps={steps}>
      <Configurator.Alert />
      <Configurator.StepsLine />
      <Configurator.Step render={step => steps[step].component()} />
    </Configurator.Stepper>
  );
};

export default ConfiguratorWizzard;
