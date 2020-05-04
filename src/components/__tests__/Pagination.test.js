import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import Pagination from '../Pagination';

/** this component should:
 *  paint a pagination module which allow user to navigate between pages
 *  props:
 *      - numberTotalElements: number
 *      - numberElementsPerPage: number
 *      - defaultPageNumber: number (optional)
 *      - onClickPage(pageNumber): func (optional)
 *
 *  state:
 *      - actualPage: number -> default value defaultPageNumber
 *
 *  - render pagination element:
 *      - previous page button
 *      - next page button
 *      - page number buttons
 *
 *  - allow user:
 *      - go to previous page
 *      - go to next page
 *      - go to a selected page
 */

const onClickPage = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Pagination Component Snapshots', () => {
  it('Pagination Snapshots', () => {
    expect(
      renderer.create(
        <Pagination
          numberTotalElements={12}
          numberElementsPerPage={3}
          defaultPageNumber={1}
        />
      )
    ).toMatchSnapshot();

    expect(
      renderer.create(
        <Pagination
          numberTotalElements={12}
          numberElementsPerPage={3}
          defaultPageNumber={3}
        />
      )
    ).toMatchSnapshot();

    expect(
      renderer
        .create(
          <Pagination
            numberTotalElements={100}
            numberElementsPerPage={5}
            defaultPageNumber={1}
          />
        )
        .toJSON()
    ).toMatchSnapshot();

    expect(
      renderer
        .create(
          <Pagination
            numberTotalElements={100}
            numberElementsPerPage={5}
            defaultPageNumber={10}
          />
        )
        .toJSON()
    ).toMatchSnapshot();

    expect(
      renderer
        .create(
          <Pagination
            numberTotalElements={100}
            numberElementsPerPage={5}
            defaultPageNumber={20}
          />
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});

describe('Pagination Simple no hidden pages numberTotalElements=12 and numberElementsPerPage=3', () => {
  const props = {
    numberTotalElements: 12,
    numberElementsPerPage: 3,
    defaultPageNumber: 1,
    onClickPage: jest.fn(),
  };
  it('should render 4 pages previous and next button', () => {
    const { getByTestId } = render(<Pagination {...props} />);

    const pagination = getByTestId('pagination-container');
    expect(pagination.children.length).toBe(6);
    const prevPageButton = pagination.children[0];
    const pageOneLabel = pagination.children[1].querySelector('label');
    const pageTwoLabel = pagination.children[2].querySelector('label');
    const pageThreeLabel = pagination.children[3].querySelector('label');
    const pageFourLabel = pagination.children[4].querySelector('label');
    const nextPageButton = pagination.children[5];

    expect(prevPageButton.disabled).toBe(true);
    expect(pageOneLabel.innerHTML).toBe('1');
    expect(pageOneLabel.getAttribute('class')).toBe('selected');
    expect(pageTwoLabel.innerHTML).toBe('2');
    expect(pageThreeLabel.innerHTML).toBe('3');
    expect(pageFourLabel.innerHTML).toBe('4');
    expect(nextPageButton.disabled).toBe(false);

    expect(props.onClickPage).toHaveBeenCalledTimes(1);
    expect(props.onClickPage).toHaveBeenLastCalledWith(1);
  });

  it('it should call props onClickPage(2) & update actualPage value when press to page 2 button', () => {
    const { getByTestId } = render(<Pagination {...props} />);
    const pagination = getByTestId('pagination-container');

    const pageOne = pagination.children[1];
    const pageTwo = pagination.children[2];

    expect(pageOne.querySelector('label').getAttribute('class')).toBe(
      'selected'
    );
    expect(pageTwo.querySelector('label').getAttribute('class')).toBe('');

    expect(props.onClickPage).toHaveBeenCalledTimes(1);
    fireEvent.click(pageTwo);
    expect(props.onClickPage).toHaveBeenCalledTimes(2);
    expect(props.onClickPage).toHaveBeenLastCalledWith(2);

    expect(pageOne.querySelector('label').getAttribute('class')).toBe('');
    expect(pageTwo.querySelector('label').getAttribute('class')).toBe(
      'selected'
    );
  });

  it('it should call props onClickPage(3) & update actualPage value when press next page button', () => {
    const { getByTestId } = render(
      <Pagination {...props} defaultPageNumber={2} />
    );
    const pagination = getByTestId('pagination-container');
    const pageThree = pagination.children[3];
    const nextPageButton = pagination.children[5];

    expect(props.onClickPage).toHaveBeenCalledTimes(1);
    fireEvent.click(nextPageButton);
    expect(props.onClickPage).toHaveBeenCalledTimes(2);
    expect(props.onClickPage).toHaveBeenLastCalledWith(3);
    expect(pageThree.querySelector('label').getAttribute('class')).toBe(
      'selected'
    );
  });

  it('it should call props onClickPage(1) & update actualPage value when press prev page button', () => {
    const { getByTestId } = render(
      <Pagination {...props} defaultPageNumber={2} />
    );
    const pagination = getByTestId('pagination-container');
    const pageOne = pagination.children[1];
    const prevPageButton = pagination.children[0];

    expect(props.onClickPage).toHaveBeenCalledTimes(1);
    fireEvent.click(prevPageButton);
    expect(props.onClickPage).toHaveBeenCalledTimes(2);
    expect(props.onClickPage).toHaveBeenLastCalledWith(1);
    expect(pageOne.querySelector('label').getAttribute('class')).toBe(
      'selected'
    );
  });
});

describe('Pagination Complex with hidden pages numberTotalElements=100 and numberElementsPerPage=5', () => {
  const props = {
    numberTotalElements: 100,
    numberElementsPerPage: 5,
    onClickPage: jest.fn(),
  };

  it('when defaultPageNumber is 1 should render 5 first pages dots and last page also previous and next button', () => {
    const { getByTestId } = render(
      <Pagination {...props} defaultPageNumber={1} />
    );

    const pagination = getByTestId('pagination-container');
    expect(pagination.children.length).toBe(9);
    const prevPageButton = pagination.children[0];
    const pageOneLabel = pagination.children[1].querySelector('label');
    const pageTwoLabel = pagination.children[2].querySelector('label');
    const pageThreeLabel = pagination.children[3].querySelector('label');
    const pageFourLabel = pagination.children[4].querySelector('label');
    const pageFiveLabel = pagination.children[5].querySelector('label');
    const dotsSVG = pagination.children[6].querySelector('svg');
    const lastPageLabel = pagination.children[7].querySelector('label');
    const nextPageButton = pagination.children[8];

    expect(prevPageButton.disabled).toBe(true);
    expect(pageOneLabel.innerHTML).toBe('1');
    expect(pageTwoLabel.innerHTML).toBe('2');
    expect(pageThreeLabel.innerHTML).toBe('3');
    expect(pageFourLabel.innerHTML).toBe('4');
    expect(pageFiveLabel.innerHTML).toBe('5');
    expect(dotsSVG.getAttribute('width')).toBe('14');
    expect(lastPageLabel.innerHTML).toBe('20');
    expect(nextPageButton.disabled).toBe(false);
  });

  it('when defaultPageNumber is 10 should render first page dots 3 middle pages dots and last page also previous and next button', () => {
    const { getByTestId } = render(
      <Pagination {...props} defaultPageNumber={10} />
    );

    const pagination = getByTestId('pagination-container');
    expect(pagination.children.length).toBe(9);
    const prevPageButton = pagination.children[0];
    const firstPageLabel = pagination.children[1].querySelector('label');
    const startDotsSVG = pagination.children[2].querySelector('svg');
    const pageNineLabel = pagination.children[3].querySelector('label');
    const pageTenLabel = pagination.children[4].querySelector('label');
    const pageElevenLabel = pagination.children[5].querySelector('label');
    const endDotsSVG = pagination.children[6].querySelector('svg');
    const lastPageLabel = pagination.children[7].querySelector('label');
    const nextPageButton = pagination.children[8];

    expect(prevPageButton.disabled).toBe(false);
    expect(firstPageLabel.innerHTML).toBe('1');
    expect(startDotsSVG.getAttribute('width')).toBe('14');
    expect(pageNineLabel.innerHTML).toBe('9');
    expect(pageTenLabel.innerHTML).toBe('10');
    expect(pageElevenLabel.innerHTML).toBe('11');
    expect(endDotsSVG.getAttribute('width')).toBe('14');
    expect(lastPageLabel.innerHTML).toBe('20');
    expect(nextPageButton.disabled).toBe(false);
  });

  it('when defaultPageNumber is 20 should render first page dots and last five pages also previous and next button', () => {
    const { getByTestId } = render(
      <Pagination {...props} defaultPageNumber={20} />
    );

    const pagination = getByTestId('pagination-container');
    expect(pagination.children.length).toBe(9);
    const prevPageButton = pagination.children[0];
    const firstPageLabel = pagination.children[1].querySelector('label');
    const dotsSVG = pagination.children[2].querySelector('svg');
    const pageSixteenLabel = pagination.children[3].querySelector('label');
    const pageSeventeenLabel = pagination.children[4].querySelector('label');
    const pageEighteenLabel = pagination.children[5].querySelector('label');
    const pageNineteenLabel = pagination.children[6].querySelector('label');
    const pageTwentyLabel = pagination.children[7].querySelector('label');
    const nextPageButton = pagination.children[8];

    expect(prevPageButton.disabled).toBe(false);
    expect(firstPageLabel.innerHTML).toBe('1');
    expect(dotsSVG.getAttribute('width')).toBe('14');
    expect(pageSixteenLabel.innerHTML).toBe('16');
    expect(pageSeventeenLabel.innerHTML).toBe('17');
    expect(pageEighteenLabel.innerHTML).toBe('18');
    expect(pageNineteenLabel.innerHTML).toBe('19');
    expect(pageTwentyLabel.innerHTML).toBe('20');
    expect(nextPageButton.disabled).toBe(true);
  });
});
