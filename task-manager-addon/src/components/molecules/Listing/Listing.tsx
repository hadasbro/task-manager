import React, { FC } from 'react';
import List from '@material-ui/core/List';
import StarIcon from '@material-ui/icons/Star';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Typography } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import { usePaperStyles } from '../../../styles/styles/modules';
import Expander from '../../atoms/Expander/Expander';
import { ListingElement } from '../../../types/interfaces/listings/ListingElement';
import { dayjsFormat } from '../../../extensions/dayjs';
import TagsList from '../../atoms/Tags/TagsList';
import { elementHasDescription } from '../../../types/guards/todo/elementHasDescription';
import { elementHasStar } from '../../../types/guards/todo/elementHasStar';
import { elementHasTags } from '../../../types/guards/todo/elementHasTags';
import { EntityID } from '../../../types/interfaces/global/EntityID';
import { Dict } from '../../../types/templates/Dict';
import { elementIsPinned } from '../../../types/guards/todo/elementIsPinned';
import { elementHasRing } from '../../../types/guards/todo/elementHasRing';

/**
 * FilteredListProviderProps
 */
type ListingProps = {
  items: Dict<ListingElement>;
  options?: {
    checkType: 'none' | 'check' | 'reminder';
  };
  handleToggleElement?: (id: EntityID) => void;
  handleToggleStar?: (id: EntityID) => void;
  handleDeleteElement?: (id: EntityID) => void;
  handleEditElement?: (id: EntityID) => void;
};

/**
 * ListingElement
 *
 * @constructor
 */
const Listing: FC<ListingProps> = ({
  items = {},
  options = {},
  handleToggleElement = () => {},
  handleToggleStar = () => {},
  handleDeleteElement = () => {},
  handleEditElement = () => {},
}) => {
  const classes = usePaperStyles();

  const opts = {
    ...{
      checkType: 'check',
    },
    ...options,
  };
  /**
   * handleTickToggle
   *
   * @param key
   */
  const handleTickToggle = key => {
    handleToggleElement(key);
  };

  /**
   * handleStarToggle
   *
   * @param key
   */
  const handleStarToggle = key => {
    handleToggleStar(key);
  };

  /**
   * handleDelete
   *
   * @param key
   */
  const handleDelete = key => {
    handleDeleteElement(key);
  };

  /**
   * handleEdit
   *
   * @param key
   */
  const handleEdit = key => {
    handleEditElement(key);
  };

  return (
    <List className={classes.root}>
      {Object.entries(items).map(([key, el]) => {
        return (
          <ListItem key={key} role={undefined} dense button>
            {opts.checkType === 'check' && (
              <ListItemIcon>
                <DoneIcon
                  onClick={() => handleTickToggle(key)}
                  color={el.done ? 'secondary' : 'disabled'}
                  className={el.done ? '' : 'DoneIconDisabled'}
                />
              </ListItemIcon>
            )}

            {opts.checkType === 'reminder' && elementHasRing(el) && el.ringing && (
              <ListItemIcon>
                <NotificationsActiveIcon
                  color="secondary"
                  onClick={() => handleTickToggle(key)}
                  className="DoneIconDisabledReminder"
                />
              </ListItemIcon>
            )}
            <ListItemText
              primary={
                <Expander
                  renderTitle={expanded => (
                    <Typography variant="subtitle1" className={el.done ? 'through' : ''}>
                      <div>
                        {el.title}
                        {elementHasStar(el) && el.star && <StarIcon className="starIcon" color="primary" />}
                      </div>
                      <div className="pdDate">
                        <span className="pd">added: {el.added ? dayjsFormat(el.added, 'YYYY-MM-DD') : '-'}</span>
                        {elementIsPinned(el) && (
                          <span className="pd">
                            pinned to: {el.pinned ? dayjsFormat(el.pinned, 'YYYY-MM-DD') : '-'}
                          </span>
                        )}
                        {expanded && elementHasTags(el) && <TagsList tags={el.tags} />}
                      </div>
                    </Typography>
                  )}
                  renderDetails={() => (
                    <div>
                      <Typography variant="body2" className={el.done ? 'through' : ''}>
                        {elementHasDescription(el) && (el.description ? el.description : '')}
                      </Typography>
                    </div>
                  )}
                />
              }
            />
            <ListItemSecondaryAction>
              {elementHasStar(el) && (
                <IconButton onClick={() => handleStarToggle(key)} className="StarBorderIcon" edge="end">
                  {el.star ? <StarHalfIcon /> : <StarBorderIcon />}
                </IconButton>
              )}

              <IconButton onClick={() => handleEdit(key)} className="EditDeleteIcon" edge="end">
                <EditIcon />
              </IconButton>

              <IconButton onClick={() => handleDelete(key)} className="EditDeleteIcon" edge="end">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

export default Listing;
