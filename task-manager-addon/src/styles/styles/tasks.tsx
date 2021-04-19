import makeStyles from '@material-ui/core/styles/makeStyles';
import { createStyles, Theme } from '@material-ui/core/styles';

/**
 * useActiveTaskStyles
 */
export const useActiveTaskStyles = makeStyles((theme: Theme) =>
  createStyles({
    activeTaskWrapper: {
      flexGrow: 1,
      width: '100%',
      padding: 8,
      background: '#AEDDFF',
      marginTop: 8,
      marginBottom: 8,
      verticalAlign: 'middle',
      fontSize: 13,
      '& *': {
        alignItems: 'center',
      },
    },
    myTodoWrapper: {
      flexGrow: 1,
      // marginRight:2,
      marginLeft: 3,
      // background: '#AEDDFF',
      background: '#B7E3A7',
      marginTop: 8,
      marginBottom: 8,
      verticalAlign: 'middle',
      fontSize: 13,

      // padding: 8,
      // height: '51px',
      // border: 'solid 1px rgb(225,225,225)',
      // boxShadow: 'none',

      // border: 'solid 1px rgb(215,215,215)',
      // borderBottom: 'solid 1px rgb(205,205,205)',
      height: '51px',
      padding: '8px',
      // boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.01), 0px 1px 1px 0px rgba(0,0,0,0.01), 0px 1px 3px 0px rgba(0,0,0,0.08)',

      '& *': {
        alignItems: 'center',
      },
      '& .MuiBadge-badge': {
        marginTop: 8,
        background: 'rgb(230,230,230)',
        // background: 'white',
        color: 'black',
      },
      '& .myTodoInner': {
        marginTop: 6,
      },
    },
    activeTaskTextBox: {
      fontSize: 12,
      alignItems: 'center',
      display: 'flex',
    },
    greenBox: {
      fontSize: 12,
      alignItems: 'center',
      verticalAlign: 'middle',
      display: 'flex',
      '& .element': {
        display: 'inline-flex',
        lineHeight: '12px',
        borderLeft: 'inset 1px rgb(220,220,220)',
        paddingRight: '6px',
        paddingLeft: '6px',
        height: '16px',
        marginTop: '10px',
      },
      '& .element:first-child': {
        border: 'none',
      },
      '& .element:first-child:hover': {
        cursor: 'pointer',
        textDecoration: 'underline',
      },
      '& a': {
        color: 'rgb(63, 81, 181)',
      },
    },
    activeTaskFlexText: {
      marginLeft: 7,
      display: 'flex',
    },
  }),
);
