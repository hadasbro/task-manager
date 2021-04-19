import React, { ChangeEvent, FC, useContext, useState } from 'react';
import { Chip, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@material-ui/core';
import StarsIcon from '@material-ui/icons/Stars';
import clsx from 'clsx';
import { usePaperStyles } from '../../../styles/styles/modules';
import MarginAutoBox from '../../atoms/CenteredBox/MarginAutoBox';
import { Controls } from '../../organisms/ConfiguratorStepper/Stepper';
import { ConfiguratorContext } from '../../../contexts/configurator/ConfiguratorContext';
import { Theme } from '../../../init/enums/appearance/Theme';
import { ViewKinds } from '../../../init/enums/appearance/ViewKinds';
import { themes } from '../../../init/defaults/themes';

/**
 * ViewLabel
 * @param icon
 * @param label
 * @param description
 * @constructor
 */
const ViewLabel: FC<{ icon?: React.ReactNode; label: string; description: string }> = ({
  icon,
  label,
  description,
}) => (
  <>
    <Typography variant="subtitle2" gutterBottom>
      {icon} {label}
    </Typography>
    <Typography variant="caption" display="block" gutterBottom style={{ maxWidth: 280 }}>
      {description}
    </Typography>
  </>
);
/**
 * AppearanceLabel
 * @param icon
 * @param label
 * @param description
 * @constructor
 */
const AppearanceLabel: FC<{ icon?: React.ReactNode; label: string }> = ({ icon, label }) => (
  <>
    <Typography variant="subtitle2">{label}</Typography>
    <Chip color="primary" size="small" label="1st" />
    <Chip color="secondary" size="small" label="2nd" />
    <Chip color="default" size="small" label="3rd" />
  </>
);
/**
 * AppearanceStep
 *
 * @constructor
 */
const AppearanceStep: FC = () => {
  const {
    handlers: { updateData },
    data: { apiConfig },
  } = useContext(ConfiguratorContext);

  const [appearance, setAppearance] = useState<{
    theme: Theme;
    viewtype: ViewKinds;
  }>({
    theme: apiConfig.theme,
    viewtype: apiConfig.viewtype,
  });

  const classes = usePaperStyles();

  /**
   * handleChange
   *
   * @param e
   */
  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    let apChange = {};

    if (name === 'theme') {
      apChange = { theme: themes[value] };
    } else if (name === 'viewtype') {
      apChange = { viewtype: value };
    }

    setAppearance(prev => {
      return {
        ...prev,
        ...apChange,
      };
    });
  };

  /**
   * validateSave
   */
  const validateSave = () => {
    updateData({
      apiConfig: { ...apiConfig, ...appearance },
    });

    return true;
  };

  return (
    <div className={clsx(classes.root, classes.wizzard)}>
      <MarginAutoBox cssProperties={{ width: '75%', maxWidth: 700, marginTop: 20 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend" style={{ marginTop: 30, marginBottom: 30, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              That kind of view do you want?
            </Typography>
          </FormLabel>
          <RadioGroup row aria-label="position" name="viewtype" value={appearance.viewtype} onChange={handleChange}>
            <FormControlLabel
              value={ViewKinds.BASIC}
              control={<Radio color="primary" />}
              label={
                <ViewLabel
                  label="Basic"
                  description="Basic view contains only the most essential info about the app's user, without extra panels like other users activity etc. This view is recommended for developers."
                />
              }
              labelPlacement="end"
            />

            <FormControlLabel
              value={ViewKinds.EXTENDED}
              control={<Radio color="primary" />}
              label={
                <ViewLabel
                  icon={<StarsIcon fontSize="small" color="secondary" />}
                  label="Extended"
                  description="Extended view contains info about the the app's user but also about other users and activity in tasks e.g. activity of other users, activity streams etc. This is recommended for menagers."
                />
              }
              labelPlacement="end"
            />
          </RadioGroup>
        </FormControl>
      </MarginAutoBox>

      <MarginAutoBox cssProperties={{ width: '75%', maxWidth: 530, marginTop: 20, marginBottom: 80 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend" style={{ marginTop: 30, marginBottom: 30, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Choose your favourite theme
            </Typography>
          </FormLabel>
          <RadioGroup row aria-label="position" name="theme" value={appearance.theme.id} onChange={handleChange}>
            {Object.entries(themes).map(([key, theme]) => (
              <FormControlLabel
                key={key}
                value={theme.id}
                control={<Radio color="primary" />}
                label={<AppearanceLabel label={theme.name} />}
                labelPlacement="end"
              />
            ))}
          </RadioGroup>
        </FormControl>
      </MarginAutoBox>

      <Controls validateNext={validateSave} />
    </div>
  );
};

export default AppearanceStep;
