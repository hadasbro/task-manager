/* eslint-disable react/destructuring-assignment */
import React, { FC, MouseEvent } from 'react';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ViewListIcon from '@material-ui/icons/ViewList';
import SpeakerNotesOffIcon from '@material-ui/icons/SpeakerNotesOff';
import TextRotateUpIcon from '@material-ui/icons/TextRotateUp';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { useSAppearancetyles } from '../../../styles/styles/modules';
import { SettingsInterface } from '../../../types/interfaces/objects/Setting';
import { ListBlocksOpts } from '../../../init/enums/settings/ListBlocksOpts';

/**
 * AppearanceQuickOptions
 *
 * here, execptionally we dont destruct props
 *
 * @param props
 * @constructor
 */
const AppearanceQuickOptions: FC<SettingsInterface & { onUpdateHandler: any }> = props => {
  const classes = useSAppearancetyles();

  const handleChoose = (event: MouseEvent<HTMLElement>, val: string, key: string) => {
    if (key === 'largeFonts' || key === 'showDescription' || key === 'dblClickDetails') {
      props.onUpdateHandler({ [key]: !props[key] });
    } else {
      props.onUpdateHandler({ [key]: val });
    }
  };

  return (
    <Paper variant="outlined" className={classes.paper}>
      <ToggleButtonGroup
        size="small"
        title="Large fonts"
        aria-label="Large fonts"
        onChange={(e, v) => handleChoose(e, v, 'largeFonts')}
      >
        <ToggleButton size="small" value={props.largeFonts} aria-label="large-fonts">
          {/* Large Fonts */}
          <TextRotateUpIcon fontSize="small" color={props.largeFonts ? 'action' : 'disabled'} />
        </ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        size="small"
        title="Double click shows details"
        aria-label="Double click shows details"
        onChange={(e, v) => handleChoose(e, v, 'dblClickDetails')}
      >
        <ToggleButton size="small" value={props.dblClickDetails} aria-label="large-window">
          {/* Double click shows details */}
          <PostAddIcon fontSize="small" color={props.dblClickDetails ? 'action' : 'disabled'} />
        </ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        size="small"
        title="Hide descriptions"
        aria-label="Hide descriptions"
        onChange={(e, v) => handleChoose(e, v, 'showDescription')}
      >
        <ToggleButton size="small" value={false} selected={!props.showDescription}>
          {/* Task description on tasksList list */}
          <SpeakerNotesOffIcon
            fontSize="small"
            color={props.showDescription ? 'disabled' : 'action'}
            style={{ fontSize: '1.0rem' }}
          />
        </ToggleButton>
      </ToggleButtonGroup>

      <Divider flexItem orientation="vertical" className={classes.divider} />

      <ToggleButtonGroup
        size="small"
        title="List or blocks view"
        aria-label="List or blocks view"
        exclusive
        onChange={(e, v) => handleChoose(e, v, 'listBlock')}
      >
        <ToggleButton
          value={ListBlocksOpts.BLOCK}
          aria-label="Blocks"
          selected={props.listBlock === ListBlocksOpts.BLOCK}
        >
          {/* Show blocks view */}
          <ViewModuleIcon
            fontSize="small"
            color={props.listBlock === ListBlocksOpts.BLOCK ? 'action' : 'disabled'}
            style={{ fontSize: '1.14rem' }}
          />
        </ToggleButton>

        <ToggleButton value={ListBlocksOpts.LIST} aria-label="List" selected={props.listBlock === ListBlocksOpts.LIST}>
          {/* Show List view */}
          <ViewListIcon
            fontSize="small"
            color={props.listBlock === ListBlocksOpts.LIST ? 'action' : 'disabled'}
            style={{ fontSize: '1.14rem' }}
          />
        </ToggleButton>
      </ToggleButtonGroup>
    </Paper>
  );
};

export default AppearanceQuickOptions;
