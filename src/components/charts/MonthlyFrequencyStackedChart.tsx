/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useMemo, useRef } from 'react';
import { getMonth } from 'date-fns';
import { useDataSourceState } from '../../context/DataSourceContext';
import { IMusicRecordGrid } from '../../models/DataModel';
import { MusicChart } from '../MusicChart';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { FortClient } from '../../models/FortClient';
import { get } from 'lodash-es';
import { useTranslation } from 'react-i18next';
import { START_YEAR } from '../utils/ChartUtils';

type ClientBucket = { [key in FortClient]: number[] };
const getEmptyBucket = (): ClientBucket => ({
  STW: new Array(12).fill(0),
  BR: new Array(12).fill(0),
  CR: new Array(12).fill(0),
  EVT: new Array(12).fill(0),
  RR: new Array(12).fill(0),
  LEGO: new Array(12).fill(0),
  BL: new Array(12).fill(0),
  FF: new Array(12).fill(0),
  YT: new Array(12).fill(0),
});
const allClients = ['STW', 'BR', 'CR', 'EVT', 'RR', 'LEGO', 'BL', 'FF', 'YT'];

function getClient(clientSource: string) {
  if (!clientSource) return 'None';
  for (const c of allClients) {
    if (clientSource.includes(c)) {
      return c;
    }
  }
  return 'None';
}

function getMonthsForLocale(locale = 'en-US') {
  const format = new Intl.DateTimeFormat(locale, { month: 'long' }).format;
  return [...Array(12).keys()].map((m) =>
    format(new Date(Date.UTC(START_YEAR, (m + 1) % 12)))
  );
}

const MonthlyFrequencyStackedChart: React.FC = () => {
  const { i18n } = useTranslation();
  const chartComponent = useRef<HighchartsReact.RefObject>(null);
  const dataSource: IMusicRecordGrid[] = useDataSourceState();
  const monthlyFreq = useMemo(() => {
    return dataSource.reduce((bkt: ClientBucket, current) => {
      const currentClient = getClient(current.source.client);
      const currentMonth = getMonth(current.source.date ?? 0);
      const currentVersionArr = get(bkt, currentClient);
      if (currentVersionArr) {
        currentVersionArr[currentMonth] += 1;
      }
      return bkt;
    }, getEmptyBucket());
  }, [dataSource]);

  const options: Highcharts.Options = {
    chart: {
      type: 'area',
      styledMode: true,
    },
    title: {
      text: 'Song frequency per month (all years)',
    },
    xAxis: {
      categories: getMonthsForLocale(i18n.language),
    },
    yAxis: [
      {
        title: {
          text: 'Songs',
        },
        allowDecimals: false,
      },
    ],
    tooltip: {
      shared: true,
    },
    plotOptions: {
      area: {
        stacking: 'normal',
      },
    },
    series: allClients.map((client) => ({
      name: client,
      type: 'area',
      yAxis: 0,
      visible:
        client === FortClient.STW ||
        client === FortClient.BR ||
        client === FortClient.CR,
      data: get(monthlyFreq, client),
    })),
  };

  return (
    <MusicChart
      styles={css`
        width: 35vw;
        flex: 2;
      `}
      options={options}
      chartComponent={chartComponent}
    />
  );
};

export default MonthlyFrequencyStackedChart;
