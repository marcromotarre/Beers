import { formatBrewed, shortText } from './../text';
describe('formatBrewed', () => {
  it('07/2009', () => {
    expect(formatBrewed('07/2009')).toEqual({ month: 7, year: 2009 });
  });
});

describe('shortText', () => {
  it('shortText', () => {
    expect(shortText('Hi im a simple text', 20)).toEqual('Hi im a simple text');
  });
  it('longText', () => {
    expect(
      shortText('Hi im a reaaaaaaaaaaaaaaaaaaaaaaaaaaaaly long text', 20)
    ).toEqual('Hi im a reaaaaaaaaaa...');
  });
});
