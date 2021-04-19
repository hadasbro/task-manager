import { makeStyles } from '@material-ui/core/styles';

export const useActivityModStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    marginTop: '25px',
    '& .MuiListItemText-primary': {
      fontSize: '13px',
    },
  },
  inline: {
    display: 'inline',
  },
}));
