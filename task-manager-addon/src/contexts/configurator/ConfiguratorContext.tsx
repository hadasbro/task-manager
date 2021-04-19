import { createContext } from 'react';
import { ConfiguratorWizardContext } from './types';
import { configuratorContextDefault } from './defaults';

/**
 * Context
 *
 * CONFIGURATOR WIZZARD CONTEXT
 */
export const ConfiguratorContext = createContext<ConfiguratorWizardContext>(configuratorContextDefault);
