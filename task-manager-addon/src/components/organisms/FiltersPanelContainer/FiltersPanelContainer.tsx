import React, { ChangeEvent, FC, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { updateTasksFiltersSagaAction } from 'store/saga/actionEffects/tasks/updateTasksFiltersSaga';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import { useSortStyles, useStylesExpansion } from 'styles/styles/modules';
import * as Sorters from '../../molecules/FilterOrderForm/Sorters';
import * as Filters from '../../molecules/FilterOrderForm/Filters';
import {
  selectChangedFiltersCount,
  selectChangedOrdersCount,
  selectFiltersOrder,
} from '../../../store/selectors/filterOrderSelectors';
import { selectConfig } from '../../../store/selectors/apiConfigSelectors';
import { selectMetaData } from '../../../store/selectors/metaDataSelectors';
import FilterOrder from '../../../types/interfaces/objects/FilterOrder';
import TasksOrderLabel from '../OrderLabel/TasksOrderLabel';

/**
 * FiltersPanelContainer
 *
 * @constructor
 */
const FiltersPanelContainer: FC = () => {
  const dispatch = useDispatch();

  const sortClasses = useSortStyles();

  const expansionClasses = useStylesExpansion();
  const allFiltersOrders = useSelector(selectFiltersOrder);
  const allSelectConfig = useSelector(selectConfig);
  const allMetaData = useSelector(selectMetaData);
  const selectorChangedFiltersCount = useSelector(selectChangedFiltersCount);
  const changedFiltersCount = selectorChangedFiltersCount();
  const changedOrdersCount = useSelector(selectChangedOrdersCount);

  const [expanded, setExpanded] = useState<string | false>(false); // 'filters-panel'

  /**
   * handleExpansion
   *
   * @param panel
   */
  const handleExpansion = (panel: string) => (event: ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  /**
   * handlerUpdateFilters
   *
   * @param filtersOrders
   */
  const handlerUpdateFilters = (filtersOrders: Partial<FilterOrder>) => {
    dispatch(updateTasksFiltersSagaAction(filtersOrders));
  };

  return (
    <div className={expansionClasses.root} style={{ marginBottom: 2 }}>
      <ExpansionPanel
        className={expansionClasses.panel}
        expanded={expanded === 'filters-panel'}
        onChange={handleExpansion('filters-panel')}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon fontSize="small" />} aria-controls="filters-panelbh-content">
          <Typography className={expansionClasses.heading}>Filters & Order By</Typography>

          {changedFiltersCount + changedOrdersCount > 0 ? (
            <>
              <span className="filterChoosen">
                <Badge
                  className={expansionClasses.filterBadge}
                  color="secondary"
                  variant="standard"
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  badgeContent={changedFiltersCount}
                  showZero
                >
                  Filters:
                </Badge>
              </span>
              <span className={['filterChoosen', sortClasses.filtersRoot].join(' ')}>
                Order By: <TasksOrderLabel orderType={allFiltersOrders.orderBy} />
              </span>
            </>
          ) : (
            <Typography className={expansionClasses.secondaryHeading}>
              No filters and order chosen. Click to set filter or order.
            </Typography>
          )}
        </ExpansionPanelSummary>

        <ExpansionPanelDetails className={expansionClasses.expansionDetails}>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Filters.FiltersForm
                handlerUpdateFilters={handlerUpdateFilters}
                userId={allSelectConfig.apiCredentials.userId}
                filters={allFiltersOrders}
                metas={allMetaData}
              />
            </Grid>
            <Grid item xs={3}>
              <Sorters.SortForm orderBy={allFiltersOrders.orderBy} handlerUpdateFilters={handlerUpdateFilters} />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default FiltersPanelContainer;
