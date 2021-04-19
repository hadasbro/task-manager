import makeStyles from '@material-ui/core/styles/makeStyles';
import { createStyles, Theme } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';

/**
 * useSortStyles
 */
export const useSortStyles = makeStyles((theme: Theme) =>
  createStyles({
    filtersRoot: {
      '& span': {
        marginLeft: '6px',
      },
      '& .MuiSvgIcon-fontSizeSmall': {
        verticalAlign: 'middle',
        fontSize: '15px',
      },
    },
    filtersRootForm: {
      '& span': {
        marginLeft: '6px',
      },
      '& .MuiSvgIcon-fontSizeSmall': {
        verticalAlign: 'middle',
        fontSize: '15px',
      },
    },
  }),
);

/**
 * useStylesExpansion
 */
export const useStylesExpansion = makeStyles((theme: Theme) =>
  createStyles({
    simpleExpander: {
      background: 'none',
      border: 'none',
      padding: '0',
      boxShadow: 'none',
      '& .MuiExpansionPanelSummary-content': {
        margin: 0,
      },
    },
    expansionDetails: {
      fontSize: 10,

      position: 'absolute',
      zIndex: 1000,
      background: 'white',
      border: 'solid 1px',
      borderColor: 'rgb(230,230,230)',
      borderTop: 'none',
      borderRadius: theme.shape.borderRadius,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      paddingBottom: 50,
      boxShadow:
        '0px 2px 1px -1px rgba(0,0,0,0.01), 0px 1px 1px 0px rgba(0,0,0,0.01), 0px 1px 3px 0px rgba(0,0,0,0.08)',
    },
    root: {
      fontSize: '0.875rem',
      width: '100%',
      boxShadow: 'none',
      minHeight: 30,
      '& .MuiExpansionPanelSummary-root': {
        minHeight: 30,
      },
      '& .MuiExpansionPanelSummary-content': {
        margin: 0,
      },
      '& .MuiIconButton-root': {
        padding: 11,
      },
    },
    heading: {
      fontSize: theme.typography.pxToRem(14),
      flexShrink: 0,
      boxShadow: 'none',
      paddingTop: 1,
      paddingBottom: 0,
      paddingLeft: 3,
      paddingRight: 3,
      background: '#AEDDFF',
      borderRadius: 3,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(14),
      color: theme.palette.text.secondary,
      boxShadow: 'none',
      marginLeft: 50,
      lineHeight: 1.7,
    },
    panel: {
      boxShadow: 'none',
      border: 'solid 1px #DDDDDD',
      minHeight: 30,
      margin: 0,
      '& .filterChoosen': {
        color: '#2C2C2C',
        marginLeft: 20,
        marginRight: 20,
        display: 'flex',
      },
    },
    filterBadge: {
      '& .MuiBadge-badge': {
        top: '11px',
        right: '-15px',
      },
    },
  }),
);

/**
 * useTopBarStyles
 */
export const useTopBarStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }),
);

/**
 * usePaperStyles
 */
