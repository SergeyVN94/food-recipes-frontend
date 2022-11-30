export const sleep = (milliseconds: number) => (
  new Promise(r => { setTimeout(r, milliseconds); })
);

export const includes = <T extends U, U>(
  coll: ReadonlyArray<T>,
  el: U,
): el is T => coll.includes(el as T);
