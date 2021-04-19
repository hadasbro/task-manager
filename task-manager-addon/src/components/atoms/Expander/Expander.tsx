import React, { FC, ReactNode, useState } from 'react';
import clsx from 'clsx';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStylesExpansion } from '../../../styles/styles/modules';
import { useToggle } from '../../../hooks/switchers/useToggle';

/**
 * CustomizedAccordionsProps
 */
type CustomizedAccordionsProps = {
  options?: { expandIconInTitle: boolean };
  renderTitle: (expanded: boolean, toggle: () => void) => ReactNode;
  renderDetails: (expanded: boolean, toggle: () => void) => ReactNode;
};

/**
 * Expander
 *
 * @param renderTitle
 * @param renderDetails
 * @param expandIconInTitle
 * @constructor
 */
const Expander: FC<CustomizedAccordionsProps> = ({ renderTitle, renderDetails, options }) => {
  const opts = options || { expandIconInTitle: true };

  const [expanded, toggle] = useToggle();

  const classes = useStylesExpansion();

  return (
    <ExpansionPanel className={classes.simpleExpander} square expanded={expanded} onChange={toggle}>
      <ExpansionPanelSummary>
        {renderTitle(expanded, toggle)}
        {opts.expandIconInTitle &&
          (expanded ? (
            <ExpandLessIcon className={clsx('ExpandLessIcon', { ExpandLessIconOpen: expanded })} />
          ) : (
            <ExpandMoreIcon className="ExpandMoreIcon" />
          ))}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>{renderDetails(expanded, toggle)}</ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default Expander;
