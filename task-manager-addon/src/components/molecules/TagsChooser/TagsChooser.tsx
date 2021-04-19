import React, { FC, FormEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import ExposureNeg1Icon from '@material-ui/icons/ExposureNeg1';
import { Chip, IconButton, Popover, PropTypes, TextField, Typography } from '@material-ui/core';
import MarginAutoBox from '../../atoms/CenteredBox/MarginAutoBox';
import { usePaperStyles } from '../../../styles/styles/modules';
import TagEntity from '../../../models/entities/Tag';
import { useTagChooser } from '../../../hooks/components/useTagChooser';
import { Nullable } from '../../../types/templates/Nullable';

/**
 * TagsChooserProps
 */
type TagsChooserProps = {
  reinit?: boolean;
  initTags?: TagEntity['key'][];
  handleTagsChoose?: Nullable<(tags: TagEntity['key'][]) => void>;
};

/**
 * TagsChooser
 *
 * @constructor
 */
const TagsChooser: FC<TagsChooserProps> = ({ handleTagsChoose = null, initTags = [], reinit = false }) => {
  const addTagRef = useRef<HTMLInputElement>(null);

  const {
    tagsToRemove,
    choosenTags,
    addOrRemoveTag,
    selectedAllTags,
    removeTagsCommit,
    addTagsCommit,
    initChoosenTags,
  } = useTagChooser(reinit);

  useEffect(() => {
    if (initTags && initTags.length) {
      initChoosenTags(initTags);
    }
  }, [initTags]);

  const [plusAnchor, setPlusAnchor] = useState<HTMLButtonElement | null>(null);
  const plusOpen = Boolean(plusAnchor);
  const plusId = plusOpen ? 'plus-popover' : undefined;

  const [minusAnchor, setMinusAnchor] = useState<HTMLButtonElement | null>(null);
  const minusOpen = Boolean(minusAnchor);
  const minusId = minusOpen ? 'minus-popover' : undefined;

  /**
   * handleOpen
   *
   * @param e
   * @param type
   */
  const handleOpen = (e: MouseEvent<HTMLButtonElement>, type: 'plus' | 'minus') => {
    if (type === 'plus') {
      setPlusAnchor(e.currentTarget);
    } else {
      setMinusAnchor(e.currentTarget);
    }
  };

  /**
   * handleClose
   *
   * @param type
   */
  const handleClose = (type: 'plus' | 'minus') => {
    if (type === 'plus') {
      setPlusAnchor(null);
    } else {
      setMinusAnchor(null);
    }
  };

  /**
   * handleTagChange
   *
   * @param tagKey
   * @param source
   */
  const handleTagChange = (tagKey: string, source: 'choose' | 'remove' = 'choose') => {
    addOrRemoveTag(tagKey, source, handleTagsChoose);
  };

  /**
   * handleAddTag
   *
   * @param e
   */
  const handleAddTag = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTagsCommit(addTagRef.current!.value, () => handleClose('plus'));
  };

  /**
   * handleRemovetags
   */
  const handleRemovetags = () => {
    removeTagsCommit(() => handleClose('minus'));
  };

  /**
   * styles
   */
  const classes = usePaperStyles();

  return (
    <>
      <Typography variant="subtitle2" gutterBottom align="center" style={{ marginTop: '30px' }}>
        Choose tags:
      </Typography>
      <div className={classes.tagsScrollBoxWrapper}>
        <div className={classes.tagsScrollBox}>
          {selectedAllTags.map(tag => {
            let colorVariant: {
              color: PropTypes.Color;
              variant: 'default' | 'outlined';
            };

            if (choosenTags.includes(tag.key)) {
              colorVariant = {
                color: 'primary',
                variant: 'default',
              };
            } else {
              colorVariant = {
                color: 'default',
                variant: 'outlined',
              };
            }

            return (
              <Chip
                {...colorVariant}
                size="small"
                key={tag.key}
                label={tag.name}
                onClick={() => handleTagChange(tag.key)}
              />
            );
          })}
        </div>

        <IconButton aria-label="add" onClick={e => handleOpen(e, 'plus')}>
          <PlusOneIcon />
        </IconButton>
        <IconButton aria-label="remove" onClick={e => handleOpen(e, 'minus')}>
          <ExposureNeg1Icon />
        </IconButton>

        <Popover
          id={plusId}
          open={plusOpen}
          anchorEl={plusAnchor}
          onClose={() => handleClose('plus')}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <MarginAutoBox cssProperties={{ width: '80%', padding: '20px' }}>
            <form onSubmit={handleAddTag}>
              <TextField
                id="add-tag"
                label="New tag"
                name="addTagRef"
                inputRef={addTagRef}
                style={{ marginBottom: 10 }}
              />
              <Button type="submit" variant="contained" color="primary">
                Add
              </Button>
            </form>
          </MarginAutoBox>
        </Popover>

        <Popover
          id={minusId}
          open={minusOpen}
          anchorEl={minusAnchor}
          onClose={() => handleClose('minus')}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <MarginAutoBox cssProperties={{ width: '80%', padding: '20px' }}>
            <>
              <div className={classes.tagsScrollBoxWrapper}>
                <Typography variant="subtitle2" gutterBottom align="center" style={{ marginTop: '30px' }}>
                  Remove tag from your list of tags
                </Typography>
                <div className={classes.tagsScrollBox}>
                  {selectedAllTags.map(tag => {
                    const variant = tagsToRemove.includes(tag.key) ? 'default' : 'outlined';
                    return (
                      <Chip
                        size="small"
                        variant={variant}
                        key={tag.key}
                        color="secondary"
                        label={tag.name}
                        onClick={() => handleTagChange(tag.key, 'remove')}
                      />
                    );
                  })}
                </div>
                <Button variant="contained" color="primary" onClick={handleRemovetags}>
                  Confirm
                </Button>
              </div>
            </>
          </MarginAutoBox>
        </Popover>
      </div>
    </>
  );
};

export default TagsChooser;
