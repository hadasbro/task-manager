/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import AppContainer from '../../templates/AppContainer/AppContainer';
import SettingsContainer from '../../organisms/SettingsContainer/SettingsContainer';
import { RoutePage } from '../../../types/interfaces/routing/RoutePage';

/**
 * AppSettings
 *
 * @param meta
 * @param section
 * @constructor
 */
const AppSettings: FC<RoutePage> = ({ meta, section }) => {
  const { title, description } = meta;
  const { headerTitle, showSearchBar } = section;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      <AppContainer title={headerTitle} showSearchBar={showSearchBar}>
        <SettingsContainer />
      </AppContainer>
    </>
  );
};

export default AppSettings;
