/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { Divider, Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { Helmet } from 'react-helmet-async';
import { updateRemindersFiltersSagaAction } from 'store/saga/actionEffects/reminders/updateRemindersFiltersSaga';
import { saveReminderSagaAction } from 'store/saga/actionEffects/reminders/saveReminderSaga';
import AppContainer from '../../templates/AppContainer/AppContainer';
import { ListingFilters } from '../../templates/ListingProvider/ListingProvider';
import { usePaperStyles } from '../../../styles/styles/modules';
import MarginAutoBox from '../../atoms/CenteredBox/MarginAutoBox';
import * as ListingProvider from '../../templates/ListingProvider/ListingProvider';
import ReminderFilters from '../../organisms/ListingFilterButtons/RemindersFilters';
import { RoutePage } from '../../../types/interfaces/routing/RoutePage';
import {
  selectAllReminders,
  selectFilteredReminders,
  selectFilteredRemindersCount,
  selectRemindersFilters,
} from '../../../store/selectors/remindersSelectors';
import { EntityID } from '../../../types/interfaces/global/EntityID';
import { remindersSliceActions } from '../../../store/redux/slices/remindersSlice';
import Listing from '../../molecules/Listing/Listing';
import { listingElementToFormData } from '../../../functions/app/listingElementToFormData';
import { Nullable } from '../../../types/templates/Nullable';
import { ListingElementData, ListingElementForm } from '../../organisms/ListingElementForm/ListingElementForm';
import { useToggle } from '../../../hooks/switchers/useToggle';
import { triggerAppErrorSagaAction } from '../../../store/saga/actionEffects/general/triggerAppErrorSaga';
import { storeExceptionFromAny } from '../../../exceptions/store/StoreException';
import { validateReminder } from '../../../functions/validators/validateReminder';
import { useAppDispatch } from '../../../store/redux/rootReducer';

/**
 * Reminders
 *
 * @param meta
 * @param section
 * @constructor
 */
const Reminders: FC<RoutePage> = ({ meta, section }) => {
  const classes = usePaperStyles();

  const { title, description } = meta;

  const { headerTitle, showSearchBar } = section;

  const dispatch = useAppDispatch();

  const [editedElementData, setEditedElementData] = useState<Nullable<ListingElementData>>(null);

  const [render, toggleRender] = useToggle(false);

  /**
   * selectedReminderFilters
   *
   * all filters from Redux
   */
  const selectedRemindersFilters = useSelector(selectRemindersFilters);

  /**
   * selectRemindersCount
   */
  const selectRemindersCount = useSelector(selectFilteredRemindersCount);

  /**
   * selectedReminders
   */
  const selectedReminders = useSelector(selectFilteredReminders);

  /**
   * allElements
   */
  const allElements = useSelector(selectAllReminders);

  /**
   * toggleDoneReminder
   *
   * @param id
   */
  const toggleDoneReminder = (id: EntityID) => {
    dispatch(remindersSliceActions.toggleDone(id));
  };

  /**
   * deleteElement
   *
   * @param id
   */
  const deleteElement = (id: EntityID) => {
    dispatch(remindersSliceActions.deleteElement(id));
    if (editedElementData && editedElementData.entityId === id) {
      setEditedElementData(null);
    }
  };

  /**
   * handleUpdateFilters
   *
   * Callback for filter-upte actions
   * (in case of any corresponing just update filters in Redux)
   *
   * @param prev
   * @param curret
   */
  const handleUpdateFilters = (prev: ListingFilters, curret: ListingFilters) => {
    dispatch(updateRemindersFiltersSagaAction(curret));
  };

  /**
   * handleSaveTodo
   *
   * TODO - to redesign
   *
   * @param data
   */
  const handleSave = (data: ListingElementData) => {
    try {
      validateReminder(data, editedElementData ? 'edit' : 'add');
      dispatch(saveReminderSagaAction(data));
      setEditedElementData(null);
      toggleRender();
    } catch (e) {
      dispatch(triggerAppErrorSagaAction(storeExceptionFromAny(e)));
    }
  };

  /**
   * handleCancelEditMode
   */
  const handleCancelEditMode = () => {
    setEditedElementData(null);
  };

  /**
   * editedElementId
   *
   * @param id
   */
  const editElement = (id: EntityID) => {
    setEditedElementData(listingElementToFormData(id, allElements));
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      <AppContainer title={headerTitle} showSearchBar={showSearchBar}>
        <div className={clsx(classes.root, classes.todo)}>
          <MarginAutoBox cssProperties={{ width: '90%' }}>
            <>
              <Grid container spacing={8}>
                <Grid item xs={8}>
                  <Grid item xs={12}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      align="center"
                      style={{ marginTop: '30px', marginBottom: '20px' }}
                    >
                      My reminder list
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <ListingProvider.Listing
                      initialFilters={selectedRemindersFilters}
                      onFilterChange={handleUpdateFilters}
                      options={{
                        searchBox: false,
                        tagsChooser: false,
                        orderChooser: true,
                      }}
                    >
                      {(filters, updateFilters) => {
                        return (
                          <>
                            <Grid item xs={12}>
                              <div className={classes.todoScrollBox}>
                                <Listing
                                  options={{ checkType: 'reminder' }}
                                  items={selectedReminders}
                                  handleToggleElement={toggleDoneReminder}
                                  handleDeleteElement={deleteElement}
                                  handleEditElement={editElement}
                                />
                              </div>
                            </Grid>
                            <Grid item xs={12}>
                              <Divider variant="middle" />
                            </Grid>
                            <Grid item xs={12}>
                              <div className="listFooter">
                                <p className={classes.itemsp}>Items: {selectRemindersCount}</p>
                                <ReminderFilters filters={filters} updateFilters={updateFilters} />
                              </div>
                            </Grid>
                          </>
                        );
                      }}
                    </ListingProvider.Listing>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <ListingElementForm
                    forms={{
                      title: true,
                      description: false,
                      pinnedDate: true,
                      pinnedDateOptional: false,
                      tags: false,
                    }}
                    handleSave={handleSave}
                    handleCancelEdit={handleCancelEditMode}
                    initialData={editedElementData}
                    rerender={render}
                  />
                </Grid>
              </Grid>
            </>
          </MarginAutoBox>
        </div>
      </AppContainer>
    </>
  );
};

// noinspection JSUnusedGlobalSymbols
export default Reminders;
