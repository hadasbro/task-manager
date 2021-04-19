/* eslint-disable react/destructuring-assignment, jsx-a11y/label-has-associated-control */
import React, { ChangeEvent, FC, MouseEvent, useEffect, useMemo } from 'react';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Alert } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import { parseTimePickerValue } from 'functions/datetime/parseTimePickerValue';
import { useVirtualizedTableStyles } from '../../../styles/styles/tasksTable';
import { dayjsObj } from '../../../extensions/dayjs';
import { LanguageKey, translations } from '../../../locales/i18n';
import BreaksPicker from '../BreaksPicker/BreaksPicker';
import TimePickers from '../../atoms/TimePicker/TimePicker';
import GeneralException from '../../../exceptions/system/GeneralException';
import { SettingsInterface } from '../../../types/interfaces/objects/Setting';
import { isDefined } from '../../../types/guards/general/isDefined';
import { DetailsOpts } from '../../../init/enums/settings/DetailsOpts';
import { TimeOpts } from '../../../init/enums/settings/TimeOpts';
import { TimerSourceOpts } from '../../../init/enums/settings/TimerSourceOpts';
import { defaultTimePickerDate } from '../../../init/defaults/datetime';

/**
 * SettingsProps
 */
export type SettingsProps = {
  settings: SettingsInterface;
  updateSetting: (settings: Partial<SettingsInterface>) => void;
  handleSave?: (settings: SettingsInterface) => void;
  handleReset?: () => void;
  showConfirmButton?: boolean;
  showResetButton?: boolean;
} & WithStyles<typeof useVirtualizedTableStyles>;

/**
 * SettingsComponent
 *
 * this is dumb component which has no state
 * (here we have lifting stat up, so state is in paet ocmponent)
 *
 * @param settings - initial settings
 * @param updateSetting - update parent's state with some changes
 * @param handleSave - actionToDispatch for save
 * @param handleReset - actionToDispatch reset
 * @param classes
 * @param showConfirmButton
 * @param showResetButton
 * @param showConfirmButton
 * @param showResetButton
 * @constructor
 */
