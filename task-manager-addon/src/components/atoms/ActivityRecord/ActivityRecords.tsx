import React, { FC, useMemo } from 'react';
import _ from 'lodash';
import { Chip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ActivityEntity from '../../../models/entities/Activity';
import { useTLineStyles } from '../../../styles/styles/modules';
import { translations } from '../../../locales/i18n';
import { useInterpolator } from '../../../hooks/content/useInterpolator';

/**
 * ActivityRecord
 *
 * @param activity
 * @constructor
 */
const ActivityRecord: FC<ActivityEntity> = activity => {
  const classes2 = useTLineStyles();

  const { t: translator } = useTranslation();

  const labels = useMemo(() => {
    return {
      assignee: translator(translations.activity.assignee),
      attachment: translator(translations.activity.attachment),
      category: translator(translations.activity.category),
      comment: translator(translations.activity.comment),
      status: translator(translations.activity.status),
      labels: translator(translations.activity.labels),
      description: translator(translations.activity.description),
      timeestimate: translator(translations.activity.timeestimate),
      timeoriginalestimate: translator(translations.activity.timeestimate),
      timespent: translator(translations.activity.timespent),
      worklogid: translator(translations.activity.worklogid),
      summary: translator(translations.activity.summary),
      priority: translator(translations.activity.priority),
      reporter: translator(translations.activity.reporter),
      type: translator(translations.activity.type),
      watchers: translator(translations.activity.watchers),
      watcher: translator(translations.activity.watcher),
      workflow: translator(translations.activity.workflow),
      link: translator(translations.activity.link),
      resolution: translator(translations.activity.resolution),
      general: translator(translations.activity.general),
    };
  }, [translator]);

  const interpolate = useInterpolator([activity.fkey, translator]);

  const acField = activity.update.field;

  const descr = _.get(labels, acField ? acField.toLowerCase() : acField) || labels.general;

  const descrInterpolated = interpolate(descr, {
    task: () => {
      return (
        <a href={activity.taskLink} target="_blank">
          {`${activity.taskKey.toUpperCase()} `}
        </a>
      );
    },
    user: () => {
      return <b key={`${Math.random()}x`}>{activity.userName}</b>;
    },
    from: () => {
      return (
        <Chip
          variant="outlined"
          size="small"
          label={!_.isEmpty(activity.update.fromString) ? activity.update.fromString : '-'}
        />
      );
    },
    to: () => {
      return (
        <Chip
          size="small"
          variant="outlined"
          color={activity.update.field === 'status' ? 'secondary' : 'primary'}
          label={!_.isEmpty(activity.update.toString) ? activity.update.toString : '-'}
        />
      );
    },
  });

  return <div className={classes2.activityElement}>{descrInterpolated}</div>;
};

export default ActivityRecord;
