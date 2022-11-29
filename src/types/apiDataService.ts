import { AnyFilter } from './service';

export enum SERVICE_API_DATA_KEY {
  GENERAL = 'general',
}

export type GeneralApiData = {
  siteUrl: string;
};

export type ApiDataType<T extends SERVICE_API_DATA_KEY> = {
  [SERVICE_API_DATA_KEY.GENERAL]: GeneralApiData;
}[T];

export type ApiRequestParams<T extends SERVICE_API_DATA_KEY> = {
  [SERVICE_API_DATA_KEY.GENERAL]?: AnyFilter;
}[T];
