import React, { ChangeEvent, FC, ReactNode, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsInputCompositeIcon from '@material-ui/icons/SettingsInputComposite';
import Box from '@material-ui/core/Box';
import { updateSettingsSagaAction } from 'store/saga/actionEffects/settings/updateSettingsSaga';
import { settingsSliceActions } from 'store/redux/slices/settingsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { apiConfigSliceActions } from 'store/redux/slices/apiConfigSlice';
import { usePaperStyles } from '../../../styles/styles/modules';
import SettingsForm from '../../molecules/SettingsConfig/SettingsForm';
import ConfigForm from '../../molecules/SettingsConfig/ConfigForm';
import { selectSettings } from '../../../store/selectors/settingsSelectors';
import { selectConfig } from '../../../store/selectors/apiConfigSelectors';
import ApiConfigInterface from '../../../types/interfaces/objects/Config';
import { SettingsInterface } from '../../../types/interfaces/objects/Setting';

/**
 * Props
 */
interface TabPanelProps {
  children?: ReactNode;
  index: any;
  value: any;
}

/**
 * TabPanel
 *
 * @param props
 * @constructor
 */
const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

/**
 * a11yProps
 *
 * @param index
 */
const a11yProps = (index: any) => {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
};

/**
 * SettingsContainer
 *
 * @constructor
 */
const SettingsContainer: FC = () => {
  const dispatch = useDispatch();
  const classes = usePaperStyles();

  const selectedSettings = useSelector(selectSettings);
  const selectedConfig = useSelector(selectConfig);

  const [tab, setTab] = useState(0);
  const [settings, setSetting] = useState<SettingsInterface>(selectedSettings);
  const [config, setConfig] = useState<ApiConfigInterface>(selectedConfig);

  /**
   * updateSetting
   *
   * update some settings in the state
   *
   * @param settings
   */
  const updateSetting = (settings: Partial<SettingsInterface>) => {
    setSetting(prev => {
      return { ...prev, ...settings };
    });
  };

  /**
   * handleSettingsSave
   *
   * Update Redux appStore based on settings computed
   * and accumulated in this component's state
   *
   * @param settings
   */
  const handleSettingsSave = (settings: SettingsInterface) => {
    dispatch(updateSettingsSagaAction(settings));
  };

  /**
   * handleSettingsReset
   */
  const handleSettingsReset = () => {
    dispatch(settingsSliceActions.resetSettings());
  };

  /**
   * handleConfigSave
   *
   * @param config
   */
  const handleConfigSave = (config: ApiConfigInterface) => {
    dispatch(apiConfigSliceActions.updateApiConfig(config));
  };

  /**
   * updateConfig
   *
   * @param config
   */
  const updateConfig = (config: Partial<ApiConfigInterface>) => {
    setConfig(prev => {
      return { ...prev, ...config };
    });
  };

  /**
   * handleTabChange
   *
   * @param event
   * @param tab
   */
  const handleTabChange = (event: ChangeEvent<{}>, tab: number) => {
    setTab(tab);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="General settings" icon={<SettingsIcon />} {...a11yProps(0)} />
          <Tab label="API configuration" icon={<SettingsInputCompositeIcon />} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={tab} index={0}>
        <SettingsForm
          settings={settings}
          updateSetting={updateSetting}
          handleSave={handleSettingsSave}
          handleReset={handleSettingsReset}
        />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <ConfigForm config={config} handleSave={handleConfigSave} updateConfig={updateConfig} />
      </TabPanel>
    </div>
  );
};

export default SettingsContainer;
