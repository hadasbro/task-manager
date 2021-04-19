import React, { FC, useEffect } from 'react';
import { alertSliceActions } from 'store/redux/slices/appAlertSlice';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector } from 'react-redux';
import { selectDialogVisible } from '../../../store/selectors/appAlertSelectors';
import { isNotEmpty } from '../../../types/guards/general/isNotEmpty';
import { useAppDispatch } from '../../../store/redux/rootReducer';

/**
 * AlertDialog
 *
 * @constructor
 */
export const AlertDialog: FC = () => {
  const dispatch = useAppDispatch();

  const selectDialog = useSelector(selectDialogVisible);

  const [open, setOpen] = React.useState(false);

  const [content, setContent] = React.useState<{ title: string; msg: string }>({
    title: '',
    msg: '',
  });

  useEffect(() => {
    setOpen(selectDialog.visible);
    setContent(() => ({
      title: '',
      msg: '',
      ...selectDialog.msg,
    }));
  }, [selectDialog.visible]);

  /**
   * handleClose
   */
  const handleClose = () => {
    setOpen(false);
    dispatch(alertSliceActions.hideDialogMsg());
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {isNotEmpty(content.title) && <DialogTitle id="alert-dialog-title">{content.title}</DialogTitle>}
        <DialogContent>
          {isNotEmpty(content.msg) && (
            <DialogContentText id="alert-dialog-description">{content.msg}</DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
