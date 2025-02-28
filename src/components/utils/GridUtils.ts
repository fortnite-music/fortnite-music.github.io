import { CellClassParams, CellStyle } from 'ag-grid-community';
import { rgba, complement } from 'polished';
import { BRColor } from '../../constants';
import { STWColor } from '../../constants';
import { FortClient } from '../../models/FortClient';

export const ClientVersionCellStyle = (params: CellClassParams): CellStyle => {
  if (!params.value) return {};
  const color = rgba(BRColor, 0.5);
  const color2 = rgba(STWColor, 0.5);
  return {
    backgroundColor: params.value.startsWith(FortClient.BattleRoyale)
      ? color
      : complement(color),
  };
};
