export const sumArrayNumber = (numbers: number[]) =>
  numbers.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  });
