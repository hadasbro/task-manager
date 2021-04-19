/* eslint-disable react/destructuring-assignment */
import React, { ChangeEvent, FC } from 'react';
import _ from 'lodash';
import { Checkbox, FormControl, FormControlLabel, FormLabel, Grid, TextField } from '@material-ui/core';
import { dayjsExt, dayjsFormat } from '../../../extensions/dayjs';
import { useFilterFormStyles } from '../../../styles/styles/forms';
import * as MultiSelect from '../../atoms/MultiSelect/MultiSelect';
import FilterOrder from '../../../types/interfaces/objects/FilterOrder';
import { EntityID } from '../../../types/interfaces/global/EntityID';
import Meta from '../../../types/interfaces/objects/Meta';
import { DayjsObj } from '../../../types/interfaces/datetime/DayjsObj';
import { OptionalObj } from '../../../types/templates/OptionalObj';

/**
 * FiltersFormProps
 */
type FiltersFormProps = {
  filters: FilterOrder;
  metas: Meta;
  handlerUpdateFilters: (filtersOrders: Partial<FilterOrder>) => void;
  userId: EntityID;
};

/**
 * Filters
 *
 * @param props
 * @constructor
 */
const FiltersForm: FC<FiltersFormProps> = ({ filters, metas, handlerUpdateFilters, userId }) => {
  const classes = useFilterFormStyles();

  /**
   * multiSelectChooseHandler
   *
   * @param value
   * @param filterKey
   */
  const multiSelectChooseHandler = (
    value: string[],
    filterKey: keyof Pick<FilterOrder, 'projectIdIn' | 'typeIdIn' | 'priorityIdIn' | 'statusIdIn'>,
  ): void => {
    const newFilters: Partial<FilterOrder> = {
      [filterKey]: filterKey === 'projectIdIn' ? value.map(el => Number(el)) : value,
    };

    handlerUpdateFilters(newFilters);
  };

  /**
   * checkboxOptionHandler
   *
   * @param name
   * @param checked
   */
  const checkboxOptionHandler = ({ target: { name, checked } }: ChangeEvent<HTMLInputElement>) => {
    const newFilters: Partial<FilterOrder> = {
      [name]: checked ? userId : null,
    };

    handlerUpdateFilters(newFilters);
  };

  /**
   * datePickerFilterHandler
   *
   * @param name
   * @param value
   */
  const datePickerFilterHandler = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    const dateTimeRegexp = new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}$');

    if (!dateTimeRegexp.test(value)) {
      return false;
    }

    // eslint-disable-next-line no-useless-escape
    const parsedInput = value.split(/[\-T:]+/);

    const date: OptionalObj<DayjsObj> = {
      years: _.toInteger(parsedInput[0]),
      months: _.toInteger(parsedInput[1]),
      date: _.toInteger(parsedInput[2]),
      hours: _.toInteger(parsedInput[3]),
      minutes: _.toInteger(parsedInput[4]),
    };

    const newFilters: Partial<FilterOrder> = {
      [name]: dayjsExt(date),
    };

    handlerUpdateFilters(newFilters);

    return true;
  };

  return (
    <FormControl component="fieldset" className={classes.filtersRoot}>
      <FormLabel component="legend" className={classes.formRootLabel}>
        FiltersForm
      </FormLabel>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControlLabel
            classes={{
              root: classes.formControlLabel,
              label: classes.formControlLabel,
            }}
            control={
              <Checkbox
                checked={!!filters.assigneeIdIs}
                onChange={checkboxOptionHandler}
                name="assigneeIdIs"
                color="primary"
              />
            }
            label="Task is assigned to me"
          />
          <br />
          <FormControlLabel
            classes={{
              root: classes.formControlLabel,
              label: classes.formControlLabel,
            }}
            control={
              <Checkbox
                checked={!!filters.observerIdIs}
                onChange={checkboxOptionHandler}
                name="observerIdIs"
                color="primary"
              />
            }
            label="I am observer"
          />
          <br />
          <FormControlLabel
            classes={{
              root: classes.formControlLabel,
              label: classes.formControlLabel,
            }}
            control={
              <Checkbox
                checked={!!filters.reporterIdIs}
                onChange={checkboxOptionHandler}
                name="reporterIdIs"
                color="primary"
              />
            }
            label="I am reporter"
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="datetime-local"
            label="My last activity after"
            type="datetime-local"
            name="lastActivityUserSince"
            value={dayjsFormat(filters.lastActivityUserSince, 'YYYY-MM-DDTHH:mm')}
            inputProps={{
              pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}',
            }}
            className={classes.formControlLabel}
            onChange={datePickerFilterHandler}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginBottom: 20 }}
          />
          <TextField
            label="Any last activity after"
            type="datetime-local"
            name="lastActivityAllSince"
            value={dayjsFormat(filters.lastActivityAllSince, 'YYYY-MM-DDTHH:mm')}
            inputProps={{
              pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}',
            }}
            className={classes.formControlLabel}
            onChange={datePickerFilterHandler}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <MultiSelect.TagSelect
            settings={{ label: 'Projects' }}
            options={Object.values(metas.projects).map(el => {
              return {
                label: el.name,
                value: el.id,
                uniqueKey: el.id,
              } as MultiSelect.Option;
            })}
            chooses={filters.projectIdIn.map(el => `${el}`)}
            onChooseHandler={el => multiSelectChooseHandler(el, 'projectIdIn')}
          />
        </Grid>
        <Grid item xs={6}>
          <MultiSelect.ChipSelect
            settings={{ label: 'Task types' }}
            options={Object.values(metas.types).map(el => {
              return {
                label: el.name,
                value: el.id,
                uniqueKey: el.id,
              } as MultiSelect.Option;
            })}
            chooses={filters.typeIdIn}
            onChooseHandler={el => multiSelectChooseHandler(el, 'typeIdIn')}
          />
        </Grid>
        <Grid item xs={6}>
          <MultiSelect.ChipSelect
            settings={{ label: 'Priorities' }}
            options={Object.values(metas.priorities).map(el => {
              return {
                label: el.name,
                value: el.id,
                uniqueKey: el.id,
              } as MultiSelect.Option;
            })}
            chooses={filters.priorityIdIn}
            onChooseHandler={el => multiSelectChooseHandler(el, 'priorityIdIn')}
          />
        </Grid>
        <Grid item xs={6}>
          <MultiSelect.ChipSelect
            settings={{ label: 'Statuses' }}
            options={Object.values(metas.statuses).map(el => {
              return {
                label: el.name,
                value: el.id,
                uniqueKey: el.id,
              } as MultiSelect.Option;
            })}
            chooses={filters.statusIdIn}
            onChooseHandler={el => multiSelectChooseHandler(el, 'statusIdIn')}
          />
        </Grid>
      </Grid>
    </FormControl>
  );
};

export { FiltersForm };
