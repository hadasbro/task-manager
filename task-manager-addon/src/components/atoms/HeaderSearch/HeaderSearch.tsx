import React, { ChangeEvent, FC } from 'react';
import { updateTasksFiltersSagaAction } from 'store/saga/actionEffects/tasks/updateTasksFiltersSaga';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { useDispatch } from 'react-redux';
import { useSearchBarStyles } from '../../../styles/styles/app';
import FilterOrder from '../../../types/interfaces/objects/FilterOrder';

/**
 * HeaderSearch
 *
 * @constructor
 */
const HeaderSearch: FC = () => {
  const dispatch = useDispatch();

  const classes = useSearchBarStyles();

  /**
   * handleSearch
   *
   * @param name
   * @param value
   */
  const handleSearch = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    const order: Partial<FilterOrder> = {
      [name]: value.trim(),
    };

    dispatch(updateTasksFiltersSagaAction(order));
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleSearch}
        name="search"
      />
    </div>
  );
};

export default HeaderSearch;
