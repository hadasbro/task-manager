/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { Divider, Grid, Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import { updateNotesFiltersSagaAction } from 'store/saga/actionEffects/notes/updateNotesFiltersSaga';
import { saveNoteSagaAction } from 'store/saga/actionEffects/notes/saveNoteNoteSaga';
import AppContainer from '../../templates/AppContainer/AppContainer';
import MarginAutoBox from '../../atoms/CenteredBox/MarginAutoBox';
import * as ListingProvider from '../../templates/ListingProvider/ListingProvider';
import { ListingFilters } from '../../templates/ListingProvider/ListingProvider';
import { usePaperStyles } from '../../../styles/styles/modules';
import {
  selectAllNotes,
  selectFilteredNotes,
  selectFilteredNotesCount,
  selectNotesFilters,
} from '../../../store/selectors/notesSelectors';
import NoteFilters from '../../organisms/ListingFilterButtons/NotesFilters';
import { ListingElementData, ListingElementForm } from '../../organisms/ListingElementForm/ListingElementForm';
import { RoutePage } from '../../../types/interfaces/routing/RoutePage';
import { useAppDispatch } from '../../../store/redux/rootReducer';
import { ListingOrders } from '../../../types/interfaces/listings/ListingOrders';
import { useToggle } from '../../../hooks/switchers/useToggle';
import { Nullable } from '../../../types/templates/Nullable';
import { triggerAppErrorSagaAction } from '../../../store/saga/actionEffects/general/triggerAppErrorSaga';
import { storeExceptionFromAny } from '../../../exceptions/store/StoreException';
import { validateNote } from '../../../functions/validators/validateNote';
import { EntityID } from '../../../types/interfaces/global/EntityID';
import { notesSliceActions } from '../../../store/redux/slices/notesSlice';
import Listing from '../../molecules/Listing/Listing';
import { listingElementToFormData } from '../../../functions/app/listingElementToFormData';
import { selectAllReminders } from '../../../store/selectors/remindersSelectors';

/**
 * Notes
 *
 * @param meta
 * @param section
 * @constructor
 */
const Notes: FC<RoutePage> = ({ meta, section }) => {
  const { title, description } = meta;
  const { headerTitle, showSearchBar } = section;

  const dispatch = useAppDispatch();

  const [editedElementData, setEditedElementData] = useState<Nullable<ListingElementData>>(null);

  const [render, toggleRender] = useToggle(false);

  const classes = usePaperStyles();

  const selectedFilteredNotes = useSelector(selectFilteredNotes);

  /**
   * selectedNoteFilters
   *
   * all filters from Redux
   */
  const selectedNoteFilters = useSelector(selectNotesFilters);

  /**
   * selectedNotesCount
   */
  const selectedNotesCount = useSelector(selectFilteredNotesCount);

  /**
   * allElements
   */
  const allElements = useSelector(selectAllNotes);

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
    dispatch(updateNotesFiltersSagaAction(curret));
  };

  /**
   * handleSave
   *
   * @param data
   */
  const handleSave = (data: ListingElementData) => {
    try {
      validateNote(data, editedElementData ? 'edit' : 'add');
      dispatch(saveNoteSagaAction(data));
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
   * toggleDoneNote
   *
   * @param id
   */
  const toggleDoneNote = (id: EntityID) => {
    dispatch(notesSliceActions.toggleDone(id));
  };

  /**
   * toggleStar
   *
   * @param id
   */
  const toggleStar = (id: EntityID) => {
    dispatch(notesSliceActions.toggleStar(id));
  };

  /**
   * deleteElement
   *
   * @param id
   */
  const deleteElement = (id: EntityID) => {
    dispatch(notesSliceActions.deleteElement(id));
    if (editedElementData && editedElementData.entityId === id) {
      setEditedElementData(null);
    }
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
                      My notes
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <ListingProvider.Listing
                      initialFilters={selectedNoteFilters}
                      onFilterChange={handleUpdateFilters}
                      options={{
                        searchBox: true,
                        tagsChooser: true,
                        orderChooser: true,
                        orderChooserAllowedOptions: [
                          ListingOrders.Unspecified,
                          ListingOrders.AddedDateAsc,
                          ListingOrders.AddedDateDesc,
                        ],
                      }}
                    >
                      {(filters, updateFilters) => {
                        return (
                          <>
                            <Grid item xs={12}>
                              <div className={classes.todoScrollBox}>
                                <Listing
                                  items={selectedFilteredNotes}
                                  options={{ checkType: 'none' }}
                                  handleToggleStar={toggleStar}
                                  handleToggleElement={toggleDoneNote}
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
                                <p className={classes.itemsp}>Items: {selectedNotesCount}</p>
                                <div style={{ float: 'right' }}>
                                  <NoteFilters filters={filters} updateFilters={updateFilters} />
                                </div>
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
                      description: true,
                      pinnedDate: false,
                      pinnedDateOptional: false,
                      tags: true,
                    }}
                    handleSave={handleSave}
                    initialData={editedElementData}
                    handleCancelEdit={handleCancelEditMode}
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
export default Notes;
