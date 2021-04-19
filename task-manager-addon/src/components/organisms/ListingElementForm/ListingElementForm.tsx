import React, { FC, ChangeEvent, useState, useEffect, memo } from 'react';
import equal from 'fast-deep-equal/react';
import Button from '@material-ui/core/Button';
import { TextField, Typography } from '@material-ui/core';
import MarginAutoBox from '../../atoms/CenteredBox/MarginAutoBox';
import { usePaperStyles } from '../../../styles/styles/modules';
import DatePicker from '../../atoms/DatePicker/DatePicker';
import BreakLine from '../../atoms/BreakLine/BreakLine';
import TagEntity from '../../../models/entities/Tag';
import TagsChooser from '../../molecules/TagsChooser/TagsChooser';
import { OptionalDayjsObj } from '../../../types/interfaces/datetime';
import { Nullable } from '../../../types/templates/Nullable';
import { EntityID } from '../../../types/interfaces/global/EntityID';
import { ListingItemPinneddDate } from '../../../types/interfaces/listings';
import { useToggle } from '../../../hooks/switchers/useToggle';

/**
 * ListingElementData
 */
export type ListingElementData = {
  entityId: Nullable<EntityID>;
  star: boolean;
  done: boolean;
  title: string;
  description: string;
  pinned: ListingItemPinneddDate;
  tags: TagEntity['key'][];
};

/**
 * ListingElementFormProps
 */
type ListingElementFormProps = {
  forms: {
    title: boolean;
    description: boolean;
    pinnedDate: boolean;
    pinnedDateOptional: boolean;
    tags: boolean;
  };
  handleSave: (data: ListingElementData) => void;
  handleCancelEdit: () => void;
  initialData?: Nullable<ListingElementData>;
  rerender: boolean;
};

/**
 * Initial, default data
 */
const defaulInitFormData = {
  entityId: null,
  star: false,
  done: false,
  title: '',
  description: '',
  pinned: null,
  tags: [],
};

/**
 * ListingtForm
 *
 * @constructor
 */
const ListingForm: FC<ListingElementFormProps> = ({
  forms,
  handleSave,
  handleCancelEdit,
  initialData = null,
  rerender = false,
}) => {
  const [formData, setFormData] = useState<ListingElementData>(initialData || defaulInitFormData);

  const [mode, setMode] = useState<'add' | 'edit'>('add');

  const [tagsChooserInit, reinitTagChooser] = useToggle(true);

  useEffect(() => {
    if (initialData && initialData.entityId !== null) {
      setMode('edit');
    } else {
      setMode('add');
    }

    setFormData(initialData || defaulInitFormData);
    reinitTagChooser();
  }, [initialData, rerender]);

  /**
   * handleClose
   *
   * @param tags
   */
  const handleTagsChoose = (tags: TagEntity['key'][]) => {
    setFormData(prev => {
      return {
        ...prev,
        tags,
      };
    });
  };

  /**
   * handleChooseDate
   *
   * @param date
   */
  const handleChooseDate = (date: Nullable<OptionalDayjsObj>) => {
    setFormData(prev => {
      const d = new Date();
      return {
        ...prev,
        pinned: {
          years: d.getFullYear(),
          months: d.getMonth(),
          date: d.getDate(),
          ...date,
        },
      };
    });
  };

  /**
   * handleUpdateForm
   *
   * @param name
   * @param value
   */
  const handleUpdateForm = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> & { target: { name: keyof ListingElementData } }) => {
    setFormData(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  /**
   * handleSubmit
   */
  const handleSubmit = () => {
    handleSave(formData);
  };

  /**
   * handleCancel
   *
   * Cancen edit mode and reset form
   */
  const handleCancel = () => {
    handleCancelEdit();
    setMode('add');
  };

  /**
   * styles
   */
  const classes = usePaperStyles();

  return (
    <MarginAutoBox cssProperties={{ width: '80%' }}>
      <>
        <Typography variant="h6" gutterBottom align="center" style={{ marginTop: '60px', marginBottom: '40px' }}>
          {mode === 'add' ? 'Add new' : 'Edit'}
        </Typography>
        <div className={classes.todo}>
          <MarginAutoBox cssProperties={{ width: '80%' }}>
            <>
              {forms.title && (
                <TextField value={formData.title} onChange={handleUpdateForm} name="title" label="Title" />
              )}
              <BreakLine br={2} />
              {forms.description && (
                <TextField
                  value={formData.description}
                  onChange={handleUpdateForm}
                  name="description"
                  label="Description (optional)"
                  multiline
                  rows={3}
                />
              )}
              <BreakLine br={2} />
              {forms.pinnedDate && (
                <DatePicker
                  date={formData.pinned}
                  setDate={handleChooseDate}
                  label={forms.pinnedDateOptional ? 'Pin to date (optional)' : 'Pin to date'}
                />
              )}
            </>
          </MarginAutoBox>

          {forms.tags && (
            <TagsChooser handleTagsChoose={handleTagsChoose} reinit={tagsChooserInit} initTags={formData.tags} />
          )}

          <div className="sumbitNew">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Confirm
            </Button>

            {mode === 'edit' && (
              <Button variant="contained" color="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            )}
          </div>
        </div>
      </>
    </MarginAutoBox>
  );
};

/**
 * ListingElementForm
 *
 * Memo to prevent re-render if not needed
 * (re-render only when initial props change,
 * so only when we have "edit" mode)
 */
export const ListingElementForm = memo(
  (props: ListingElementFormProps) => {
    return <ListingForm {...props} />;
  },
  (prev, next) => equal(prev.initialData, next.initialData) && prev.rerender === next.rerender,
);
