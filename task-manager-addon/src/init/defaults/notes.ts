import NoteEntity from '../../models/entities/Note';
import { getRandomDate } from '../../functions/datetime/getRandomDate';
import { Dict } from '../../types/templates/Dict';

/**
 * defaultNotesList
 */
export const defaultNotesList: Dict<NoteEntity> = {
  note1: {
    id: 'note1',
    star: false,
    done: false,
    title: 'My example note 1',
    description: 'Example notes description',
    added: getRandomDate(false, true),
    tags: ['tasks-related', 'personal', 'high-priority'],
  },
  note2: {
    id: 'note2',
    star: false,
    done: false,
    title: 'Another note, another example',
    description: '',
    added: getRandomDate(false, true),
    tags: ['personal', 'major'],
  },
  note3: {
    id: 'note3',
    star: true,
    done: false,
    title: 'Third note on the list',
    description: 'Some description of third note on the list',
    added: getRandomDate(false, true),
    tags: [],
  },
  note4: {
    id: 'note4',
    star: true,
    done: false,
    title: 'Another note on the list',
    description: 'Description for another note on the list',
    added: getRandomDate(false, true),
    tags: ['minor'],
  },
  note5: {
    id: 'note5',
    star: false,
    done: false,
    title: 'One more thing I wanted to be noted, one more note',
    description: '',
    added: getRandomDate(false, true),
    tags: ['high-priority', 'personal'],
  },
};
