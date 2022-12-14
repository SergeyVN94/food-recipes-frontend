import { AxiosRequestConfig } from 'axios';

export type ServiceApiResponse = {
  error?: Error;
  metadata?: unknown;
  success: boolean;
  cancel?: boolean;
};

export type ServiceApiResponseWithData<K, T = unknown> = {
  data?: K;
  metadata?: T
} & ServiceApiResponse;

export type ApiRequestResult = {
  success: boolean;
  data?: unknown;
  error?: Error;
  cancel?: boolean;
};

export type ApiRequestFunc = (
  requestConfig: AxiosRequestConfig,
  replaceConfig?: {
    attempts?: number;
    timeout?: number;
  },
) => Promise<ApiRequestResult>;
