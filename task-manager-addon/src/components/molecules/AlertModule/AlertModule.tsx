import React, { FC } from 'react';
import { AnyAction } from 'redux';
import { useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';
import { alertSliceActions } from 'store/redux/slices/appAlertSlice';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { selectAlert } from '../../../store/selectors/appAlertSelectors';
import { AppAlertButtonTypes } from '../../../types/interfaces/alerts/AppAlertButtonTypes';
import { createKey } from '../../../functions/general/createKey';
import { AppAlertType } from '../../../types/interfaces/alerts/AppAlertType';
import { ActivityFilter } from '../../../types/interfaces/objects/ActivityFilter';
import { useAppDispatch } from '../../../store/redux/rootReducer';
import { AppAlertButton } from '../../../types/interfaces/alerts/AppAlertButton';
import { isNotEmpty } from '../../../types/guards/general/isNotEmpty';
import { Nullable } from '../../../types/templates/Nullable';

/**
 * Alert
 *
 * @constructor
 */
const AlertModule: FC<ActivityFilter> = ({ user }, className: string) => {
  const actionToDispatch = useAppDispatch();

  const selectedAlert = useSelector(selectAlert);

  /**
   * handleCloseAlert
   */
  const handleCloseAlert = () => {
    actionToDispatch(alertSliceActions.closeAlert());
  };

  /**
   * handleCustomButton
   *
   * @param action
   */
  const handleCustomButton = (action: Nullable<AnyAction>) => {
    if (action) {
      actionToDispatch(action);
    }
  };

  let buttons: AppAlertButton[];

  if (selectedAlert && isNotEmpty(selectedAlert.buttons)) {
    buttons = selectedAlert.buttons;
  } else {
    buttons = [{ type: AppAlertButtonTypes.CLOSE }];
  }

  return (
    selectedAlert && (
      <Alert
        className="mainAlert"
        onClose={handleCloseAlert}
        action={
          <>
            {buttons.map(btn => {
              if (btn.type === AppAlertButtonTypes.HANDLE) {
                return (
                  <Button
                    color="inherit"
                    size="small"
                    key={createKey(btn.label)}
                    onClick={() => handleCustomButton(btn.actionToDispatch)}
                  >
                    {btn.label || ''}
                  </Button>
                );
              }

              if (btn.type === AppAlertButtonTypes.CLOSE_CUSTOM) {
                return (
                  <IconButton
                    size="small"
                    key={createKey(btn.label)}
                    onClick={() => handleCustomButton(btn.actionToDispatch)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                );
              }

              return (
                <IconButton size="small" key="close" onClick={() => handleCloseAlert()}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              );
            })}
          </>
        }
        severity={selectedAlert.type === AppAlertType.SUCCESS ? 'success' : 'error'}
      >
        {selectedAlert.msg}
      </Alert>
    )
  );
};

export default AlertModule;
