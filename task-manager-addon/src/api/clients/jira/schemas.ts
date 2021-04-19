/* eslint-disable object-shorthand */
import _ from 'lodash';
import { schema } from 'normalizr';
import TaskEntity, { SubTaskEntity } from '../../../models/entities/Task';
import ProjectEntity from '../../../models/entities/Project';
import TypeEntity from '../../../models/entities/Type';
import PriorityEntity from '../../../models/entities/Priority';
import StatusEntity from '../../../models/entities/Status';
import UserEntity from '../../../models/entities/User';
import WorklogEntity from '../../../models/entities/Worklog';
import ActivityEntity from '../../../models/entities/Activity';
import { reFormatTime } from '../../../extensions/dayjs';
import { randHex } from '../../../functions/general/randHex';
import { isNotEmpty } from '../../../types/guards/general/isNotEmpty';
import { isDefined } from '../../../types/guards/general/isDefined';

export const projectSchemaKey = Symbol.for('projectSchemaKey');
export const typeSchemaKey = Symbol.for('typeSchemaKey');
export const statusSchemaKey = Symbol.for('statusSchemaKey');
export const prioritySchemaKey = Symbol.for('prioritySchemaKey');
export const subtaskSchemaKey = Symbol.for('subtaskSchemaKey');
export const issueSchemakey = Symbol.for('issueSchemakey');

/**
 * jiraLink
 *
 * @param url
 * @param key
 */
export const jiraLink = (url: string, key: string) => {
  const jiraBase = url.substr(0, url.indexOf('/rest/api'));
  return `${jiraBase}/browse/${key}`;
};

/**
 * jiraUserLink
 *
 * @param url
 * @param userId
 */
export const jiraUserLink = (url: string, userId: string) => {
  const jiraBase = url.substr(0, url.indexOf('/rest/api'));
  return `${jiraBase}/jira/people/${userId}`;
};

/**
 * projectSchema
 */
export const projectSchema = new schema.Entity<ProjectEntity>(
  'projects',
  {},
  {
    processStrategy: value => {
      return {
        avatarUrl: value.avatarUrls['48x48'] || '',
        id: value.id,
        name: value.name,
        url: jiraLink(value.self, value.key),
      };
    },
  },
);

/**
 * typeSchema
 */
export const typeSchema = new schema.Entity<TypeEntity>(
  'types',
  {},
  {
    processStrategy: value => {
      return {
        id: value.id,
        description: value.description,
        iconUrl: value.iconUrl,
        name: value.name,
      };
    },
  },
);

/**
 * statusSchema
 */
export const statusSchema = new schema.Entity<StatusEntity>(
  'statuses',
  {},
  {
    processStrategy: value => {
      const {
        description,
        iconUrl,
        id,
        name,
        statusCategory: {
          colorName: statusCategoryColor,
          key: statusCategoryKey,
          name: statusCategoryName,
          id: statusCategoryId,
        },
      } = value;

      return {
        id,
        name,
        description,
        iconUrl,
        statusCategoryColor,
        statusCategoryKey,
        statusCategoryName,
        statusCategoryId,
      };
    },
  },
);

/**
 * prioritySchema
 */
export const prioritySchema = new schema.Entity<PriorityEntity>(
  'priorities',
  {},
  {
    processStrategy: value => {
      return {
        description: value.name,
        iconUrl: value.iconUrl,
        id: value.id,
        name: value.name,
        priority: _.toInteger(value.id),
      };
    },
  },
);

/**
 * userSchema
 */
export const userSchema = new schema.Entity<UserEntity>(
  'users',
  {},
  {
    idAttribute: value => value.accountId,
    processStrategy: value => {
      return {
        id: value.accountId,
        accountId: value.accountId,
        active: value.active,
        avatarUrl: value.avatarUrls['48x48'] || '',
        displayName: value.displayName,
        emailAddress: value.emailAddress,
        accountType: value.accountType,
        url: jiraLink(value.self, value.key),
      };
    },
  },
);

/**
 * subtaskSchema
 */
