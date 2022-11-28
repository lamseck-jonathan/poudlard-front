import { Test } from 'src/model/Test.interface';

/**
 * @desc calcule la total des durées des tests
 */
export function totalDuree(tests: Test[]) {
  let totalDuree = 0;

  for (const test of tests) {
    totalDuree += test.duree;
  }

  return totalDuree;
}

/**
 * @desc calcule la total des points des tests
 */
export function totalPoint(tests: Test[]) {
  let totalPoint = 0;

  for (const test of tests) {
    totalPoint += test.bareme;
  }

  return totalPoint;
}
