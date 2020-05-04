import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import Calendar from '../Calendar';

/** this component should:
 *  paint a calendar module that paints:
 *      - calendar svg
 *      - children info inside calendar
 *      - reserved space for actions
 *
 *  props:
 *      - width: width of the calendar (auto height mantaining aspect ratio)
 *      - children
 *
 */

describe('Calendar Component Snapshots', () => {
  it('Calendar Snapshots', () => {
    expect(
      renderer.create(
        <Calendar width={100}>
          <label>Calendar Info</label>
        </Calendar>
      )
    ).toMatchSnapshot();
  });
});

describe('Calendar with label', () => {
  it('Calendar Component should render all information', () => {
    const { container } = render(
      <Calendar width={100}>
        <label>Calendar Info</label>
      </Calendar>
    );

    const calendarContainer = container.querySelector('section');
    expect(calendarContainer.children.length).toBe(2);

    const calendarInfo = calendarContainer.children[0];
    expect(calendarInfo.nodeName).toBe('DIV');
    expect(calendarInfo.getAttribute('width')).toBe('100px');
    expect(calendarInfo.getAttribute('height')).toBe('68.4931506849315px');

    const children = calendarInfo.children[0];
    expect(children.nodeName).toBe('LABEL');

    const calendarIcon = calendarContainer.children[1];
    expect(calendarIcon.nodeName).toBe('svg');
    expect(calendarIcon.getAttribute('width')).toBe('100');
  });
});
