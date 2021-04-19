import { Dict } from '../../templates/Dict';
import { DetailsOpts } from '../../../init/enums/settings/DetailsOpts';
import { TimeOpts } from '../../../init/enums/settings/TimeOpts';
import { TimerSourceOpts } from '../../../init/enums/settings/TimerSourceOpts';
import { ListBlocksOpts } from '../../../init/enums/settings/ListBlocksOpts';
import { DayjsObj } from '../datetime/DayjsObj';

/**
 * SettingsStep interface
 */
export interface SettingsInterface {
  activeOnTop: boolean;
  dblClickDetails: DetailsOpts;
  countInSpecHours: boolean;
  countFromHour: DayjsObj;
  countToHour: DayjsObj;
  breaks: Dict<[DayjsObj, DayjsObj], number>;
  inDayMon: boolean;
  inDayTue: boolean;
  inDayWed: boolean;
  inDayThur: boolean;
  inDayFrid: boolean;
  inDaySat: boolean;
  inDaySun: boolean;
  countTimeAuto: TimeOpts;
  timeSource: TimerSourceOpts;
  refreshInEvery: number;
  taskShowsMyDailyTime: boolean;
  taskShowsMyAllTime: boolean;
  taskShowsAllPeoplesTime: boolean;
  largeFonts: boolean;
  showDescription: boolean;
  listBlock: ListBlocksOpts;
}
