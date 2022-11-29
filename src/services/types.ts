import { AxiosResponse } from 'axios';

export type ServiceApiResponse = {
  error?: Error;
  metadata?: unknown;
  success: boolean;
  response?: AxiosResponse<unknown>;
  cancel?: boolean;
};

/**
 * K - тип data
 * T - тип metadata
 */
export type ServiceApiResponseWithData<K, T = unknown> = {
  data?: K;
  metadata?: T
} & ServiceApiResponse;

export type ApiRequestResult = {
  success: boolean;
  response?: AxiosResponse<unknown>;
  data?: unknown;
  error?: Error;
  cancel?: boolean;
};
