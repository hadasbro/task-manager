import React, { ComponentType, FC } from 'react';
import { Dict } from '../../types/templates/Dict';

/**
 * ExtraProps
 */
export interface ExtraProps {
  extra: Dict<any>;
}

/**
 * Add some extra props to component
 *
 * usage:
 *
 export interface ExtraPropsSpecified {
    extra: {
      extraProp1: string;
      extraProp2: boolean;
    };
  }

 type Component1Props = { prop1: number };

 const Component1: FC<Component1Props> = props => {
    return null;
  };

 // # 1 (extra props any)
 const ExtendedComponent1 = withExtraProps(Component1);

 // # 2 (extra props specified)
 const ExtendedComponent2 = withExtraProps<Component1Props, ExtraPropsSpecified>(Component1);

 // # example
 function test() {
    return <>
      <ExtendedComponent1 prop1={1} extra={{ extraProp1: 'someProp2', extraProp2: 1 }} />
      <ExtendedComponent2 prop1={1} extra={{ extraProp1: 'someProp2', extraProp2: true }} />
      </>;
  }
 *
 * @param Component
 */
export const withExtraProps = <P1 extends object, P2 extends ExtraProps>(
  Component: ComponentType<P1>,
): FC<P1 & P2> => ({ extra, ...props }: P2) => {
  return <Component {...(props as P1)} />;
};
