import React, { ChangeEvent, FC } from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useSearchTodoStyles } from '../../../styles/styles/modules';
import { Nullable } from '../../../types/templates/Nullable';

type SearchBoxProps = {
  value?: Nullable<string>;
  handleSearch?: (value: Nullable<string>) => void;
};

/**
 * SearchBox
 *
 * @constructor
 */
const SearchBox: FC<SearchBoxProps> = ({ value = null, handleSearch = () => {} }) => {
  const classes = useSearchTodoStyles();

  /**
   * handleChange
   *
   * @param name
   * @param value
   */
  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    handleSearch(value);
  };

  return (
    <Paper component="form" className={classes.root}>
      <IconButton type="submit" className={classes.iconButton}>
        <SearchIcon />
      </IconButton>
      <InputBase className={classes.input} placeholder="Search" onChange={handleChange} value={value || ''} />
    </Paper>
  );
};

export default SearchBox;
