import React, { FC } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import { useMultiselectStyles } from '../../../styles/styles/forms';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 224,
      width: 250,
    },
  },
};

/**
 * allow only those options which are also
 * available in the pool of optins (meta)
 *
 * @param chooses
 * @param options
 */
const filterChooses = (chooses: Option['uniqueKey'][], options: Option[]) =>
  chooses.filter(el => options.map(opt => opt.uniqueKey).includes(el));

/**
 *
 * @param value
 * @param options
 */
const getValueByKey = (value: string, options: Option[]) =>
  (options.find(el => el.uniqueKey === value) || { label: '' }).label;

/**
 * Single Option (<option>)
 */
interface Option {
  label: string;
  value: string;
  uniqueKey: string;
}

/**
 * General settingsSlice for multiselect
 */
interface Settings {
  label?: string;
  placeholder?: string;
}

/**
 * MultiSelect Props
 */
type MultiSelectProps = {
  settings: Settings;
  options: Option[];
  chooses: Option['uniqueKey'][];
  onChooseHandler: (value: string[]) => void;
};

/**
 * ChipSelect
 *
 * @param settings
 * @param options
 * @param chooses
 * @param onChooseHandler
 * @constructor
 */
const ChipSelect: FC<MultiSelectProps> = ({ settings, options, chooses, onChooseHandler }) => {
  const classes = useMultiselectStyles();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel>{settings.label}</InputLabel>
        <Select
          classes={{ select: classes.selectedElement }}
          multiple
          value={filterChooses(chooses, options)}
          onChange={event => onChooseHandler(event.target.value as string[])}
          input={<Input />}
          renderValue={selected => (
            <div className={classes.chips}>
              {(selected as string[]).map(value => (
                <Chip key={value} label={getValueByKey(value, options)} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {options.map(el => (
            <MenuItem key={el.uniqueKey} value={el.uniqueKey}>
              {el.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

/**
 * MultiSelect
 *
 * @param settings
 * @param options
 * @param chooses
 * @param onChooseHandler
 * @constructor
 */
const TagSelect: FC<MultiSelectProps> = ({ settings, options, chooses, onChooseHandler }) => {
  const classes = useMultiselectStyles();

  return (
    <div>
      <FormControl className={classes.formControl}>
        {settings.label && <InputLabel variant="filled">{settings.label}</InputLabel>}
        <Select
          classes={{ select: classes.selectedElement }}
          multiple
          value={filterChooses(chooses, options)}
          onChange={event => onChooseHandler(event.target.value as string[])}
          input={<Input />}
          renderValue={selected => (selected as string[]).map(el => getValueByKey(el, options)).join(', ')}
          MenuProps={MenuProps}
        >
          {settings.placeholder && (
            <MenuItem value="" disabled key="pholder">
              {settings.placeholder}
            </MenuItem>
          )}
          {options.map(el => (
            <MenuItem key={el.uniqueKey} value={el.uniqueKey}>
              <Checkbox checked={chooses.includes(el.uniqueKey)} />
              <ListItemText primary={el.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export { ChipSelect, TagSelect };
export type { Option };
