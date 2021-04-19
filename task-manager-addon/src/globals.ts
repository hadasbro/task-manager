/* eslint-disable @typescript-eslint/no-unused-vars */
/*
File is stores global interfaces and JS API extensions version of globals.d.ts
This is the same thing as "Global Types" e.g. "global.d.ts"

@see https://github.com/Microsoft/TypeScript/issues/14788
@see https://stackoverflow.com/questions/42233987/
*/

/**
 * MD extensions
 */
// @ts-ignore
declare module '@material-ui/core/styles/withStyles' {
  // Augment the BaseCSSProperties so that we can control jss-rtl
  interface BaseCSSProperties {
    /*
     * Used to control if the rule-set should be affected by rtl transformation
     */
    flip?: boolean;
  }
}

type LayoutColors = 'inherit' | 'primary' | 'secondary';

type LayoutColorsExtendedDisabled = LayoutColors | 'grey' | 'disabled';

type LayoutColorsExtended = LayoutColors | 'grey';

type LayoutColorsDisabled = LayoutColors | 'disabled';