export const subtaskSchema = new schema.Entity<SubTaskEntity>(
  'subtasks',
  {
    typeId: typeSchema,
    statusId: statusSchema,
    priorityId: prioritySchema,
  },
  {
    idAttribute: value => `${value.id}-sub`,
    processStrategy: value => {
      const {
        id,
        self,
        key,
        fields: { summary, description, issuetype, status, priority },
      } = value;

      // @ts-ignore
      // FIXME it has to be improved not ignored but atm (01:07, friday :P) I'm a bit tired and dont have idea how to do that
      // the problem is that TaskEntity.projectId is supposed to be [string] and after deserialization via serializr
      // it will be [string] indeed so all OK, but here, from TS perspective, on compile time it is typed as JiraProject

      return {
        url: jiraLink(self, key),
        id,
        key,
        description,
        name: summary,
        typeId: issuetype,
        statusId: status,
        priorityId: priority,
      } as SubTaskEntity;
    },
  },
);

/**
 * issueSchema
 */
export const issueSchema = new schema.Entity<TaskEntity>(
  'issues',
  {
    typeId: typeSchema,
    projectId: projectSchema,
    statusId: statusSchema,
    priorityId: prioritySchema,
    subtasksIds: [subtaskSchema],
  },
  {
    processStrategy: value => {
      const { accountId: assigneeId, displayName: assigneeName } = value.fields.assignee || {};

      const {
        self,
        key,
        id,
        fields: {
          reporter: { accountId: reporterId, displayName: reporteName },
          creator: { accountId: creatorId, displayName: creatorName },
          summary,
          description,
          created,
          updated,
          issuetype,
          project,
          status,
          priority,
          subtasks,
        },
      } = value;

      // @ts-ignore
      return {
        // related entities
        typeId: issuetype,
        projectId: project,
        statusId: status,
        priorityId: priority,
        subtasksIds: subtasks,

        authorId: creatorId,
        authorName: creatorName,
        reporterId: reporterId,
        reporterName: reporteName,
        assigneeId: assigneeId || null,
        assigneeName: assigneeName || null,

        id,
        key,
        description,
        name: summary,
        url: jiraLink(self, key),
        created: created,
        updated: updated,
        observerIds: [], // TODO
        timeTodayUser: 0, // TODO
        timeAllUser: 0, // TODO
        timeTodayAll: 0, // TODO
        timeAllAll: 0, // TODO
      } as TaskEntity;
    },
  },
);

/**
 * changelogSchema
 */
export const changelogSchema = new schema.Entity<ActivityEntity[]>(
  'issues',
  {},
  {
    idAttribute: value => value.key,
    processStrategy: value => {
      const { self, key, changelog, id } = value;

      if (isNotEmpty(changelog)) {
        // history per day/hour/time
        const histories = changelog!.histories
          .map(wl => {
            return wl.items.map(item => {
              return {
                fkey: `${item.fieldId}@${randHex()}`,
                taskId: id,
                userId: wl.author.accountId,
                description: '',
                time: reFormatTime(wl.created),
                created: wl.created,
                createdTimestamp: reFormatTime(wl.created, 'X'),
                userName: wl.author.displayName,
                avatarUrl: wl.author.avatarUrls['48x48'] || '',
                userLink: jiraUserLink(self, wl.author.accountId),
                taskLink: jiraLink(self, key),
                taskKey: key,
                update: item,
              } as ActivityEntity;
            });
          })
          .reduce((acc, it) => {
            return [...acc, ...it];
          }, []);

        // order by date desc
        histories.sort((el1, el2) => {
          const time1 = reFormatTime(el1.created, 'X');
          const time2 = reFormatTime(el2.created, 'X');
          return time1 > time2 ? -1 : 1;
        });

        return histories;
      }

      return [];
    },
  },
);

/**
 * worklogSchema
 */
export const worklogSchema = new schema.Entity<WorklogEntity[]>(
  'worklogs',
  {},
  {
    processStrategy: value => {
      const {
        self,
        key,
        id,
        fields: { worklog },
      } = value;

      if (isDefined(worklog)) {
        const allWorkLogs = worklog.worklogs
          .map(wl => {
            return {
              taskId: id,
              taskKey: key,
              worklogId: wl.id,
              userId: wl.author.accountId,
              userName: wl.author.displayName,
              avatarUrl: wl.author.avatarUrls['48x48'] || '',
              userLink: jiraUserLink(self, wl.author.accountId),
              taskLink: jiraLink(self, key),
              time: wl.updated,
              timeSpentSeconds: _.toInteger(wl.timeSpentSeconds),
              updated: wl.updated,
            };
          })
          .reduce((acc, it) => {
            acc.push(it);
            return acc;
          }, [] as WorklogEntity[]);

        return allWorkLogs;
      }

      return [];
    },
  },
);