export const usePaperStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  marginAutoContainer: {
    display: 'flex',
  },
  marginAutoItem: {
    margin: 'auto',
  },
  alignItemsAndJustifyContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wizzard: {
    '& .MuiFormControlLabel-root': {
      marginRight: 30,
      marginBottom: 30,
    },
  },
  todo: {
    '& .sumbitNew': {
      margin: '25px',
      '& button': {
        margin: '5px;',
      },
    },
    '& .through': {
      textDecoration: 'line-through',
      color: 'rgb(200,200,200)',
    },
    '& .starIcon': {
      color: '#FF6C00',
      width: '14px',
      height: '14px',
      margin: '-5px 10px 0px 5px',
    },
    '& .MuiListItemText-root': {
      marginTop: '0px',
      marginBottom: '0px',
    },
    '& .filterGroup': {
      display: 'inline-block',
      margin: '0px 0px 0px 5px',
    },
    '& .MuiSvgIcon-root': {
      verticalAlign: 'middle',
    },
    '& .MuiInputBase-root, .MuiTextField-root': {
      width: '100%',
    },
    '& .MuiOutlinedInput-multiline': {
      fontSize: '11px',
    },
    paddingBottom: '40px',
    '& p, .MuiButton-root': {
      fontSize: '12px',
    },
    '& .MuiInputLabel-root': {
      fontSize: '11px',
      transform: 'translate(0, 1.5px) scale(1)',
    },
    '& .MuiChip-root': {
      margin: '3px',
    },
    '& .MuiSelect-selectMenu': {
      lineHeight: '2.6876em',
      maxWidth: '200px',
    },
    '& .pdDate': {
      color: 'rgb(190,190,190)',
      lineHeight: '8px',
      display: 'block',
      width: '100%',
    },
    '& .pdTags': {
      marginTop: '5px',
    },
    '& .pdDate *': {
      fontSize: '9px',
      lineHeight: '8px',
      marginRight: '10px',
      textDecoration: 'none !important',
    },
    '& .orderButton': {
      marginTop: '18px',
      float: 'right',
    },
    '& .MuiListItem-container .ExpandMoreIcon, .MuiListItem-container .ExpandLessIcon, .MuiListItem-container .EditDeleteIcon, .MuiListItem-container .StarBorderIcon': {
      display: 'none',
    },
    '& .MuiListItem-container:hover .ExpandMoreIcon, .MuiListItem-container:hover .ExpandLessIcon, .MuiListItem-container:hover .EditDeleteIcon, .MuiListItem-container:hover .StarBorderIcon': {
      display: 'inline-block',
    },
    '& .MuiListItem-container .ExpandLessIcon.ExpandLessIconOpen': {
      display: 'inline-block',
    },
    '& .MuiListItem-container .DoneIconDisabled': {
      visibility: 'hidden',
    },
    '& .MuiListItem-container .DoneIconDisabledReminder': {
      visibility: 'visible',
    },
    '& .MuiListItem-container:hover .DoneIconDisabled': {
      visibility: 'visible',
    },
  },
  todoScrollBox: {
    padding: '0px 10px',
    minHeight: '450px',
    maxHeight: '480px',
    overflowY: 'scroll',
  },
  tagsScrollBoxWrapper: {
    marginTop: '15px;',
    marginBottom: '25px;',
  },
  tagsScrollBox: {
    padding: '10px 10px',
    maxHeight: '100px',
    overflowY: 'scroll',
    '& .MuiChip-root': {},
  },
  filterGroup: {
    lineHeight: '16px;',
    display: 'block',
    flexDirection: 'column',
    alignItems: 'center',
    '& > p': {
      margin: theme.spacing(1),
    },
    '& .MuiButton-root': {
      textTransform: 'none',
    },
  },
  itemsp: {
    marginLeft: '10px',
    marginRight: '10px',
    display: 'inline-block',
  },
}));

/**
 * useSAppearancetyles
 */
export const useSAppearancetyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      height: 45,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginLeft: 3,
      '& .Mui-selected': {
        background: 'none',
      },
      '& .MuiToggleButton-root': {
        border: 'none',
        background: 'none !important',
      },
    },
    divider: {
      margin: theme.spacing(1, 0.5),
    },
  }),
);

/**
 * useSearchTodoStyles
 */
export const useSearchTodoStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid rgba(0, 0, 0, 0.40)',
      boxShadow: 'none',
      borderRadius: 0,
      ':hover': {
        borderBottom: '2px solid rgba(0, 0, 0, 0.80)',
      },
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);

/**
 * useVerticalPanelStyles
 */
export const useVerticalPanelStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

/**
 * useGrayBoxStyles
 */
export const useGrayBoxStyles = makeStyles((theme: Theme) => ({
  tabsPanel: {
    maxHeight: '685px',
    padding: 0,
    '& .MuiBox-root': {
      padding: '0px 5px 0px 5px',
    },
  },
  root: {
    width: '100%',
    // marginTop:30,
    '& .MuiButtonBase-root': {
      minWidth: 50,
      textDecoration: 'none',
      fontSize: 12,
      textTransform: 'none',
      fontWeight: 'bold',
    },
    '& .Mui-selected': {
      background: 'white',
    },
    '& h5': {
      fontSize: '13px',
      marginBottom: '15px',
      textAlign: 'center',
    },
    '& h6': {
      fontSize: '11px',
    },
  },
}));

/**
 * useTimelineStyles
 */
