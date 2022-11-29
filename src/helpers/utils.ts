export const includes = <T extends U, U>(
  coll: ReadonlyArray<T>,
  el: U,
): el is T => coll.includes(el as T);

export const sleep = async (time: number) => (new Promise(r => { setTimeout(r, time); }));
