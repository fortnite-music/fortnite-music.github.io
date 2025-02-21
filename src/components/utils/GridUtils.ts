import { CellClassParams, CellStyle } from 'ag-grid-community';
import { rgba, complement } from 'polished';
import { cornFlowerBlue } from '../../constants';
import { FortClient } from '../../models/FortClient';

export const ClientVersionCellStyle = (params: CellClassParams): CellStyle => {
  if (!params.value) return {};
  const color = rgba(cornFlowerBlue, 0.5);
  return {
    backgroundColor: params.value.startsWith(FortClient.BR)
      ? color
      : complement(color),
  };
};