export const useTimelineStyles = makeStyles(theme => ({
  paperMain: {
    background: 'none',
    boxShadow: 'none',
    border: 'none',
    padding: '6px 15px',
    margin: 3,
  },
  shadhowedPaper: {
    background: 'white',
    boxShadow: 'none',
    // border: 'none',
    padding: '6px 10px 16px 10px',
    // margin: '0px 3px 0px 0px',
    margin: '0px 0px 0px 3px',
    border: 'solid 1px rgb(235,235,235)',
  },
  paper: {
    padding: '3px 10px',
    margin: 3,
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  timeline: {
    padding: '2px 0px',
    '& .MuiTimelineContent-root': {
      padding: '2px 0px',
    },
    '& .MuiTimelineOppositeContent-root, .makeStyles-paper-61': {
      flex: 0,
      padding: 6,
      '& p.uname': {
        width: '80px',
      },
    },
    '& .MuiPaper-elevation3': {
      boxShadow: 'none',
      border: 'solid 1px rgb(240,240,240)',
    },
  },
}));

/**
 * useTLineStyles - TODO - to clean up
 */
export const useTLineStyles = makeStyles(theme => ({
  pager: {
    '& .MuiButtonBase-root': { margin: '2px' },
  },
  timelinesBox: {
    '& .MuiListItemAvatar-root': { minWidth: '30px', marginTop: '5px' },
    '& .MuiAvatar-root': { width: '30px', height: '30px', marginTop: '5px', marginRight: '5px' },
    marginTop: '15px',
    '& .MuiFormControl-marginNormal': {
      marginTop: '10px',
    },
    '& .MuiTimeline-root': {
      padding: '6px 0px',
    },
    '& .MuiTimelineItem-root': {
      minHeight: '45px',
    },
  },
  activityPeopleRoot: {
    width: '100%',
    maxWidth: '36ch',
    marginTop: '5px',
    '& .MuiListItemAvatar-root': { minWidth: '30px' },
    '& .MuiAvatar-root': { width: '30px', height: '30px' },
    '& .MuiListItemText-primary': {
      fontSize: '13px',
    },
    '& .MuiListItemText-secondary, span ': {
      fontSize: '11px',
    },
    '& .MuiListItem-root': {
      padding: '3px 0px 3px 0px',
    },
    '& li': {
      marginLeft: '0px',
    },
  },
  activityElement: {
    fontSize: '11px',
    lineHeight: '16px',
    '& b': {
      color: theme.palette.primary,
    },
    '& .MuiChip-root': {
      fontSize: 11,
      height: '15px',
      color: 'rgba(0, 0, 0, 0.87)',
    },
    '.MuiChip-labelSmall': {
      paddingLeft: '2px',
      paddingRight: '2px',
    },
  },
  paperMain: {
    background: 'white',
    boxShadow: 'none',
    // border: 'none',
    padding: '6px 0px',
    // margin: '0px 3px 0px 0px',
    margin: '0px 0px 0px 3px',
    border: 'solid 1px rgb(235,235,235)',
    fontSize: 12,
  },
  paper: {
    padding: '3px 10px',
    margin: 3,
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  scrollBox: {
    padding: '10px 10px',
    minHeight: '400px',
    maxHeight: '480px',
    overflowY: 'scroll',
  },
  timeline: {
    padding: '2px 0px',
    '& .MuiTimelineContent-root': {
      padding: '2px 0px',
      display: 'block',
      float: 'left',
      clear: 'both',
    },
    '& p, div.p, span': {
      margin: 1,
      fontSize: '11px',
      lineHeight: '16px',
    },
    '& i': {
      fontSize: '8px',
      color: 'rgb(160,160,160)',
    },
    '& .MuiTimelineOppositeContent-root, .makeStyles-paper-61': {
      flex: 0,
      padding: 6,
      verticalAlign: 'middle',
    },
    '& .MuiPaper-elevation3': {
      border: 'solid 1px rgb(240,240,240)',
      boxShadow: 'none',
    },
    '& .MuiPaper-elevation3 a': {
      color: '#3f51b5',
    },
    '& .MuiPaper-elevation3 a:hover': {
      textDecoration: 'underline',
    },
    '& .MuiTimelineItem-oppositeContent p': {
      width: '60px',
      overflow: 'hidden',
      display: 'inline-block',
    },
    // MuiTimelineOppositeContent-root MuiTimelineItem-oppositeContent
  },
  autosuggest: {
    '& .MuiAutocomplete-popper *': {},
  },
  formControl: {
    width: '100%',
    display: 'block',
    '& .MuiFormControl-root': {
      width: '100%',
      display: 'block',
    },
    '& .MuiFormControl-root *': {
      fontSize: '11px',
      color: 'rgba(0, 0, 0, 0.87)',
      opacity: 1,
      transform: 'none',
    },
    '& .MuiIconButton-root': {
      minWidth: '0 !important',
      padding: '0 !important',
    },
    '& .MuiSvgIcon-root': {
      marginLeft: 5,
      color: 'rgba(0, 0, 0, 0.54)',
    },
  },
  inline: {
    display: 'inline',
  },
}));

/**
 * useConfiguratorStyles
 */
export const useConfiguratorStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      marginBottom: 30,
    },
    configurator: {
      width: '80%',
      margin: '0 auto',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);

/**
 * useSimpleListStyles
 */
export const useSimpleListStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }),
);

/**
 * useSimpleListStyles
 */
export const useTimerBoxStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '60px',
      height: '60px',
      background: theme.palette.primary.main,
      position: 'absolute',
      borderRadius: '50%',
      top: '45%',
      zIndex: 1000,
      left: '-42px',
      color: '#D6EFFE',
      textAlign: 'center',
      '& .MuiIcon-root': {
        marginTop: '18px',
      },
    },
  }),
);
