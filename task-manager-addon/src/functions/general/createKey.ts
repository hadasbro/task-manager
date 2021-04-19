import slugify from 'slugify';

/**
 * createKey
 *
 * Slugify string with standard setitngs (anum + lowercase + _)
 *
 * @param str - empty mens that we generate new, random key (kind of unique)
 */
export const createKey = (str?: string) => {
  const baseKey = str || `cKey${Date.now()}mr${Math.floor(Math.random() * 1000000000)}`;

  return slugify(baseKey, {
    replacement: '_',
    remove: /[^a-z0-9]+/gi,
    lower: true,
    strict: true,
  });
};
