import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import BeersList from '../BeersList';
import beers from '../../../fixtures/beers';

/** this component should render:
 *  -  a list of beers:
 *          or
 *  - label in casse the list is empty
 *
 */

describe('Beer Component tests', () => {
  it('render Beer Snapshot', () => {
    expect(renderer.create(<BeersList beers={beers} />)).toMatchSnapshot();
    expect(renderer.create(<BeersList beers={[]} />)).toMatchSnapshot();
  });

  it('beers list should render all beers', () => {
    const { getByTestId } = render(<BeersList beers={beers} />);
    const beersListContiner = getByTestId('beers-list-container');
    expect(beersListContiner.children.length).toBe(5);
  });

  it('beers list should render label if there are no beers', () => {
    const { getByTestId } = render(<BeersList beers={[]} />);
    const beersListContiner = getByTestId('beers-list-container');
    expect(beersListContiner.children.length).toBe(1);
    const noBeersLabel = beersListContiner.children[0];
    expect(noBeersLabel.nodeName).toBe('LABEL');
    expect(noBeersLabel.innerHTML).toBe('No beers found');
  });
});
