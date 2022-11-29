/**
 * @desc convert ms to time (ex: 10000 => 00:00:10)
 */
export const msToTime = (ms: number): string => {
  return String(new Date(Number(ms)).toISOString().slice(11, 19));
};