const SettingsComponent: FC<SettingsProps> = ({
  settings,
  updateSetting,
  handleSave,
  handleReset,
  showConfirmButton = true,
  showResetButton = true,
  classes,
}) => {
  useEffect(() => {}, [settings]);

  const { t: translator, i18n } = useTranslation();

  const labels = useMemo(() => {
    return {
      settings: translator(translations.settingsPanel.settings),
      settingsInfo: translator(translations.settingsPanel.settingsInfo),
      activeTaskAlwaysOnTtop: translator(translations.settingsPanel.activeTaskAlwaysOnTtop),
      doubleClickShowsDetails: translator(translations.settingsPanel.doubleClickShowsDetails),
      donandapostShowDetailsAtAll: translator(translations.settingsPanel.donandapostShowDetailsAtAll),
      startCountingTime: translator(translations.settingsPanel.startCountingTime),
      automatically: translator(translations.settingsPanel.automatically),
      manually: translator(translations.settingsPanel.manually),
      useJiraTime: translator(translations.settingsPanel.useJiraTime),
      useMyBrowserTime: translator(translations.settingsPanel.useMyBrowserTime),
      refreshInEvery: translator(translations.settingsPanel.refreshInEvery),
      sec: translator(translations.settingsPanel.sec),
      inTasksShowTimer: translator(translations.settingsPanel.inTasksShowTimer),
      myDailySpentTime: translator(translations.settingsPanel.myDailySpentTime),
      myAllSpentTime: translator(translations.settingsPanel.myAllSpentTime),
      allSpentTimeAllUsers: translator(translations.settingsPanel.allSpentTimeAllUsers),
      countWorkingTimeOnlyInHours: translator(translations.settingsPanel.countWorkingTimeOnlyInHours),
      countWorkingTimeOnlyInDays: translator(translations.settingsPanel.countWorkingTimeOnlyInDays),
      monday: translator(translations.settingsPanel.monday),
      tuesday: translator(translations.settingsPanel.tuesday),
      wednesday: translator(translations.settingsPanel.wednesday),
      thursday: translator(translations.settingsPanel.thursday),
      friday: translator(translations.settingsPanel.friday),
      saturday: translator(translations.settingsPanel.saturday),
      sunday: translator(translations.settingsPanel.sunday),
      useJiraTimeUseTimezonetimeFromJira: translator(translations.settingsPanel.useJiraTimeUseTimezonetimeFromJira),
      startCountingTimeInLatestActiveTask: translator(translations.settingsPanel.startCountingTimeInLatestActiveTask),
      confirmAndSave: translator(translations.settingsPanel.confirmAndSave),
      resetToDefault: translator(translations.settingsPanel.resetToDefault),
      selectLanguage: translator(translations.i18nFeature.selectLanguage),
      from: translator(translations.settingsPanel.breakPicker.breakFrom),
      to: translator(translations.settingsPanel.breakPicker.breakTo),
      rem: translator(translations.settingsPanel.breakPicker.breakDelete),
      add: translator(translations.settingsPanel.breakPicker.breakAdd),
    };
  }, [translator]);

  /**
   * handleConfirmReset
   *
   * Update appStore with new settingsSlice from this component's State
   * (flush state) or reset Store.SettingsStep to default values
   * @param name
   */
  const handleConfirmReset = ({ currentTarget: { name } }: MouseEvent<HTMLButtonElement>) => {
    if (name === 'confirm' && isDefined(handleSave)) {
      handleSave(settings);
    } else if (name === 'reset' && isDefined(handleReset)) {
      handleReset();
    }
  };

  /**
   * handleSettingsChange
   *
   * Handler for all input:any with name matching to keys from SettingsInt
   * e.g. <input typeIdIn="checkbox" name="inDayMon"> <input typeIdIn="checkbox" name="inDayTue"> etc.
   *
   * @param name
   * @param value
   * @param type
   * @param checked
   */
  const handleSettingsChange = ({
    target: { name, value, type, checked },
  }: ChangeEvent<HTMLInputElement & { name: keyof SettingsInterface }>) => {
    if (name in settings) {
      updateSetting({ [name]: type === 'checkbox' ? checked : value });
    } else {
      console.error('Html input name does not match to state properties');
    }
  };

  /**
   * workingHoursPickerHandler
   *
   * @param name
   * @param value
   */
  const workingHoursPickerHandler = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    if (name in settings) {
      updateSetting({ [name]: parseTimePickerValue(value) });
    } else {
      console.error('Html input name does not match to state properties');
    }
  };

  /**
   * breakChangeHandler
   *
   * @param name
   * @param value
   * @param type
   * @param fromTo
   * @param key
   * @throws GeneralException
   */
  const breakChangeHandler = (
    { target: { name, value, type } }: ChangeEvent<HTMLInputElement>,
    fromTo: 'from' | 'to',
    key: number,
  ) => {
    if (!(key in settings.breaks)) {
      throw new GeneralException('Incorrect key');
    }

    const current = { ...settings.breaks[key] };

    const newBreaks = { ...settings.breaks };

    if (current) {
      current[fromTo === 'from' ? 0 : 1] = parseTimePickerValue(value);
      newBreaks[key] = current;
    }

    updateSetting({ breaks: newBreaks });
  };

  /**
   * breakDeleteHandler
   *
   * @param key
   * @throws GeneralException
   */
  const breakDeleteHandler = (key: number) => {
    if (!(key in settings.breaks)) {
      throw new GeneralException('Incorrect key');
    }

    const newBreaks = { ...settings.breaks };

    delete newBreaks[key];

    updateSetting({ breaks: newBreaks });
  };

  /**
   * breakAddHandler
   */
  const breakAddHandler = () => {
    const allKeys: number[] = Object.keys(settings.breaks).map(k => _.toInteger(k));

    const newBreaks = { ...settings.breaks };
    const nextKey = allKeys.length > 0 ? Math.max(...allKeys) + 1 : 1;
    newBreaks[nextKey] = [dayjsObj(defaultTimePickerDate), dayjsObj(defaultTimePickerDate)];

    updateSetting({ breaks: newBreaks });
  };

  /**
   * handleLanguageChange
   *
   * @param event
   */
  const handleLanguageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const language = event.target.value as LanguageKey;
    // noinspection JSIgnoredPromiseFromCall
    i18n.changeLanguage(language);
  };

  return (
    <Paper elevation={0} className={clsx(classes.settingsPaper)}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            {labels.settings}
          </Typography>
        </Grid>
      </Grid>
      <Grid className="settingsGrid" container spacing={3}>
        <Grid item xs={4}>
          <div>
            <label>
              <input
                type="checkbox"
                name="activeOnTop"
                checked={settings.activeOnTop}
                onChange={handleSettingsChange}
              />
              {labels.activeTaskAlwaysOnTtop}
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div>
            <label>
              <input
                type="radio"
                onChange={handleSettingsChange}
                checked={settings.dblClickDetails === DetailsOpts.SHOW_ON_DBL_CLICK}
                value={DetailsOpts.SHOW_ON_DBL_CLICK}
                name="dblClickDetails"
              />
              {labels.doubleClickShowsDetails}
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                onChange={handleSettingsChange}
                checked={settings.dblClickDetails === DetailsOpts.DONT_SHOW}
                value={DetailsOpts.DONT_SHOW}
                name="dblClickDetails"
              />
              {labels.donandapostShowDetailsAtAll}
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <label>{labels.startCountingTime}</label>
          <div>
            <label>
              <input
                type="radio"
                onChange={handleSettingsChange}
                checked={settings.countTimeAuto === TimeOpts.AUTO}
                value={TimeOpts.AUTO}
                name="countTimeAuto"
              />
              {labels.automatically}
              <b>[*2]</b>
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                onChange={handleSettingsChange}
                checked={settings.countTimeAuto === TimeOpts.MANUAL}
                value={TimeOpts.MANUAL}
                name="countTimeAuto"
              />
              {labels.manually}
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div>
            <div>
              <label>
                <input
                  type="radio"
                  onChange={handleSettingsChange}
                  checked={settings.timeSource === TimerSourceOpts.JIRA}
                  value={TimerSourceOpts.JIRA}
                  name="timeSource"
                />
                {labels.useJiraTime} <b>[*1]</b>
              </label>
            </div>
          </div>
          <label>
            <input
              type="radio"
              onChange={handleSettingsChange}
              checked={settings.timeSource === TimerSourceOpts.BROWSER}
              value={TimerSourceOpts.BROWSER}
              name="timeSource"
            />
            {labels.useMyBrowserTime}
          </label>
        </Grid>
        <Grid item xs={4}>
          <div>
            <label>
              {labels.refreshInEvery}
              <input
                value={settings.refreshInEvery}
                onChange={handleSettingsChange}
                name="refreshInEvery"
                type="text"
              />
              {labels.sec}
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <label>{labels.inTasksShowTimer}</label>
          <div>
            <label>
              <input
                type="checkbox"
                checked={settings.taskShowsMyDailyTime}
                onChange={handleSettingsChange}
                name="taskShowsMyDailyTime"
              />
              {labels.myDailySpentTime}
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={settings.taskShowsMyAllTime}
                onChange={handleSettingsChange}
                name="taskShowsMyAllTime"
              />
              {labels.myAllSpentTime}
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={settings.taskShowsAllPeoplesTime}
                onChange={handleSettingsChange}
                name="taskShowsAllPeoplesTime"
              />
              {labels.allSpentTimeAllUsers}
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div>
            <label>
              <input
                type="checkbox"
                checked={settings.countInSpecHours}
                name="countInSpecHours"
                onChange={handleSettingsChange}
              />
              {labels.countWorkingTimeOnlyInHours}
            </label>
          </div>
          <div>
            <label>
              from:
              <TimePickers
                onChangeHandler={workingHoursPickerHandler}
                name="countFromHour"
                disabled={!settings.countFromHour}
              />
            </label>
          </div>
          <div>
            <label>
              to:
              <TimePickers
                onChangeHandler={workingHoursPickerHandler}
                name="countToHour"
                disabled={!settings.countToHour}
              />
            </label>
          </div>
          <br />
          <BreaksPicker
            breaksList={settings.breaks}
            onChangeHandler={(e, fromTo, key) => breakChangeHandler(e, fromTo, key)}
            onDeleteHandler={key => breakDeleteHandler(key)}
            onAddHandler={breakAddHandler}
            disabled={!settings.countInSpecHours}
            labels={{
              from: labels.from,
              to: labels.to,
              add: labels.add,
              rem: labels.rem,
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <label>{labels.countWorkingTimeOnlyInDays}</label>
          <div className="days-group">
            <div>
              <label>
                <input type="checkbox" checked={settings.inDayMon} onChange={handleSettingsChange} name="inDayMon" />
                {labels.monday}
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" checked={settings.inDayTue} onChange={handleSettingsChange} name="inDayTue" />
                {labels.tuesday}
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" checked={settings.inDayWed} onChange={handleSettingsChange} name="inDayWed" />
                {labels.wednesday}
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" checked={settings.inDayThur} onChange={handleSettingsChange} name="inDayThur" />
                {labels.thursday}
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" checked={settings.inDayFrid} onChange={handleSettingsChange} name="inDayFrid" />
                {labels.friday}
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" checked={settings.inDaySat} onChange={handleSettingsChange} name="inDaySat" />
                {labels.saturday}
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" checked={settings.inDaySun} onChange={handleSettingsChange} name="inDaySun" />
                {labels.sunday}
              </label>
            </div>
          </div>
        </Grid>
        <Grid item xs={4}>
          <label>{labels.selectLanguage}</label>
          <br />
          <label>
            <input
              type="radio"
              onChange={handleLanguageChange}
              checked={i18n.language === 'en'}
              value="en"
              name="language"
            />
            English
          </label>
          <br />
          <label>
            <input
              type="radio"
              onChange={handleLanguageChange}
              checked={i18n.language === 'de'}
              value="de"
              name="language"
            />
            Deutsch
          </label>
          <br />
          <label>
            <input
              type="radio"
              onChange={handleLanguageChange}
              checked={i18n.language === 'pl'}
              value="pl"
              name="language"
            />
            Polski
          </label>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Alert severity="info">
            <b>[1]</b> {labels.useJiraTimeUseTimezonetimeFromJira}
            <br />
            <b>[2]</b> {labels.startCountingTimeInLatestActiveTask}
          </Alert>
        </Grid>
        <Grid item xs={12}>
          {showConfirmButton && (
            <Button variant="contained" name="confirm" color="primary" onClick={handleConfirmReset}>
              {labels.confirmAndSave}
            </Button>
          )}
          {showResetButton && (
            <Button
              variant="contained"
              name="reset"
              color="secondary"
              style={{ marginLeft: 10 }}
              onClick={handleConfirmReset}
            >
              {labels.resetToDefault}
            </Button>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

const SettingsForm = withStyles(useVirtualizedTableStyles)(SettingsComponent);

export default SettingsForm;
