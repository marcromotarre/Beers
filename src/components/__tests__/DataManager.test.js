import React from 'react';
import { renderRedux } from './../../utils/test';
import DataManager from '../DataManager';

/** this component should:
 *
 *      - manage content info.
 *          - show loader if redux beersReducer data is pending
 *          - show error if redux beersReducer data is error
 *          - show data if redux beersReducer data is success
 */

describe('DataManager Component', () => {
  it('DataManager Snapshot', () => {
    expect(
      renderRedux(
        <DataManager>
          <h1>data correct</h1>
        </DataManager>,
        {
          initialState: { beersReducer: { pending: false, error: false } },
        }
      ).baseElement
    ).toMatchSnapshot();

    expect(
      renderRedux(
        <DataManager>
          <h1>data correct</h1>
        </DataManager>,
        {
          initialState: { beersReducer: { pending: true, error: false } },
        }
      ).baseElement
    ).toMatchSnapshot();

    expect(
      renderRedux(
        <DataManager>
          <h1>data correct</h1>
        </DataManager>,
        {
          initialState: { beersReducer: { pending: false, error: true } },
        }
      ).baseElement
    ).toMatchSnapshot();
  });

  it('DataManager should show loader if there is pending', () => {
    const { container } = renderRedux(
      <DataManager>
        <h1>data correct</h1>
      </DataManager>,
      {
        initialState: { beersReducer: { pending: true, error: false } },
      }
    );
    const loadingImg = container.querySelector('img');
    expect(loadingImg.getAttribute('alt')).toBe('loading');
    expect(loadingImg.getAttribute('src')).toBe(
      'https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif'
    );
  });

  it('DataManager should show children if is not pending and there is no error', () => {
    const { container } = renderRedux(
      <DataManager>
        <h1>data correct</h1>
      </DataManager>,
      {
        initialState: { beersReducer: { pending: false, error: false } },
      }
    );
    expect(container.querySelector('h1').innerHTML).toBe('data correct');
  });

  it('DataManager should show error message if there is error', () => {
    const { container } = renderRedux(
      <DataManager>
        <h1>data correct</h1>
      </DataManager>,
      {
        initialState: { beersReducer: { pending: false, error: true } },
      }
    );
    expect(container.querySelector('label').innerHTML).toBe(
      'Error Loading Data'
    );
  });
});
