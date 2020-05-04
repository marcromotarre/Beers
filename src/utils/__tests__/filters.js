import {
  getMinBrewedDate,
  getMaxBrewedDate,
  getMonths,
  getYearsFromMinToMaxBrewed,
  getBeersByBrewedFromTo,
} from './../filters';
import beers from '../../fixtures/beers';

describe('getMinBrewedDate', () => {
  it('from fixtures', () => {
    expect(getMinBrewedDate(beers)).toEqual({ month: 9, year: 2007 });
  });
});

describe('getMaxBrewedDate', () => {
  it('from fixtures', () => {
    expect(getMaxBrewedDate(beers)).toEqual({ month: 11, year: 2015 });
  });
});

describe('getMonths', () => {
  it('all months', () => {
    expect(getMonths()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });
});

describe('getYearsFromMinToMaxBrewed', () => {
  it('from fixtures', () => {
    expect(getYearsFromMinToMaxBrewed(beers)).toEqual([
      2007,
      2008,
      2009,
      2010,
      2011,
      2012,
      2013,
      2014,
      2015,
    ]);
  });
});

describe('getBeersByBrewedFromTo', () => {
  it('between years', () => {
    expect(
      getBeersByBrewedFromTo({
        beers,
        brewedFrom: { month: 9, year: 2012 },
        brewedTo: { month: 2, year: 2014 },
      })
    ).toEqual([beers[3]]);
  });

  it('same from year before month', () => {
    expect(
      getBeersByBrewedFromTo({
        beers,
        brewedFrom: { month: 3, year: 2008 },
        brewedTo: { month: 8, year: 2012 },
      })
    ).toEqual([beers[1], beers[4]]);
  });

  it('same from year same month', () => {
    expect(
      getBeersByBrewedFromTo({
        beers,
        brewedFrom: { month: 4, year: 2008 },
        brewedTo: { month: 8, year: 2012 },
      })
    ).toEqual([beers[1], beers[4]]);
  });

  it('same from year after month', () => {
    expect(
      getBeersByBrewedFromTo({
        beers,
        brewedFrom: { month: 5, year: 2008 },
        brewedTo: { month: 8, year: 2012 },
      })
    ).toEqual([beers[4]]);
  });

  it('same to year before month', () => {
    expect(
      getBeersByBrewedFromTo({
        beers,
        brewedFrom: { month: 3, year: 2012 },
        brewedTo: { month: 8, year: 2013 },
      })
    ).toEqual([]);
  });

  it('same to year same month', () => {
    expect(
      getBeersByBrewedFromTo({
        beers,
        brewedFrom: { month: 3, year: 2012 },
        brewedTo: { month: 9, year: 2013 },
      })
    ).toEqual([beers[3]]);
  });

  it('same to year after month', () => {
    expect(
      getBeersByBrewedFromTo({
        beers,
        brewedFrom: { month: 3, year: 2012 },
        brewedTo: { month: 10, year: 2013 },
      })
    ).toEqual([beers[3]]);
  });

  it('same to & from year month same as from', () => {
    expect(
      getBeersByBrewedFromTo({
        beers,
        brewedFrom: { month: 4, year: 2008 },
        brewedTo: { month: 10, year: 2008 },
      })
    ).toEqual([beers[1]]);
  });

  it('same to & from year month same as to', () => {
    expect(
      getBeersByBrewedFromTo({
        beers,
        brewedFrom: { month: 1, year: 2008 },
        brewedTo: { month: 4, year: 2008 },
      })
    ).toEqual([beers[1]]);
  });

  it('same to & from year month before as both', () => {
    expect(
      getBeersByBrewedFromTo({
        beers,
        brewedFrom: { month: 5, year: 2008 },
        brewedTo: { month: 10, year: 2008 },
      })
    ).toEqual([]);
  });

  it('same to & from year month after as both', () => {
    expect(
      getBeersByBrewedFromTo({
        beers,
        brewedFrom: { month: 1, year: 2008 },
        brewedTo: { month: 3, year: 2008 },
      })
    ).toEqual([]);
  });
});
