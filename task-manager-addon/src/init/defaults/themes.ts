import { Dict } from '../../types/templates/Dict';
import { Theme } from '../enums/appearance/Theme';

/**
 * themes
 */
export const themes: Dict<Theme> = {
  thdefaut: {
    id: 'thdefaut',
    name: 'Theme Default',
    descr: 'Default style theme',
    firstColor: 'red',
    secondColor: 'green',
    thirdColor: 'blue',
  },
  blue: {
    id: 'blue',
    name: 'Theme Blue',
    descr: 'Blue style theme',
    firstColor: 'red',
    secondColor: 'green',
    thirdColor: 'blue',
  },
  fancy: {
    id: 'fancy',
    name: 'Theme Fancy',
    descr: 'Fancy style theme',
    firstColor: 'red',
    secondColor: 'green',
    thirdColor: 'blue',
  },
};
