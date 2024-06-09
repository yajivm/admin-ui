import getPaginationList from "./getPaginationList";

describe('getPaginationList', () => {
  it('should return pagination list array', () => {
    const result = getPaginationList({
      totalDataCount: 50,
      tabelSize: 10,
      currentPage: 1,
    });

    expect(result).toStrictEqual([1, 2, 3, 4, 5]);
  });

  it('should return pagination list array with dot when pagination count is more than 5', () => {
    const result = getPaginationList({
      totalDataCount: 70,
      tabelSize: 10,
      currentPage: 1,
    });

    expect(result).toStrictEqual([1, 2, 3, 4, 5, '...', 7]);
  });

  it('should return pagination list array with left dot when current page is middle one', () => {
    const result = getPaginationList({
      totalDataCount: 100,
      tabelSize: 10,
      currentPage: 5,
    });

    expect(result).toStrictEqual([1, '...', 4, 5, 6, '...', 10]);
  });
});
