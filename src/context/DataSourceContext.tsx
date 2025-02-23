import React, { useEffect } from 'react';
import { parseISO } from 'date-fns';
import {
  IMusicRecordGrid,
  IMusicRecordJson,
  IMusicRecordSourceGrid,
} from '../models/DataModel';
import { useSettings } from './SettingsContext';
import { useSetAtom } from 'jotai';
import { IPlaylist } from '../models/Playlist';
import { playlistMapAtom } from '../state/playlist';
import { convertToPlaylistMap } from '../components/utils/PlaylistUtils';
import { hotTracksAtom } from '../state/hot';
import { IHotTrackResponse } from '../models/HotTracks';

type State = IMusicRecordGrid[];
type DataSourceProviderProps = { children: React.ReactNode };

const DataSourceStateContext = React.createContext<State | undefined>(
  undefined
);

const buildClientVersion = (
  client: string,
  version: string,
  date: Date | null
) => {
  return `${client} ${version}`;
};

export const DataSourceProvider: ({
  children,
}: DataSourceProviderProps) => React.ReactElement = ({ children }) => {
  const [state, setState] = React.useState<State>([]);
  const setPlaylistMap = useSetAtom(playlistMapAtom);
  const setHotTracks = useSetAtom(hotTracksAtom);
  const { settings } = useSettings();

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/fortnite-music/fortnitebgm-db/main/bgm.min.json'
    )
      .then((result) => result.json())
      .then((rowData: IMusicRecordJson[]) => {
        const rowDataGrid: IMusicRecordGrid[] = rowData
          .filter((song) => {
            return settings.hideMinorTracks
              ? !song.decoration?.minorTrack ?? true
              : true;
          })
          .filter((song) => {
            return settings.hidePromoTracks
              ? !song.decoration?.promoTrack ?? true
              : true;
          })
          .map((song: IMusicRecordJson) => {
            const date = song.source.date ? parseISO(song.source.date) : null;
            const source: IMusicRecordSourceGrid = {
              client: song.source.client,
              date,
              structure: song.source.structure,
              version: song.source.version,
              clientVersion:
                song.source.client && song.source.version
                  ? buildClientVersion(
                      song.source.client,
                      song.source.version,
                      date
                    )
                  : '',
            };
            const gridRecord: IMusicRecordGrid = Object.assign({}, song, {
              source: source,
            });
            return gridRecord;
          });
        setState(rowDataGrid);
      });
    fetch(
      'https://raw.githubusercontent.com/fortnite-music/fortnitebgm-db/main/playlist.min.json'
    )
      .then((result) => result.json())
      .then((playlist: IPlaylist[]) => {
        setPlaylistMap(convertToPlaylistMap(playlist));
      });
    fetch('https://raw.githubusercontent.com/fortnite-music/stats/top25.json')
      .then((result) => result.json())
      .then((response: IHotTrackResponse) => {
        setHotTracks(response.data);
      })
      .catch((e) => {
        console.error('Error parsing hot tracks.', e);
      });
  }, [
    setState,
    settings.hideMinorTracks,
    settings.hidePromoTracks,
    setPlaylistMap,
    setHotTracks,
  ]);

  return (
    <DataSourceStateContext.Provider value={state}>
      {children}
    </DataSourceStateContext.Provider>
  );
};

export const useDataSourceState: () => State = () => {
  const context = React.useContext(DataSourceStateContext);
  if (!context) {
    throw new Error(
      'useDataSourceState must be used within a DataSourceProvider'
    );
  }
  return context;
};
