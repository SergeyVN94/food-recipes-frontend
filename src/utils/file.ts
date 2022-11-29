import _ from 'lodash';

export enum DataSizeUnits { 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' }
export enum DataSizeUnitsSi { 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB' }

type DataSizeUnitsTranslate = { [key in number]?: string };
// перевод для единиц измерения размера файла
export const DataSizeUnitsTranslateRu: DataSizeUnitsTranslate = {
  [DataSizeUnits.kB]: 'кб',
  [DataSizeUnits.MB]: 'Мб',
  [DataSizeUnits.GB]: 'ГБ',
  [DataSizeUnits.TB]: 'ТБ',
};

/**
 * Format bytes as human-readable text.
 *
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 *
 * @return Formatted string.
 */
export const humanFileSize = (
  bytes: number,
  si = false,
  dp = 0,
  translate = DataSizeUnitsTranslateRu,
) => {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) return `${bytes} B`;

  const units = si ? DataSizeUnitsSi : DataSizeUnits;
  const unitsSize = Object.keys(units).length;
  let u = -1;
  const r = 10 ** dp;

  let bytesRes = bytes;

  do {
    bytesRes /= thresh;
    u += 1;
  } while (Math.round(Math.abs(bytesRes) * r) / r >= thresh && u < unitsSize - 1);

  const unit = units[u];
  const ext = (translate && translate[u]) ? translate[u] : unit;

  return `${bytesRes.toFixed(dp)} ${ext}`;
};

/**
 * Format bytes as human-readable text.
 *
 * @param bytes Number of units.
 * @param unit DataSizeUnit (example DataSizeUnits.MB)
 * @param si True to use metric (SI) units, aka powers of 1000. False to use
 *           binary (IEC), aka powers of 1024.
 * @return count of bytes
 */
export const fileSizeToBites = (
  value: number,
  unit: DataSizeUnits | DataSizeUnitsSi,
  si = false,
) => {
  let result = value;
  for (let i = 0; i <= unit; i += 1) result *= (si ? 1000 : 1024);

  return result;
};
