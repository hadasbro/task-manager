import React, { FC, useState, ChangeEvent, useContext } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import france from 'assets/flags/france.png';
import germany from 'assets/flags/germany.png';
import italy from 'assets/flags/italy.png';
import romania from 'assets/flags/romania.png';
import poland from 'assets/flags/poland.png';
import unitedKingdom from 'assets/flags/united-kingdom.png';
import clsx from 'clsx';
import { usePaperStyles } from '../../../styles/styles/modules';
import MarginAutoBox from '../../atoms/CenteredBox/MarginAutoBox';
import { Controls } from '../../organisms/ConfiguratorStepper/Stepper';
import GeneralException from '../../../exceptions/system/GeneralException';
import { ConfiguratorContext } from '../../../contexts/configurator/ConfiguratorContext';
import { Langs } from '../../../init/enums/general/Langs';

/**
 * CountryLabel
 *
 * @param icon
 * @param label
 * @constructor
 */
const CountryLabel: FC<{ icon: string; label: string }> = ({ icon, label }) => (
  <>
    <img src={icon} alt={label} style={{ verticalAlign: 'middle' }} /> {label}
  </>
);

/**
 * LanguageStep
 *
 * @constructor
 */
const LanguageStep: FC = () => {
  const {
    handlers: { updateData },
    data: { apiConfig },
  } = useContext(ConfiguratorContext);

  const [language, setLaunguage] = useState<Langs>(apiConfig.lang);

  const classes = usePaperStyles();

  /**
   * handleChange
   *
   * @param e
   */
  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    // update data in the sate
    setLaunguage(() => value as Langs);
  };

  /**
   * validateSave
   */
  const validateSave = () => {
    if (![Langs.EN, Langs.PL].includes(language)) {
      throw new GeneralException(`Incorrect language. Supported languages are: [${[Langs.EN, Langs.PL].join(', ')}]`);
    }

    // if al OK,the update data i the context
    updateData({
      apiConfig: { ...apiConfig, lang: language },
    });

    return true;
  };

  return (
    <div className={clsx(classes.root, classes.wizzard)}>
      <MarginAutoBox cssProperties={{ maxWidth: '850px', marginTop: 80, marginBottom: 80 }}>
        <FormControl component="fieldset">
          <RadioGroup row aria-label="position" name="position" value={language} onChange={handleChange}>
            <FormControlLabel
              value={Langs.EN}
              control={<Radio color="primary" />}
              label={<CountryLabel icon={unitedKingdom} label="English" />}
              labelPlacement="end"
            />
            <FormControlLabel
              value={Langs.PL}
              control={<Radio color="primary" />}
              label={<CountryLabel icon={poland} label="Polski" />}
              labelPlacement="end"
            />
            <FormControlLabel
              value={Langs.DE}
              control={<Radio color="primary" />}
              label={<CountryLabel icon={germany} label="Deutsche" />}
              labelPlacement="end"
              disabled
            />
            <FormControlLabel
              value={Langs.FR}
              control={<Radio color="primary" />}
              label={<CountryLabel icon={france} label="Français" />}
              labelPlacement="end"
              disabled
            />
            <FormControlLabel
              value={Langs.IT}
              control={<Radio color="primary" />}
              label={<CountryLabel icon={italy} label="Italiano" />}
              labelPlacement="end"
              disabled
            />
            <FormControlLabel
              value={Langs.RO}
              control={<Radio color="primary" />}
              label={<CountryLabel icon={romania} label="Română" />}
              labelPlacement="end"
              disabled
            />
          </RadioGroup>
        </FormControl>
      </MarginAutoBox>

      <Controls validateNext={validateSave} />
    </div>
  );
};

export default LanguageStep;
