import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

/**
 * filterFormStyles
 */
export const useFilterFormStyles = makeStyles((theme: Theme) =>
  createStyles({
    filtersRoot: {
      lineHeight: 2.5,
    },
    formRootLabel: {
      marginBottom: 30,
    },
    formControlLabel: {
      fontSize: 13,
      '& .MuiInputBase-input': {
        fontSize: 13,
      },
      '& .MuiIconButton-root': {
        padding: '5px !important',
      },
    },
  }),
);

/**
 * useMultiselectStyles
 */
export const useMultiselectStyles = makeStyles((theme: Theme) =>
  createStyles({
    selectedElement: {
      fontSize: 13,
    },
    formControl: {
      margin: 0,
      // margin: themeSlice.spacing(1),
      minWidth: 120,
      '& .MuiInputLabel-formControl': {
        fontSize: 14,
      },
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 1,
      height: 28,
      '& .MuiChip-label': {
        paddingRight: 8,
        paddingLeft: 8,
      },
    },
  }),
);

/**
 * useTimePickerStyles
 */
export const useTimePickerStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 160,
  },
}));
