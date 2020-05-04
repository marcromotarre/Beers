import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import Beer from '../Beer';

/** this component should:
 *  - render beer properties:
 *      - name
 *      - tagline
 *      - first_brewed
 *      - description
 *      - image_url
 */

const props = {
  name: 'beer name',
  tagline: 'this is a goog beer',
  first_brewed: '08/2012',
  image_url: 'image_url',
  description: 'this is a description',
};

describe('Beer Component tests', () => {
  it('render Beer Snapshot', () => {
    const tree = renderer.create(<Beer {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('insert props children inside user property div', () => {
    const { getByTestId } = render(<Beer {...props} />);

    const beerContiner = getByTestId('beer-container');
    expect(beerContiner.children.length).toEqual(2);
    const beerData = beerContiner.children[0];
    expect(beerData.children.length).toEqual(2);
    const beerText = beerData.children[0];
    expect(beerText.nodeName).toBe('DIV');
    expect(beerText.children.length).toEqual(3);
    const h1 = beerText.children[0];
    expect(h1.nodeName).toBe('H1');
    expect(h1.innerHTML).toBe(props.name);
    const h2 = beerText.children[1];
    expect(h2.nodeName).toBe('H2');
    expect(h2.innerHTML).toBe(props.tagline);
    const p = beerText.children[2];
    expect(p.nodeName).toBe('P');
    expect(p.innerHTML).toBe(props.description);

    const brewedDate = beerData.children[1];
    expect(brewedDate.nodeName).toBe('DIV');
    expect(brewedDate.children.length).toEqual(2);
    const label = brewedDate.children[0];
    expect(label.nodeName).toBe('LABEL');
    expect(label.innerHTML).toBe('brewed:');
    const pBrewed = brewedDate.children[1];
    expect(pBrewed.nodeName).toBe('P');
    expect(pBrewed.innerHTML).toBe(props.first_brewed);

    const beerImage = beerContiner.children[1];
    expect(beerImage.nodeName).toBe('DIV');
    expect(beerImage.children[0].nodeName).toBe('IMG');
    expect(beerImage.children[0].getAttribute('src')).toBe(props.image_url);
  });
});
