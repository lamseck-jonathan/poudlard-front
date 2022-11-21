/**
 * @desc return if val1 include val2
 */
export const stringInclude = (val1: string, val2: string): boolean =>
  val1.toLowerCase().includes(val2.toLowerCase());
