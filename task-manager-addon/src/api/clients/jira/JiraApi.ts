import { Client } from 'jira.js';
import _ from 'lodash';
import { normalize } from 'normalizr';
import {
  changelogSchema,
  issueSchema,
  prioritySchema,
  projectSchema,
  statusSchema,
  typeSchema,
  userSchema,
  worklogSchema,
} from './schemas';
import { TasksFilter } from '../../apiTypes';
import WorklogEntity from '../../../models/entities/Worklog';
import { dayjsFormat, reFormatTime } from '../../../extensions/dayjs';
import { Nullable } from '../../../types/templates/Nullable';
import PeopleFilter from '../../../types/interfaces/objects/PeopleFilter';
import { isNotEmpty } from '../../../types/guards/general/isNotEmpty';
import { isDefined } from '../../../types/guards/general/isDefined';
import { OptionalObj } from '../../../types/templates/OptionalObj';
import ApiConfigInterface from '../../../types/interfaces/objects/Config';
import { Dict } from '../../../types/templates/Dict';
import { TasksOrders } from '../../../types/interfaces/listings/TasksOrders';
import { EntityID } from '../../../types/interfaces/global/EntityID';
import { DayjsObj } from '../../../types/interfaces/datetime/DayjsObj';

/**
 * JiraApi
 */
export default class JiraApi {
  private client: Client;

  private static config = {
    worklogWeeksBehind: '-3y', // '-3w',
    activityWeeksBehind: '-3y', // '-3w',
  };

  /**
   * taskSearchCriteria
   */
  protected activitySearchCriteria: Dict<any> = {
    expand: ['changelog'],
    validateQuery: 'none',
    fieldsByKeys: false,
    fields: ['changelog'],
  };

  /**
   * worklogSearchCriteria
   *
   * @protected
   */
  protected worklogSearchCriteria: Dict<any> = {
    expand: ['worklog'],
    validateQuery: 'none',
    fieldsByKeys: false,
    fields: ['self', 'key', 'id', 'worklog'],
  };

  /**
   * taskSearchCriteria
   */
  protected taskSearchCriteria: Dict<any> = {
    maxResults: 500,
    validateQuery: 'none',
    fieldsByKeys: false,
    fields: [
      'self',
      'key',
      'id',
      'assignee',
      'reporter',
      'creator',
      'summary',
      'description',
      'created',
      'updated',
      'issuetype',
      'project',
      'status',
      'priority',
      'subtasks',
      'history',
      'changelog',
    ],
    startAt: 0,
  };

  /**
   * taskCountCriteria
   */
  protected taskCountCriteria: Dict<any> = {
    expand: ['names'],
    maxResults: 0,
    validateQuery: 'none',
    fieldsByKeys: false,
    fields: ['id'],
    startAt: 0,
  };

