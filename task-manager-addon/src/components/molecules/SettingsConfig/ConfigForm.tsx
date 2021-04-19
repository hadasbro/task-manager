import React, { ChangeEvent, FC, useMemo } from 'react';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import { useVirtualizedTableStyles } from '../../../styles/styles/tasksTable';
import { translations } from '../../../locales/i18n';
import MarginAutoBox from '../../atoms/CenteredBox/MarginAutoBox';
import BreakLine from '../../atoms/BreakLine/BreakLine';
import ApiConfigInterface from '../../../types/interfaces/objects/Config';
import { isDefined } from '../../../types/guards/general/isDefined';
import { ApiClientType } from '../../../init/enums/api/ApiClientType';

/**
 * SettingsProps
 */
interface AppConfigProps extends WithStyles<typeof useVirtualizedTableStyles> {
  config: ApiConfigInterface;
  updateConfig: (settings: Partial<ApiConfigInterface>) => void;
  handleSave?: (config: ApiConfigInterface) => void;
  showConfirmButton?: boolean;
}

/**
 * ConfigComponent
 *
 * this component only has internal State and it doesnt use Redux appStore
 * data from can be saved to Redux also (and it is in 1 place, in another its not)
 * via handleSave which is optionally provided as a prop
 *
 * @param initialConfig
 * @param classes
 * @constructor
 */
const ConfigComponent: FC<AppConfigProps> = ({
  config,
  updateConfig,
  handleSave,
  classes,
  showConfirmButton = true,
}) => {
  const { t: translator } = useTranslation();

  const labels = useMemo(() => {
    return {
      Confirm: translator(translations.apiConfigPanel.Confirm),
      configuration: translator(translations.apiConfigPanel.configuration),
      APIconfiguration: translator(translations.apiConfigPanel.APIconfiguration),
      JiraURL: translator(translations.apiConfigPanel.JiraURL),
      JiraToken: translator(translations.apiConfigPanel.JiraToken),
      pleaseSetUpYourConfigurationAndConfirm: translator(
        translations.apiConfigPanel.pleaseSetUpYourConfigurationAndConfirm,
      ),
    };
  }, [translator]); // TODO to verify

  /**
   * handleConfigChange
   *
   * @param name
   * @param value
   */
  const handleConfigChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    updateConfig({
      [name]: value,
    });
  };

  /**
   * handleApiCredentialsChange
   *
   * @param name
   * @param value
   */
  const handleApiCredentialsChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement & { name: keyof ApiConfigInterface['apiCredentials'] }>) => {
    updateConfig({
      apiCredentials: {
        ...config.apiCredentials,
        [name]: value,
      },
    });
  };

  /**
   * handleConfirmAction
   */
  const handleConfirmAction = () => {
    if (isDefined(handleSave)) {
      handleSave(config);
    }
  };

  return (
    <Paper elevation={0} className={clsx(classes.settingsPaper)}>
      <MarginAutoBox cssProperties={{ width: '70%', marginTop: 20, maxWidth: '450px' }}>
        <FormControl component="fieldset">
          <FormLabel component="legend" style={{ marginTop: 30, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              {labels.configuration}
            </Typography>
          </FormLabel>
          <RadioGroup row aria-label="position" name="apiType" value={config.apiType} onChange={handleConfigChange}>
            <FormControlLabel
              value={ApiClientType.JIRA}
              control={<Radio color="primary" />}
              label="JIRA"
              labelPlacement="start"
            />
            <FormControlLabel
              value={ApiClientType.BACKLOG}
              control={<Radio color="primary" />}
              label="Backlog"
              labelPlacement="start"
              disabled
            />
            <FormControlLabel
              value={ApiClientType.TAIGA}
              control={<Radio color="primary" />}
              label="Taiga"
              labelPlacement="start"
              disabled
            />
            <FormControlLabel
              value={ApiClientType.TARGETPROCESS}
              control={<Radio color="primary" />}
              label="Targetprocess"
              labelPlacement="start"
              disabled
            />
          </RadioGroup>
        </FormControl>
      </MarginAutoBox>

      <MarginAutoBox cssProperties={{ maxWidth: '450px', marginTop: 30, marginBottom: 80 }}>
        <>
          <FormControl component="fieldset">
            <FormLabel component="legend" style={{ marginTop: 30, marginBottom: 10, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                API credentials and tokens
              </Typography>
            </FormLabel>
            <TextField
              label={labels.JiraURL}
              helperText="URL of your app's REST API (JIRA, Taiga, Targetprocess, etc.)"
              name="apiUrl"
              value={config.apiCredentials.apiUrl}
              onChange={handleApiCredentialsChange}
            />
            <TextField
              label={labels.JiraToken}
              helperText="Your Authorisation Token"
              name="apiToken"
              value={config.apiCredentials.apiToken}
              onChange={handleApiCredentialsChange}
            />
            <TextField
              label="Your user"
              helperText="Your user unique ID"
              name="userId"
              onChange={handleApiCredentialsChange}
              value={config.apiCredentials.userId}
            />
          </FormControl>

          <BreakLine br={2} />

          {showConfirmButton && (
            <Button variant="contained" color="primary" onClick={handleConfirmAction}>
              {labels.Confirm}
            </Button>
          )}
        </>
      </MarginAutoBox>
    </Paper>
  );
};

const ConfigForm = withStyles(useVirtualizedTableStyles)(ConfigComponent);

export default ConfigForm;
