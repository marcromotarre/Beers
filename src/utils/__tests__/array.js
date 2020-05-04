import { generateAutoIncrementalArrayFromMinToMax } from './../array';

describe('generateAutoIncrementalArrayFromMinToMax', () => {
  it('2013,2019', () => {
    expect(generateAutoIncrementalArrayFromMinToMax(2013, 2019)).toEqual([
      2013,
      2014,
      2015,
      2016,
      2017,
      2018,
      2019,
    ]);
  });
});
