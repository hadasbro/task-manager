import ReminderEntity from '../../models/entities/Reminder';
import { getRandomDate } from '../../functions/datetime/getRandomDate';
import { Dict } from '../../types/templates/Dict';

/**
 * defaultRemindersList
 */
export const defaultRemindersList: Dict<ReminderEntity> = {
  reminder1: {
    id: 'reminder1',
    done: true,
    title: 'Reminder 1 example',
    added: getRandomDate(false, true),
    pinned: getRandomDate(true),
    ringing: false,
  },
  reminder2: {
    id: 'reminder2',
    done: false,
    title: 'Another reminder on the list',
    added: getRandomDate(false, false),
    pinned: getRandomDate(),
    ringing: false,
  },
  reminder3: {
    id: 'reminder3',
    done: false,
    title: 'One more test reminder from the list',
    added: getRandomDate(false, true),
    pinned: getRandomDate(),
    ringing: false,
  },
  reminder4: {
    id: 'reminder4',
    done: false,
    title: 'My test reminder about important things to do',
    added: getRandomDate(false, true),
    pinned: getRandomDate(),
    ringing: false,
  },
  reminder5: {
    id: 'reminder5',
    done: false,
    title: 'Something important to remember',
    added: getRandomDate(false, false),
    pinned: getRandomDate(),
    ringing: false,
  },
  reminder6: {
    id: 'reminder6',
    done: false,
    title: 'My test reminder 6',
    added: getRandomDate(false, false),
    pinned: getRandomDate(),
    ringing: false,
  },
};
