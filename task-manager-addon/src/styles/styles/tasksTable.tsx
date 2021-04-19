import { createStyles, Theme } from '@material-ui/core/styles';
import makeStyles from '@material-ui/core/styles/makeStyles';

/**
 * Styles for VirtualizedTable with Tasks
 *
 * @param theme
 */
export const useVirtualizedTableStyles = (theme: Theme) =>
  createStyles({
    flexContainer: {
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
      overflow: 'hidden',
      textAlign: 'left',
      '& .title': { color: '#3f51b5' },
      '& .listTaskRow': {
        color: '#909090',
        display: 'block',
        overflow: 'hidden',
        maxHeight: '40px',
        marginBottom: '5px',
      },
      '& .listTaskRowDescr': {
        color: '#909090',
        display: 'block',
        overflow: 'hidden',
        maxHeight: '40px',
        '& span': {
          display: 'block',
          maxHeight: '18px',
          overflow: 'hidden',
        },
      },
      '& .MuiTableCell-root img, .icon': {
        width: 16,
        height: 16,
        marginRight: 2,
        marginTop: -3,
        verticalAlign: 'middle',
      },
      '& .status-block span': {
        marginRight: 10,
      },
      '& .MuiChip-root.task-key-chip': {
        borderRadius: theme.shape.borderRadius,
        height: 'auto',
        marginRight: 5,
        cursor: 'pointer',
        background: '#AEDDFF',
      },
      '& .MuiChip-root.task-key-chip *': {
        textDecoration: 'none',
        color: '#3f51b5',
      },
      '& .MuiChip-root.task-key-chip .MuiChip-icon': {
        width: 14,
        height: 14,
      },
    },
    flexContainerBlock: {
      '& .title': { margin: 0, maxHeight: '36px', overflow: 'hidden' },
      '& > table > tbody > tr > td': { padding: '10px' },
      '& .listTaskRowDescr': { maxHeight: '48px' },
      border: 'dashed 1px #75C5FF',
    },
    table: {
      // temporary right-to-left patch, waiting for
      // https://github.com/bvaughn/react-virtualized/issues/454
      '& .ReactVirtualized__Table__headerRow': {
        flip: false,
        paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined,
        maxHeight: 40,
        fontSize: 10,
        borderBottom: 'solid 1px #EEEEEE',
      },
      '& .ReactVirtualized__Table__headerColumn *': {
        fontWeight: 600,
        fontSize: 12,
      },
      '& .ReactVirtualized__Grid__innerScrollContainer': {
        paddingBottom: 100,
      },
      '& .ReactVirtualized__Table__row': {
        borderBottom: 'dashed 1px #B7E0FF',
      },
      '& .ReactVirtualized__Table__row:nth-child(even)': {
        background: '#ECF9FF',
      },
      '& .MuiTableCell-root': {
        borderBottom: 'dotted 1px #EEEEEE',
      },
    },
    tableRow: {
      cursor: 'pointer',
    },
    tableRowHover: {
      '&:hover': {
        backgroundColor: theme.palette.grey[200],
      },
    },
    tableCell: {
      flex: 1,
    },
    noClick: {
      cursor: 'initial',
    },
    taskListPaper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: 600,
      width: '100%',
    },
    settingsPaper: {
      maxHeight: 600,
      width: '100%',
      fontSize: 13,
      '& .MuiAlert-root': {
        fontSize: 'inherit',
      },
      '& .settingsGrid': {
        overflowY: 'scroll',
        overflowX: 'hidden',
        maxHeight: 320,
        marginBottom: 30,
      },
    },
  });

/**
 * useTodoTableStyles - main wrapper for tasksList
 */
export const useTodoTableStyles = makeStyles((theme: Theme) =>
  createStyles({
    flexContainerNormal: {
      '& .MuiTableCell-root, & td': {
        fontSize: 13,
      },
      '& .MuiTableCell-root .title': {
        fontSize: 14,
      },
      '& .MuiChip-root.task-key-chip': {
        fontSize: 10,
      },
      '& .listTaskRowDescr': {
        fontSize: 11,
      },
    },
    flexContainerLargeFonts: {
      '& .MuiTableCell-root, & td': {
        fontSize: 14,
      },
      '& .MuiTableCell-root .title': {
        fontSize: 15,
      },
      '& .MuiChip-root.task-key-chip': {
        fontSize: 11,
      },
      '& .listTaskRowDescr': {
        fontSize: 12,
      },
    },
    todoRoot: {
      flexGrow: 1,
      position: 'relative',
    },

    fab: {
      position: 'absolute',
      left: '46%',
      bottom: 30,
      zIndex: 1000,
    },

    sortButton: {
      '& button': {
        marginRight: 3,
        paddingRight: 4,
        paddingLeft: 4,
        minWidth: 50,
        fontSize: 11,
      },
    },

    sortButtonLargeFont: {
      '& button': {
        fontSize: 12,
      },
    },

    todoBottomFilters: {
      margin: '15px',
      textAlign: 'right',
      fontSize: 13,
      '& p': {
        display: 'inline-flex',
        textAlign: 'right',
        marginRight: 10,
      },
    },
  }),
);
