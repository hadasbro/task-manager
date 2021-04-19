import WorklogEntity from '../../../models/entities/Worklog';
import { Dict } from '../../templates/Dict';

/**
 * WorklogUser
 */
export type WorklogUser = {
  userId: string;
  userName: string;
  worklogs: WorklogEntity[];
};

/**
 * WorklogByUser
 * {
 *   userId: WorklogUser,
 *   userId2: WorklogUser
 * }
 */
export type WorklogByUser = Dict<WorklogUser>;

/**
 * WorklogByUserArray
 */
export type WorklogByUserArray = Array<WorklogUser>;
