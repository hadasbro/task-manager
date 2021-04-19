import TodoEntity from '../../models/entities/Todo';
import ReminderEntity from '../../models/entities/Reminder';
import { getRandomDate } from '../../functions/datetime/getRandomDate';
import { Dict } from '../../types/templates/Dict';

/**
 * defaultTodoList
 */
export const defaultTodoList: Dict<TodoEntity> = {
  todo1: {
    id: 'todo1',
    star: true,
    done: false,
    title: 'My example todo 1',
    description: 'Example todo description',
    added: getRandomDate(false, true),
    pinned: getRandomDate(true),
    tags: ['tasks-related', 'personal', 'high-priority', 'to-be-asap', 'major'],
  },
  todo2: {
    id: 'todo2',
    star: false,
    done: false,
    title: 'Another todo, another example',
    description: '',
    added: getRandomDate(false, true),
    pinned: getRandomDate(true),
    tags: ['personal', 'to-be-asap'],
  },
  todo3: {
    id: 'todo3',
    star: false,
    done: true,
    title: 'Third todo on the list',
    description: 'Some description of third todo on the list',
    added: getRandomDate(false, true),
    pinned: getRandomDate(true),
    tags: ['personal', 'high-priority'],
  },
  todo4: {
    id: 'todo4',
    star: false,
    done: false,
    title: 'Another todo on the list',
    description: 'Description for another todo on the list',
    added: getRandomDate(false, true),
    pinned: getRandomDate(true),
    tags: ['minor'],
  },
  todo5: {
    id: 'todo5',
    star: false,
    done: false,
    title: 'One more thing I plan to do, my todo',
    description: '',
    added: getRandomDate(false, true),
    pinned: getRandomDate(true),
    tags: ['tasks-related', 'personal', 'major'],
  },
  todo6: {
    id: 'todo6',
    star: false,
    done: true,
    title: 'The almost last todo on the list',
    description: '',
    added: getRandomDate(false, true),
    pinned: getRandomDate(true),
    tags: [],
  },
  todo7: {
    id: 'todo7',
    star: false,
    done: true,
    title: 'Todo nr 7, example thing to do',
    description: '',
    added: getRandomDate(false, true),
    pinned: getRandomDate(true),
    tags: ['minor'],
  },
  todo8: {
    id: 'todo8',
    star: false,
    done: true,
    title: 'One more example of Todo element',
    description: 'This is sample todo element',
    added: getRandomDate(false, true),
    pinned: getRandomDate(true),
    tags: [],
  },
};
