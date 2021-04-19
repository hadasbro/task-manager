import React from 'react';
import { render } from '@testing-library/react';
import { lazyLoad } from '../loadable/loadable';

const LoadingIndicator = () => <div>Loading</div>;

const LazyComponenWithDefaultExport = lazyLoad(() => import('../../../internals/testing/loadable.mock'));

const LazyComponentWithExportedFunction = lazyLoad(
  () => import('../../../internals/testing/loadable.mock'),
  module => module.ExportedFunc,
);

const LazyComponentWithFallback = lazyLoad(() => import('../../../internals/testing/loadable.mock'), undefined, {
  fallback: <LoadingIndicator />,
});

describe('loadable', () => {
  it('should component null by default', () => {
    const {
      container: { firstChild },
    } = render(<LazyComponenWithDefaultExport />);
    expect(firstChild).toMatchSnapshot();
  });

  it('should component null by default with empty options', () => {
    const {
      container: { firstChild },
    } = render(<LazyComponentWithExportedFunction />);
    expect(firstChild).toMatchSnapshot();
  });

  it('should component fallback if given one', () => {
    const {
      container: { firstChild },
    } = render(<LazyComponentWithFallback />);
    expect(firstChild).toMatchSnapshot();
  });

  it('should component LazyComponent after waiting for it to load', async () => {
    const {
      container: { firstChild },
    } = render(<LazyComponentWithExportedFunction />);
    LazyComponentWithExportedFunction({});
    expect(firstChild).toMatchSnapshot();
  });
});
