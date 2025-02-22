/** @jsxImportSource @emotion/react */
import { Fragment } from 'react';
import { css } from '@emotion/react';

interface IHeader {
  noText?: boolean;
}

export const Header: React.FC<IHeader> = ({ noText }) => {
  return (
    <Fragment>
      <div>
        <img
          css={css`
            display: block;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 10px;
          `}
          id="header-logo"
          src="assets/zero-point.png"
          alt="header logo"
        />
      </div>
      {noText ? null : (
        <div>
          <p>
            Welcome to the Fortnite Music Archive. This site provides a complete
            listing of the background music used in Fortnite and all of it's
            modes and events, going all the way back from 2014 to present day.
          </p>
        </div>
      )}
    </Fragment>
  );
};
