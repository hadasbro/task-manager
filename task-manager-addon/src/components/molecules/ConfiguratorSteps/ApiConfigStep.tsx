import React, { FC, useContext, useState } from 'react';
import _ from 'lodash';
import { usePaperStyles } from '../../../styles/styles/modules';
import { Controls } from '../../organisms/ConfiguratorStepper/Stepper';
import { ConfiguratorContext } from '../../../contexts/configurator/ConfiguratorContext';
import ConfigForm from '../SettingsConfig/ConfigForm';
import GeneralException from '../../../exceptions/system/GeneralException';
import ApiConfigInterface from '../../../types/interfaces/objects/Config';
import { ApiClientType } from '../../../init/enums/api/ApiClientType';

/**
 * ApiConfigStep
 *
 * @constructor
 */
const ApiConfigStep: FC = () => {
  const {
    handlers: { updateData },
    data: { apiConfig },
  } = useContext(ConfiguratorContext);

  const [config, setConfig] = useState<ApiConfigInterface>(apiConfig);

  const classes = usePaperStyles();

  /**
   * validateSave
   *
   * validate data and save to the context
   */
  const validateSave = () => {
    if (![ApiClientType.JIRA].includes(config.apiType)) {
      throw new GeneralException(`Incorrect API. Supported APIs are: [${[ApiClientType.JIRA].join(', ')}]`);
    }

    const { apiUrl, apiToken, userId } = config.apiCredentials;

    if (_.isEmpty(apiUrl) || _.isEmpty(apiToken) || _.isEmpty(userId)) {
      throw new GeneralException('Incorrect API credentials');
    }

    // if al OK,the update data i the context
    updateData({
      apiConfig: config,
    });

    return true;
  };

  /**
   * updateConfig
   *
   * @param config
   */
  const updateConfig = (config: Partial<ApiConfigInterface>) => {
    setConfig(prev => {
      return { ...prev, ...config };
    });
  };

  return (
    <div className={classes.root}>
      <ConfigForm config={config} handleSave={validateSave} updateConfig={updateConfig} showConfirmButton={false} />
      <Controls validateNext={validateSave} />
    </div>
  );
};

export default ApiConfigStep;
