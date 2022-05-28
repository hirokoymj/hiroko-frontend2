export const calculateDiff = (array: number[]) => {
  const result = array.reduce(
    (acc: number[], curr: number, i: number, src: number[]) => {
      if (i !== 0) acc.push(curr - src[i - 1]);
      return acc;
    },
    []
  );
  return result;
};
