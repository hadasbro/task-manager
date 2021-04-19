import { StoreException } from '../../../exceptions/store/StoreException';

/**
 * AppLoggerActionTechError
 */
export type AppLoggerActionTechError = {
  error: Error | StoreException | string;
};
