/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { RoutePage } from '../../../types/interfaces/routing/RoutePage';

enum Style {
  NAV_BAR_HEIGHT = '4rem',
}

const Wrapper = styled.div`
  height: calc(100vh - ${Style.NAV_BAR_HEIGHT});
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`;

const Title = styled.div`Ó
  font-weight: bold;
  color: ${p => p.theme.text};
  font-size: 3.375rem;

  span {
    font-size: 3.125rem;
  }
`;

/**
 * NotFound
 *
 * @param meta
 * @param section
 * @constructor
 */
const NotFound: FC<RoutePage> = ({ meta }) => {
  const { title, description } = meta;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      <Wrapper>
        <Title>
          4
          <span role="img" aria-label="Crying Face">
            😢
          </span>
          4
        </Title>
        <p>Page not found.</p>

        {/* <Link to={`${process.env.PUBLIC_URL}/`}>Return to Home Page</Link> */}
      </Wrapper>
    </>
  );
};

// noinspection JSUnusedGlobalSymbols
export default NotFound;
