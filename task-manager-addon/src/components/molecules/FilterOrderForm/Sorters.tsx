import React, { ChangeEvent, FC } from 'react';
import FormControl from '@material-ui/core/FormControl';
import TasksOrderLabel from 'components/organisms/OrderLabel/TasksOrderLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { useSortStyles } from '../../../styles/styles/modules';
import { useFilterFormStyles } from '../../../styles/styles/forms';
import { TasksOrders } from '../../../types/interfaces/listings/TasksOrders';
import FilterOrder from '../../../types/interfaces/objects/FilterOrder';

/**
 * SortFormProps
 */
type SortFormProps = {
  orderBy: TasksOrders;
  handlerUpdateFilters: (filtersOrders: Partial<FilterOrder>) => void;
};

/**
 * Sorters
 *
 * @param orderBy
 * @param handlerUpdateFilters
 * @constructor
 */
const SortForm: FC<SortFormProps> = ({ orderBy, handlerUpdateFilters }) => {
  const classes = useFilterFormStyles();
  const sortClasses = useSortStyles();
  const formControlClasses = {
    root: classes.formControlLabel,
    label: classes.formControlLabel,
  };

  /**
   * handleChange
   *
   * @param name
   * @param value
   */
  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    const order: Partial<FilterOrder> = {
      [name]: value,
    };

    handlerUpdateFilters(order);
  };

  return (
    <FormControl component="fieldset" className={sortClasses.filtersRoot}>
      <FormLabel component="legend" className={classes.formRootLabel}>
        Order by
      </FormLabel>
      <RadioGroup aria-label="gender" name="orderBy" value={orderBy.valueOf()} onChange={handleChange}>
        <FormControlLabel
          classes={formControlClasses}
          value={TasksOrders.Unspecified.valueOf()}
          control={<Radio />}
          label={<TasksOrderLabel orderType={TasksOrders.Unspecified} current={orderBy} />}
        />
        <FormControlLabel
          classes={formControlClasses}
          value={TasksOrders.LastActivityAsc.valueOf()}
          control={<Radio />}
          label={<TasksOrderLabel orderType={TasksOrders.LastActivityAsc} current={orderBy} />}
        />
        <FormControlLabel
          classes={formControlClasses}
          value={TasksOrders.LastActivityDesc.valueOf()}
          control={<Radio />}
          label={<TasksOrderLabel orderType={TasksOrders.LastActivityDesc} current={orderBy} />}
        />
        <FormControlLabel
          classes={formControlClasses}
          value={TasksOrders.MyLastActivityAsc.valueOf()}
          control={<Radio />}
          label={<TasksOrderLabel orderType={TasksOrders.MyLastActivityAsc} current={orderBy} />}
        />
        <FormControlLabel
          classes={formControlClasses}
          value={TasksOrders.MyLastActivityDesc.valueOf()}
          control={<Radio />}
          label={<TasksOrderLabel orderType={TasksOrders.MyLastActivityDesc} current={orderBy} />}
        />
        <FormControlLabel
          classes={formControlClasses}
          value={TasksOrders.PriorityAsc.valueOf()}
          control={<Radio />}
          label={<TasksOrderLabel orderType={TasksOrders.PriorityAsc} current={orderBy} />}
        />
        <FormControlLabel
          classes={formControlClasses}
          value={TasksOrders.PriorityDesc.valueOf()}
          control={<Radio />}
          label={<TasksOrderLabel orderType={TasksOrders.PriorityDesc} current={orderBy} />}
        />
      </RadioGroup>
    </FormControl>
  );
};

export { TasksOrderLabel, SortForm };
