import { useCallback, useState } from 'react';

/**
 * useToggle
 * @param init
 */
export const useToggle = (init = false): [boolean, () => void] => {
  const [open, setOpen] = useState(init);

  const toggle = useCallback(() => setOpen(open => !open), []);

  return [open, toggle];
};
