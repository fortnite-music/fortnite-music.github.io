/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import GitHubButton from 'react-github-btn';

const AboutPage: React.FC = () => (
  <div>
    <div
      css={css`
        @media (min-width: 1024px) {
          margin-right: 33vw;
        }
      `}
    >
      <h2>About</h2>
      <p>
		This website archives and catalogs music from every gamemode and version
		of Fortnite and aims to be the most complete resource of Fortnite music.
		It will be updated whenever new tracks get added to the game, and any
		info will be added accordingly.
		</b>
		This site was based off of the MapleStory Music DB by SlipySlidy, with
		the majority of the codebase being based off of theirs, the most similar
		thing being the website. The database is the most different, as it
		encompasses Fortnite rather than MapleStory. If you have any questions or
		concerns, please feel free to contact me at contact@kobacat.com.
      </p>
      <h6>
        <b>Music Playback</b>
      </h6>
      <p>
        Music is played within an embedded YouTube player. The track is looped
        upon completion, unless in the shuffled queue mode (see below).
      </p>
      <h6>
        <b>Shuffled Queue</b>
      </h6>
      <p>
        The shuffled queue feature randomizes the entire music collection and
        plays upcoming songs automatically. Skip to the next track or return to
        the previous track with the controls under the media player. When
        filters are applied to the grid, the song pool is limited to the
        filtered entries.
      </p>
      <h6>
        <b>Grid Controls</b>
      </h6>
      <p>
        To sort by a column, press the column header. Hover over a column header
        and press the menu icon to access the advanced filter dialog. Mobile
        users can access the filter dialog by pressing and holding the column
        header.
      </p>
      <h6>
        <b>Language</b>
      </h6>
      <p>
        Language support is a work in progress. Changing the language will
        translate metadata displayed for the songs in the grid. If there are no
        translations for an entry, English will be used as the default language.
      </p>
    </div>
    <h2>Source</h2>
	<p>The following GitHub projects were the basis for this site.</p>
    <div className="gh-project-entry">
      <GitHubButton
        href="https://github.com/maplestory-music/maplebgm-db"
        data-size="large"
        data-show-count={true}
        aria-label="Star maplestory-music/maplebgm-db on GitHub"
      >
        Star
      </GitHubButton>
      <h5 className="gh-project-name">
        maplebgm-db: Definitive MapleStory music database
      </h5>
    </div>
    <div className="gh-project-entry">
      <GitHubButton
        href="https://github.com/maplestory-music/maplestory-music.github.io"
        data-size="large"
        data-show-count={true}
        aria-label="Star maplestory-music/maplestory-music.github.io on GitHub"
      >
        Star
      </GitHubButton>
      <h5 className="gh-project-name">
        maplestory-music: MapleStory Music website
      </h5>
    </div>
    <p>The following GitHub projects are the source of site.</p>
    <div className="gh-project-entry">
      <GitHubButton
        href="https://github.com/fortnite-music/fortnitebgm-db"
        data-size="large"
        data-show-count={true}
        aria-label="Star fortnite-music/fortnitebgm-db on GitHub"
      >
        Star
      </GitHubButton>
      <h5 className="gh-project-name">
        fortnitebgm-db: Definitive Fortnite music database
      </h5>
    </div>
    <div className="gh-project-entry">
      <GitHubButton
        href="https://github.com/fortnite-music/fortnite-music.github.io"
        data-size="large"
        data-show-count={true}
        aria-label="Star fortnite-music/fortnite-music.github.io on GitHub"
      >
        Star
      </GitHubButton>
      <h5 className="gh-project-name">
        fortnite-music: Fortnite Music website
      </h5>
    </div>
  </div>
);

export default AboutPage;
