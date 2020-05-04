import { formatBrewed } from './text';
import { generateAutoIncrementalArrayFromMinToMax } from './array';

export const getBeersByBrewedFromTo = ({
  beers = [],
  brewedFrom,
  brewedTo,
}) => {
  return beers.filter((beer) => {
    const brewed = formatBrewed(beer.first_brewed);
    return (
      (brewed.year > brewedFrom.year && brewed.year < brewedTo.year) ||
      (brewed.year === brewedFrom.year &&
        brewed.month >= brewedFrom.month &&
        brewed.year < brewedTo.year) ||
      (brewed.year > brewedFrom.year &&
        brewed.year === brewedTo.year &&
        brewed.month <= brewedTo.month) ||
      (brewed.year === brewedFrom.year &&
        brewed.year === brewedTo.year &&
        brewed.month >= brewedFrom.month &&
        brewed.month <= brewedTo.month)
    );
  });
};

export const getMinBrewedDate = (beers = []) => {
  return beers
    .map((beer) => formatBrewed(beer.first_brewed))
    .sort(function (a, b) {
      return a.year <= b.year && a.month <= b.month ? -1 : 1;
    })[0];
};

export const getMaxBrewedDate = (beers) => {
  return beers
    .map((beer) => formatBrewed(beer.first_brewed))
    .sort(function (a, b) {
      return a.year <= b.year && a.month <= b.month ? 1 : -1;
    })[0];
};

export const getYearsFromMinToMaxBrewed = (beers) => {
  return generateAutoIncrementalArrayFromMinToMax(
    getMinBrewedDate(beers).year,
    getMaxBrewedDate(beers).year
  );
};

export const getMonths = () => {
  return generateAutoIncrementalArrayFromMinToMax(1, 12);
};