  /**
   * services - requests to JIRA API
   */
  public services = {
    issueType: {
      getAll: () => {
        return this.client.issueTypes
          .getAllIssueTypesForUser()
          .then(res => normalize(res, [typeSchema]).entities.types! || {});
      },

      getOne: (id: EntityID) => {
        return this.client.issueTypes.getIssueType({ id: id.toString() }).then(res => {
          const elements = Object.values(normalize(res, typeSchema).entities.types! || {});
          return elements.length > 0 ? [...elements].shift()! : null;
        });
      },

      countAll: () => {
        return this.services.issueType.getAll().then(res => Object.keys(res).length);
      },
    },

    priority: {
      getAll: () => {
        return this.client.issuePriorities
          .getPriorities()
          .then(res => normalize(res, [prioritySchema]).entities.priorities! || {});
      },

      getOne: (id: EntityID) => {
        return this.services.priority
          .getAll()
          .then(pr => Object.values(pr))
          .then(pr => pr.filter(priority => _.toInteger(priority.id) === _.toInteger(id as string)))
          .then(pr => [...pr].shift()!);
      },

      countAll: () => {
        return this.services.priority.getAll().then(res => Object.keys(res).length);
      },
    },

    status: {
      getAll: () => {
        return this.client.workflowStatuses
          .getAllStatuses()
          .then(res => normalize(res, [statusSchema]).entities.statuses! || {});
      },

      getOne: (id: EntityID) => {
        return this.client.workflowStatuses
          .getStatus({
            idOrName: id.toString(),
          })
          .then(res => {
            const elements = Object.values(normalize(res, statusSchema).entities.statuses! || {});
            return elements.length > 0 ? [...elements].shift()! : null;
          });
      },

      countAll: () => {
        return this.services.status.getAll().then(res => Object.keys(res).length);
      },
    },

    project: {
      getAll: () => {
        return this.client.projects
          .getAllProjects()
          .then(res => normalize(res, [projectSchema]).entities.projects! || {});
      },

      getOne: (id: EntityID) => {
        return this.client.projects
          .getProject({
            projectIdOrKey: id.toString(),
          })
          .then(res => {
            const elements = Object.values(normalize(res, projectSchema).entities.projects! || {});
            return elements.length > 0 ? [...elements].shift()! : null;
          });
      },

      countAll: () => {
        return this.services.project.getAll().then(res => Object.keys(res).length);
      },
    },

    tasks: {
      getAll: () => {
        return this.client.issueSearch
          .searchForIssuesUsingJqlPost({
            ...this.taskSearchCriteria,
            jql: 'order by lastViewed Desc',
          })
          .then(res => normalize(res, { issues: [issueSchema] }).entities.issues! || {});
      },

      getOne: (id: EntityID) => {
        return this.client.issue
          .getIssue({
            issueIdOrKey: id.toString(),
          })
          .then(res => {
            const elements = Object.values(normalize(res, issueSchema).entities.issues! || {});
            return elements.length > 0 ? [...elements].shift()! : null;
          });
      },

      countAll: () => {
        return this.client.issueSearch
          .searchForIssuesUsingJqlPost({
            ...this.taskCountCriteria,
            jql: 'order by lastViewed Desc',
          })
          .then(res => _.toInteger(res.total));
      },

      getFiltered: (filter: TasksFilter) => {
        return this.client.issueSearch
          .searchForIssuesUsingJqlPost({ ...this.taskSearchCriteria, jql: JiraApi.filterToJql(filter) })
          .then(res => normalize(res, { issues: [issueSchema] }).entities.issues! || {});
      },

      countFiltered: (filter: TasksFilter) => {
        return this.client.issueSearch
          .searchForIssuesUsingJqlPost({ ...this.taskCountCriteria, jql: JiraApi.filterToJql(filter) })
          .then(res => _.toInteger(res.total));
      },
    },

    users: {
      getAll: () => {
        return this.client.userSearch.findUsers().then(res => normalize(res, [userSchema]).entities.users! || {});
      },

      getOne: (id: EntityID) => {
        return this.client.userSearch
          .findUsers({
            accountId: id,
            maxResults: 1,
          })
          .then(res => normalize(res, [userSchema]).entities.users! || {})
          .then(res => {
            if (Object.values(res).length) {
              return Object.values(res)[0];
            }

            return null;
          });
      },

      countAll: () => {
        return this.client.userSearch
          .findUsers({
            query: '',
            maxResults: 300,
          })
          .then(res => Object.keys(res).length);
      },

      getFiltered: (filter: Nullable<PeopleFilter>, page?: number) => {
        let filterQuery;

        if (!filter) {
          filterQuery = { query: '' };
        } else if (isNotEmpty(filter.userName)) {
          filterQuery = { query: filter.userName };
        } else if (isNotEmpty(filter.userId)) {
          filterQuery = { accountId: filter.userId };
        } else {
          filterQuery = { query: '' };
        }

        const pageSize = 30;

        const start = isNotEmpty(page) ? (page - 1) * pageSize : 1;

        const startStopJql = {
          startAt: start,
          maxResults: pageSize,
        };

        return this.client.userSearch
          .findUsers({
            ...filterQuery,
            ...startStopJql,
          })
          .then(res => normalize(res, [userSchema]).entities.users! || {});
      },
    },
    worklogs: {
      getAll: () => {
        return Promise.resolve([]);
      },

      getOne: (id: EntityID) => {
        return Promise.resolve(null);
      },

      countAll: () => {
        return Promise.resolve(0);
      },

      getFiltered: (userId?: Nullable<string>, day?: Nullable<OptionalObj<DayjsObj>>, page?: number) => {
        const userFilter = isDefined(userId) && !_.isEmpty(userId);

        const dateFilter = isDefined(day) && !_.isEmpty(day);

        const filterAuthorJql = userFilter ? `worklogAuthor = "${userId}" && ` : '';

        const filterDayrJql = dateFilter
          ? `worklogDate = "${dayjsFormat(day!, 'YYYY-MM-DD')}" && `
          : `worklogDate > startOfWeek(${JiraApi.config.worklogWeeksBehind}) && `;

        const filterJql = `${filterAuthorJql}${filterDayrJql}worklogAuthor is NOT EMPTY ORDER BY updatedDate DESC`;

        const pageSize = 30;

        const start = isNotEmpty(page) ? (page - 1) * pageSize : 1;

        const startStopJql = {
          startAt: start,
          maxResults: pageSize,
        };

        const allWorklogs = this.client.issueSearch
          .searchForIssuesUsingJqlPost({
            ...this.worklogSearchCriteria,
            ...startStopJql,
            jql: filterJql,
          })
          .then(res => normalize(res, { issues: [worklogSchema] }).entities.worklogs! || {})
          .then(res => {
            if (_.isEmpty(res)) {
              return [];
            }
            return Object.values(res || [])
              .reduce((acc, it) => {
                return [...acc, ...it];
              }, [] as WorklogEntity[])
              .filter(wl => {
                if (userFilter) {
                  return wl.userId === userId;
                }

                return true;
              })
              .sort((wl1, wl2) => {
                return reFormatTime(wl1.updated, 'X') > reFormatTime(wl2.updated, 'X') ? -1 : 1;
              })
              .filter(wl => {
                if (dateFilter) {
                  // because we cannot search worklogs directly but only tasks with worklogs
                  // matching to our criteria and then we can take all workglogs from them, so
                  // we search and limits tasks, then we take worklogs and we need to filter
                  // and limits worklogs as well
                  return reFormatTime(wl.updated, 'YYYY-MM-DD') === dayjsFormat(day!, 'YYYY-MM-DD');
                }

                return true;
              });
          });

        return allWorklogs;
      },
    },

    activities: {
      getAll: () => {
        return Promise.resolve([]);
      },

      getOne: (id: EntityID) => {
        return Promise.resolve(null);
      },

      countAll: () => {
        return Promise.resolve(0);
      },

      /**
       * getFiltered
       *
       * @param userId
       * @param page
       */
      getFiltered: (userId?: Nullable<string>, page?: number) => {
        const userFilter = isDefined(userId) && !_.isEmpty(userId);
        const filterDayrJql = userFilter
          ? `issuekey IN updatedBy("${userId}", "${JiraApi.config.activityWeeksBehind}")`
          : '';

        const filterJql = `${filterDayrJql}ORDER BY updatedDate DESC`;

        const pageSize = 30;

        const start = isNotEmpty(page) ? (page - 1) * pageSize : 1;

        const startStopJql = {
          startAt: start,
          maxResults: pageSize,
        };

        return this.client.issueSearch
          .searchForIssuesUsingJqlPost({ ...this.activitySearchCriteria, ...startStopJql, jql: filterJql })
          .then(res => {
            const norm = normalize(res, { issues: [changelogSchema] }).entities.issues! || {};

            return Object.values(norm || [])
              .reduce((acc, it) => {
                return [...acc, ...it];
              }, [])
              .sort((ac1, ac2) => {
                return reFormatTime(ac1.createdTimestamp, 'X') > reFormatTime(ac2.createdTimestamp, 'X') ? -1 : 1;
              })
              .slice(0, 20);
          });
      },
    },
  };

