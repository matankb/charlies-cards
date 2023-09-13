/**
 * Acts identical to to Array.prototype.filter, but the callback can be async
 */
export async function filter<T>(arr: T[], callback: (element: T) => Promise<boolean>): Promise<T[]> {
  const fail = Symbol()
  const promises = arr.map(async item => (await callback(item)) ? item : fail)
  const results = await Promise.all(promises);
  return results.filter(i=>i !== fail) as T[]
}
