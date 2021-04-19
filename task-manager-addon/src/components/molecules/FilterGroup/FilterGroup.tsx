import React, { FC } from 'react';
import clsx from 'clsx';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { usePaperStyles } from '../../../styles/styles/modules';
import { isDefined } from '../../../types/guards/general/isDefined';

/**
 * FilterButton
 */
type FilterButton = {
  key: string;
  label: string;
};

/**
 * FilterGroupProps
 */
type FilterGroupProps = {
  buttons: FilterButton[];
  label?: string;
  activeKey?: string;
  handleChange?: (val: any) => void;
};

/**
 * FilterGroup
 *
 * @constructor
 */
const FilterGroup: FC<FilterGroupProps> = ({ buttons, label = null, activeKey = null, handleChange = val => {} }) => {
  const classes = usePaperStyles();

  return (
    <div className={clsx(classes.filterGroup, 'filterGroup')}>
      {label && (
        <Typography variant="body2" display="inline">
          {label}
        </Typography>
      )}
      <ButtonGroup size="small" color="default" style={{ display: 'inline-block' }}>
        {buttons.map(button => {
          const isActive = isDefined(activeKey) && button.key === activeKey;
          const color = isActive ? 'primary' : 'default';
          const variant = isActive ? 'contained' : 'outlined';
          return (
            <Button key={button.key} variant={variant} color={color} onClick={() => handleChange(button.key)}>
              {button.label}
            </Button>
          );
        })}
      </ButtonGroup>
    </div>
  );
};

export default FilterGroup;