  /**
   * filterToJql
   *
   * @param filter
   * @protected
   */
  public static filterToJql(filter: TasksFilter) {
    const conditions: string[] = [];
    let jql: string = '';

    if (filter.priorityIdIn.length) {
      conditions.push(`project IN (${filter.priorityIdIn.join(',')})`);
    }

    if (filter.assigneeIdIs) {
      conditions.push(`assignee = ${filter.assigneeIdIs}`);
    }

    if (filter.observerIdIs) {
      conditions.push(`watcher = ${filter.observerIdIs}`);
    }

    if (filter.reporterIdIs) {
      conditions.push(`reporter = ${filter.reporterIdIs}`);
    }

    if (filter.typeIdIn.length) {
      conditions.push(`type IN (${filter.typeIdIn.join(',')})`);
    }

    if (filter.priorityIdIn.length) {
      conditions.push(`priority IN (${filter.priorityIdIn.join(',')})`);
    }

    if (filter.statusIdIn.length) {
      conditions.push(`priority IN (${filter.statusIdIn.join(',')})`);
    }

    if (filter.search) {
      conditions.push(`summary ~ "${filter.search}"`);
    }

    // if (filter.lastActivityAllSince) {
    //   conditions.push(`updatedDate > "${dayjsFormat(filter.lastActivityAllSince)}"`);
    // }
    //
    // // TODO
    // if (filter.lastActivityUserSince) {
    //   conditions.push(`updatedDate > "${dayjsFormat(filter.lastActivityUserSince)}"`);
    // }

    if (conditions.length) {
      jql = conditions.join(' AND ');
    }

    switch (filter.orderBy) {
      case TasksOrders.Unspecified:
        break;
      case TasksOrders.LastActivityAsc:
        jql += 'ORDER BY updated Asc';
        break;
      case TasksOrders.LastActivityDesc:
        jql += 'ORDER BY updated Desc';
        break;
      case TasksOrders.MyLastActivityAsc:
        jql += 'ORDER BY lastViewed Asc';
        break;
      case TasksOrders.MyLastActivityDesc:
        jql += 'ORDER BY lastViewed Desc';
        break;
      case TasksOrders.PriorityAsc:
        jql += 'ORDER BY priority Asc';
        break;
      case TasksOrders.PriorityDesc:
        jql += 'ORDER BY priority Desc';
        break;
    }

    return jql;
  }

  /**
   * constructor
   */
  constructor(config: ApiConfigInterface) {
    const { apiUrl, apiToken, userId } = config.apiCredentials;

    this.client = new Client({
      host: apiUrl,
      strictGDPR: true,
      baseRequestConfig: {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'X-Atlassian-Token': 'no-check',
        },
      },
      authentication: {
        basic: {
          username: userId,
          apiToken,
        },
      },
    });
  }
}
