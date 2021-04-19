import { OptionalObj } from '../../../types/templates/OptionalObj';

/**
 * BuilderOptions
 */
export type BuilderOptions = OptionalObj<{
  search: boolean;
  tags: boolean;
  starred: boolean;
  pinnedTd: boolean;
  markedDone: boolean;
  sorter: boolean;
}>;
