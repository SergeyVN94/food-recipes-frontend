export type PaginationFilter = { page?: number; part?: number; };
export type QueryFilter = { query?: string; };
export type AnyFilter = { [key: string]: unknown };

export interface IAuthenticationService {
  authentication(email: string, password: string): Promise<{ access: string }>;
}

// сервис для неудаляемых данных, например настройки сайта
export interface IApiDataService<T> {
  fetch(): Promise<{ error: Error; } | { data: T; }>;
  update(item: T): Promise<{ error: Error; } | { item: T }>;
}

export interface IListService<Item extends { id: unknown }, Filter> {
  fetchItems(filter?: Filter): Promise<{ error: Error; } | { data: Item[]; metadata?: unknown }>;
  save(item: Item & { id: null }): Promise<{ error?: Error; } | { item: Item }>;
  update(item: Item): Promise<{ error: Error; } | { item: Item }>;
  delete(id: Item['id']): Promise<{ error?: Error; }>;
}
