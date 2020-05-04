export const generateAutoIncrementalArrayFromMinToMax = (min, max) => {
  return new Array(max - min + 1).fill().map((number, index) => min + index);
};
