import React, { FC, useContext, useState } from 'react';
import { usePaperStyles } from '../../../styles/styles/modules';
import MarginAutoBox from '../../atoms/CenteredBox/MarginAutoBox';
import { Controls } from '../../organisms/ConfiguratorStepper/Stepper';
import SettingsForm from '../SettingsConfig/SettingsForm';
import { ConfiguratorContext } from '../../../contexts/configurator/ConfiguratorContext';
import { configuratorContextDefault } from '../../../contexts/configurator/defaults';
import { SettingsInterface } from '../../../types/interfaces/objects/Setting';

/**
 * SettingsStep
 *
 * @constructor
 */
const SettingsStep: FC = () => {
  const {
    handlers: { updateData },
    data: { settings },
  } = useContext(ConfiguratorContext);

  const [stateSettings, setStateSettings] = useState<SettingsInterface>(settings);

  const classes = usePaperStyles();

  /**
   * validateSave
   */
  const validateSave = () => {
    // TODO here should be some validation

    // if al OK,the update data i the context
    updateData({
      settings: stateSettings,
    });

    return true;
  };

  /**
   * validateSkip
   *
   * Skip in this form means reset to values from context (latest known and aproved changes)
   * (if we set a few settings and save then we are OK, but if we first set a few things and
   * then skip the step then we should ignore those changes andjust go back to the latest
   * approved changes (if there are any) so those ones from context
   */
  const validateSkip = () => {
    setStateSettings(settings);
    return true;
  };

  /**
   * handleSettingsReset
   */
  const handleSettingsReset = () => {
    setStateSettings(prev => {
      return { ...prev, ...configuratorContextDefault.data.settings };
    });
  };

  /**
   * updateConfig
   *
   * @param config
   */
  const updateSetting = (config: Partial<SettingsInterface>) => {
    setStateSettings(prev => {
      return { ...prev, ...config };
    });
  };

  return (
    <div className={classes.root}>
      <MarginAutoBox cssProperties={{ width: '90%', marginBottom: 20 }}>
        <SettingsForm
          settings={stateSettings}
          handleSave={validateSave}
          updateSetting={updateSetting}
          handleReset={handleSettingsReset}
          showConfirmButton={false}
        />
      </MarginAutoBox>
      <Controls validateNext={validateSave} validateSkip={validateSkip} />
    </div>
  );
};

export default SettingsStep;
