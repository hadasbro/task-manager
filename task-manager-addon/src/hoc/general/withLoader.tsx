import React, { ComponentType, FC } from 'react';
import LoadingWrapper from '../../components/atoms/LoadingWrapper/LoadingWrapper';
import LoadingIndicator from '../../components/atoms/LoadingIndicator/LoadingIndicator';

interface WithLoadingProps {
  loading: boolean;
}

/**
 * withLoader
 *
 * HOC adding loader to component
 *
 usage:

 const MyComponent: FC<{ prop1: number }> = () => {
    return null;
  };

 const ComponentWithLoader = withLoader(MyComponent);

 const NewComponent = () => (<ComponentWithLoader loading prop1={10} />)

 * @param Component
 */
const withLoader = <P extends object>(Component: ComponentType<P>): FC<P & WithLoadingProps> => ({
  loading,
  ...props
}: WithLoadingProps) =>
  loading ? (
    <LoadingWrapper>
      <LoadingIndicator />
    </LoadingWrapper>
  ) : (
    <Component {...(props as P)} />
  );
