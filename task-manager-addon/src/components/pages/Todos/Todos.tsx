/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import { updateTodoFiltersSagaAction } from 'store/saga/actionEffects/todo/updateTodoFiltersSaga';
import { triggerAppErrorSagaAction } from 'store/saga/actionEffects/general/triggerAppErrorSaga';
import { Divider, Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import { todosSliceActions } from 'store/redux/slices/todoSlice';
import { saveTodoSagaAction } from 'store/saga/actionEffects/todo/saveTodoSaga';
import AppContainer from '../../templates/AppContainer/AppContainer';
import MarginAutoBox from '../../atoms/CenteredBox/MarginAutoBox';
import * as ListingProvider from '../../templates/ListingProvider/ListingProvider';
import { ListingFilters } from '../../templates/ListingProvider/ListingProvider';
import TodoFilters from '../../organisms/ListingFilterButtons/TodoFilters';
import { usePaperStyles } from '../../../styles/styles/modules';
import {
  selectAllTodos,
  selectFilteredTodos,
  selectFilteredTodosCount,
  selectTodoFilters,
} from '../../../store/selectors/todoSelectors';
import { ListingElementData, ListingElementForm } from '../../organisms/ListingElementForm/ListingElementForm';
import { useAppDispatch } from '../../../store/redux/rootReducer';
import { RoutePage } from '../../../types/interfaces/routing/RoutePage';
import { EntityID } from '../../../types/interfaces/global/EntityID';
import Listing from '../../molecules/Listing/Listing';
import { Nullable } from '../../../types/templates/Nullable';
import { listingElementToFormData } from '../../../functions/app/listingElementToFormData';
import { validateTodo } from '../../../functions/validators/validateTodo';
import { storeExceptionFromAny } from '../../../exceptions/store/StoreException';
import { useToggle } from '../../../hooks/switchers/useToggle';

/**
 * Todos
 *
 * @param meta
 * @param section
 * @constructor
 */
const Todos: FC<RoutePage> = ({ meta, section }) => {
  const dispatch = useAppDispatch();

  const classes = usePaperStyles();

  const [editedElementData, setEditedElementData] = useState<Nullable<ListingElementData>>(null);

  const [render, toggleRender] = useToggle(false);

  const { title, description } = meta;

  const { headerTitle, showSearchBar } = section;

  /**
   * selectedTodoFilters
   *
   * all filters from Redux
   */
  const selectedTodoFilters = useSelector(selectTodoFilters);

  /**
   * allTodos
   */
  const allTodos = useSelector(selectAllTodos);

  /**
   * selectedFilteredTodos
   */
  const selectedFilteredTodos = useSelector(selectFilteredTodos);

  /**
   * count
   */
  const selectedFilteredTodosCount = useSelector(selectFilteredTodosCount);

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
    dispatch(updateTodoFiltersSagaAction(curret));
  };

  /**
   * handleSaveTodo
   *
   * TODO - to redesign
   * @param data
   */
  const handleSaveTodo = (data: ListingElementData) => {
    try {
      validateTodo(data, editedElementData ? 'edit' : 'add');
      dispatch(saveTodoSagaAction(data));
      setEditedElementData(null);
      toggleRender();
    } catch (e) {
      dispatch(triggerAppErrorSagaAction(storeExceptionFromAny(e)));
    }
  };

  /**
   * toggleDoneTodo
   *
   * @param id
   */
  const toggleDoneTodo = (id: EntityID) => {
    dispatch(todosSliceActions.toggleDone(id));
  };

  /**
   * toggleStar
   *
   * @param id
   */
  const toggleStar = (id: EntityID) => {
    dispatch(todosSliceActions.toggleStar(id));
  };

  /**
   * deleteElement
   *
   * @param id
   */
  const deleteElement = (id: EntityID) => {
    dispatch(todosSliceActions.deleteElement(id));
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
    setEditedElementData(listingElementToFormData(id, allTodos));
  };

  /**
   * handleCancelEditMode
   */
  const handleCancelEditMode = () => {
    setEditedElementData(null);
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
                      My todo list
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <ListingProvider.Listing
                      initialFilters={selectedTodoFilters}
                      onFilterChange={handleUpdateFilters}
                      options={{
                        searchBox: true,
                        tagsChooser: true,
                        orderChooser: true,
                      }}
                    >
                      {(filters, updateFilters) => {
                        return (
                          <>
                            <Grid item xs={12}>
                              <div className={classes.todoScrollBox}>
                                <Listing
                                  items={selectedFilteredTodos}
                                  handleToggleElement={toggleDoneTodo}
                                  handleToggleStar={toggleStar}
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
                                <p className={classes.itemsp}>Items: {selectedFilteredTodosCount}</p>
                                <TodoFilters filters={filters} updateFilters={updateFilters} />
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
                      pinnedDate: true,
                      pinnedDateOptional: true,
                      tags: true,
                    }}
                    handleSave={handleSaveTodo}
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

export default Todos;
