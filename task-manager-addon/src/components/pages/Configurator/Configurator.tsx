/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import ConfiguratorWizzard from '../../templates/ConfiguratorWizzard/ConfiguratorWizzard';
import AppContainer from '../../templates/AppContainer/AppContainer';
import { RoutePage } from '../../../types/interfaces/routing/RoutePage';

/**
 * Configurator
 *
 * @param meta
 * @param section
 * @constructor
 */
const Configurator: FC<RoutePage> = ({ meta, section }) => {
  const { title, description } = meta;
  const { headerTitle, showSearchBar } = section;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      <AppContainer title={headerTitle} showSearchBar={showSearchBar}>
        <ConfiguratorWizzard />
      </AppContainer>
    </>
  );
};

// noinspection JSUnusedGlobalSymbols
export default Configurator;
