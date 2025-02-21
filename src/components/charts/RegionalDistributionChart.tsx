/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useRef } from 'react';
import { useDataSourceState } from '../../context/DataSourceContext';
import { IMusicRecordGrid } from '../../models/DataModel';
import Highcharts, { DataLabelsOptions } from 'highcharts';
import { ICommonChartProps } from './CommonChartProps';
import { cornFlowerBlueComplIdx, cornFlowerBlueIdx } from '../../constants';
import { FortClient } from '../../models/FortClient';
import { MusicChart } from '../MusicChart';
import HighchartsReact from 'highcharts-react-official';

const RegionalDistributionChart: React.FC<ICommonChartProps> = (props) => {
  const chartComponent = useRef<HighchartsReact.RefObject>(null);
  const dataSource: IMusicRecordGrid[] = useDataSourceState();
  const selectedYear = props.selectedYear;
  const songsInYear = dataSource.filter(
    (song) =>
      song.source.date?.getFullYear() === selectedYear && song.source.client
  );
  const getYearlyRegionalCount = (region: FortClient): number => {
    return songsInYear.filter((song) => song.source.client?.includes(region))
      .length;
  };
  const yearlyBR = getYearlyRegionalCount(FortClient.BattleRoyale);
  const yearlyOverseas = songsInYear.length - yearlyBR;

  const options: Highcharts.Options = {
    chart: {
      type: 'pie',
      styledMode: true,
    },
    title: {
      text: 'Distribution of song mode',
    },
    series: [
      {
        id: 'domesticVsOverseas',
        name: 'Total Songs',
        type: 'pie',
        data: [
          { name: 'Domestic', colorIndex: cornFlowerBlueIdx, y: yearlyBR },
          {
            name: 'Battle Royale',
            colorIndex: cornFlowerBlueComplIdx,
            y: yearlyOverseas,
          },
        ],
        size: '70%',
        dataLabels: {
          enabled: false,
        },
      },
      {
        id: 'regional',
        name: 'Songs',
        type: 'pie',
        data: [
          {
            name: 'Other Modes',
            colorIndex: cornFlowerBlueIdx,
            y: yearlyBR,
          },
          {
            name: 'Save The World',
            y: getYearlyRegionalCount(FortClient.SaveTheWorld),
          },
          {
            name: 'Creative',
            y: getYearlyRegionalCount(FortClient.Creative),
          },
          {
            name: 'Events',
            y: getYearlyRegionalCount(FortClient.Events),
          },
          {
            name: 'Rocket Racing',
            y: getYearlyRegionalCount(FortClient.RocketRacing),
          },
          {
            name: 'LEGO Fortnite',
            y: getYearlyRegionalCount(FortClient.LegoFortnite),
          },
          {
            name: 'LEGO Brick Life',
            y: getYearlyRegionalCount(FortClient.LegoBrickLife),
          },
          {
            name: 'Fortnite Festival',
            y: getYearlyRegionalCount(FortClient.FortniteFestival),
          },
          {
            name: 'Trailers',
            y: getYearlyRegionalCount(FortClient.Promos),
          },
        ],
        size: '100%',
        innerSize: '70%',
        dataLabels: {
          formatter: function (options: DataLabelsOptions): string | undefined {
            if (!this.y) return undefined;
            return this.key;
          },
        },
      },
    ],
  };

  return (
    <MusicChart
      styles={css`
        width: 35vw;
        flex: 1;
      `}
      options={options}
      chartComponent={chartComponent}
    />
  );
};

export default RegionalDistributionChart;
