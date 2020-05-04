import { generatePageNumbers, getNumPages } from "./../pagination";
describe("getNumPages", () => {
  it("{ totalElements: 29, elementsPerPage: 3 }", () => {
    expect(getNumPages({ totalElements: 29, elementsPerPage: 3 })).toEqual(10);
  });

  it("{ totalElements: 30, elementsPerPage: 3 }", () => {
    expect(getNumPages({ totalElements: 30, elementsPerPage: 3 })).toEqual(10);
  });
  it("{ totalElements: 31, elementsPerPage: 3 }", () => {
    expect(getNumPages({ totalElements: 31, elementsPerPage: 3 })).toEqual(11);
  });
});

describe("generatePageNumbers", () => {
  it("{ actualPage: 1 numPages: 6, maxNumShowedPages: 6 }", () => {
    expect(
      generatePageNumbers({ actualPage: 1, numPages: 6, maxNumShowedPages: 6 })
    ).toEqual({
      pages: [1, 2, 3, 4, 5, 6],
    });
  });
  it("{ actualPage: 1, numPages: 30, maxNumShowedPages: 7 }", () => {
    expect(
      generatePageNumbers({ actualPage: 1, numPages: 30, maxNumShowedPages: 7 })
    ).toEqual({
      pages: [1, 2, 3, 4, 5],
      last: 30,
    });
  });
  it("{ actualPage: 4, numPages: 30, maxNumShowedPages: 7 }", () => {
    expect(
      generatePageNumbers({ actualPage: 4, numPages: 30, maxNumShowedPages: 7 })
    ).toEqual({
      pages: [1, 2, 3, 4, 5],
      last: 30,
    });
  });
  it("{ actualPage: 5, numPages: 30, maxNumShowedPages: 7 }", () => {
    expect(
      generatePageNumbers({ actualPage: 5, numPages: 30, maxNumShowedPages: 7 })
    ).toEqual({
      first: 1,
      pages: [4, 5, 6],
      last: 30,
    });
  });

  it("{ actualPage: 15, numPages: 30, maxNumShowedPages: 7 }", () => {
    expect(
      generatePageNumbers({
        actualPage: 15,
        numPages: 30,
        maxNumShowedPages: 7,
      })
    ).toEqual({
      first: 1,
      pages: [14, 15, 16],
      last: 30,
    });
  });

  it("{ actualPage: 28, numPages: 30, maxNumShowedPages: 7 }", () => {
    expect(
      generatePageNumbers({
        actualPage: 28,
        numPages: 30,
        maxNumShowedPages: 7,
      })
    ).toEqual({
      first: 1,
      pages: [26, 27, 28, 29, 30],
    });
  });
});
