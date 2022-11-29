// Конвертирует имя типа в CamelCase ('name_one' | 'name_two' -> 'NameOne' | 'NameTwo')
export type SnakeToCamelCase<S> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S;

// Конвертирует имя типа в sake_case ('NameOne' | 'NameTwo' -> 'name_one' | 'name_two')
export type CamelToSnakeCase<T, P extends string = ''> = string extends T
  ? string
  : T extends `${infer C0}${infer R}`
    ? CamelToSnakeCase<R, `${P}${C0 extends Lowercase<C0> ? '' : '_'}${Lowercase<C0>}`>
    : P;

export type PropType<O, K extends keyof O> = O[K];

export type FieldsToSnakeCase<T extends object> = {
  [key in keyof T as CamelToSnakeCase<key>]: T[key];
};

export type FieldsToCamelCase<T extends object> = {
  [key in keyof T as CamelToSnakeCase<key>]: T[key];
};

export type TypeValues<T extends object> = T[keyof T];
