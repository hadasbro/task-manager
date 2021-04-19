import React, { FC, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSettingsSagaAction } from 'store/saga/actionEffects/settings/updateSettingsSaga';
import { Typography } from '@material-ui/core';
import { apiConfigSliceActions } from 'store/redux/slices/apiConfigSlice';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { usePaperStyles } from '../../../styles/styles/modules';
import MarginAutoBox from '../../atoms/CenteredBox/MarginAutoBox';
import { Controls } from '../../organisms/ConfiguratorStepper/Stepper';
import { ConfiguratorContext } from '../../../contexts/configurator/ConfiguratorContext';
import BreakLine from '../../atoms/BreakLine/BreakLine';

/**
 * ConfirmationStep
 *
 * @constructor
 */
const ConfirmationStep: FC = () => {
  const dispatch = useDispatch();

  const [finished, setFinished] = useState(false);

  const { data } = useContext(ConfiguratorContext);

  const { apiConfig, settings } = data;

  const classes = usePaperStyles();

  /**
   * validateSave
   *
   * This is final step of configurator, save here
   * means that we need to flush data from component's
   * context to the Redux Store
   */
  const validateSave = () => {
    dispatch(updateSettingsSagaAction(settings));
    dispatch(apiConfigSliceActions.updateApiConfig(apiConfig));
    setFinished(true);
    return true;
  };

  return (
    <div className={classes.root}>
      <MarginAutoBox cssProperties={{ width: '75%', maxWidth: 500, marginTop: 30 }}>
        <div>
          <Typography variant="h6" gutterBottom style={{ width: '100%', textAlign: 'center', marginBottom: 20 }}>
            {!finished ? 'Please confirm your configuration' : 'Well done! Congratulations!'}
          </Typography>

          {!finished && (
            <div className={classes.root}>
              <List component="nav" aria-label="Lang">
                <ListItem>
                  <ListItemText primary={`Language: ${apiConfig.lang}`} />
                </ListItem>
              </List>
              <Divider />
              <List component="nav" aria-label="API">
                <ListItem>
                  <ListItemText primary={`API: ${apiConfig.apiType}`} />
                </ListItem>
              </List>
              <Divider />
              <List component="nav" aria-label="App">
                <ListItem>
                  <ListItemText primary={`App version: ${apiConfig.viewtype.toLocaleLowerCase()}`} />
                </ListItem>
              </List>
              <Divider />
              <List component="nav" aria-label="Theme">
                <ListItem>
                  <ListItemText primary={`Theme: ${apiConfig.theme.name}`} />
                </ListItem>
              </List>
            </div>
          )}
        </div>
      </MarginAutoBox>

      <BreakLine br={2} />

      {!finished && <Controls validateNext={validateSave} />}
    </div>
  );
};

export default ConfirmationStep;
