import React from 'react';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import { useActiveTaskStyles } from 'styles/styles/tasks';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
/**
 * VersionBox
 *
 * @constructor
 */
const VersionBox = () => {
  const classes = useActiveTaskStyles();

  return (
    <Paper className={classes.myTodoWrapper}>
      <div className={clsx(classes.greenBox)}>
        <div className="element">
          <OpenInBrowserIcon fontSize="default" color="inherit" alignmentBaseline="central" />
          <b>Open in browser</b>
        </div>
        <div className="element">Version: 1.01</div>
        <div className="element">
          <a href="google.com" target="_blank">
            Help &#x2197;
          </a>
        </div>
      </div>
    </Paper>
  );
};

export default VersionBox;
