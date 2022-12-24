export type PaginationFilter = { page?: number; part?: number; };
export type QueryFilter = { query?: string; };
export type AnyFilter = { [key: string]: unknown };

export interface IAuthenticationService {
  authentication(email: string, password: string): Promise<{ access: string }>;
}

// сервис для неудаляемых данных, например настройки сайта
export interface IApiDataService<T, P = T> {
  fetch(): Promise<{ error: Error; } | { data: T; }>;
  update(payload: P): Promise<{ error: Error; } | { item: T }>;
}

export interface IListService<
  Item extends { id: unknown },
  Filter,
  Payload = Omit<Item, 'id'>,
> {
  fetchItems(filter?: Filter): Promise<{ error: Error; } | { data: Item[]; metadata?: unknown }>;
  save(payload: Payload): Promise<{ error?: Error; } | { item: Item }>;
  update(payload: Payload & { id: Item['id'] }): Promise<{ error: Error; } | { item: Item }>;
  delete(id: Item['id']): Promise<{ error?: Error; }>;
}
