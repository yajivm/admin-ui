import { render, screen } from "@testing-library/react";
import Pagination from "./Pagination";


const mockGetPaginationList = jest.fn();

jest.mock('../Button', () => props => <div data-testid="mock-button" {...props} />);
jest.mock('../../helpers/getPaginationList', () => {
  return (...args) => mockGetPaginationList(...args);
});

let mockProps = {
  currentPage: 0,
  onPageChange: jest.fn(),
  totalDataCount: 9,
  tabelSize: 9,
};

describe('Pagination', () => {
  it('should not render the component when current page is 0 and totalDataCount value is less than 10', () => {
    render(<Pagination {...mockProps} />);

    expect(screen.queryByRole('button')).toBeNull();
  });

  it('should render the component when current page is 1 and totalDataCount value is valid', () => {
    mockGetPaginationList.mockReturnValue([1]);
    mockProps = {
      ...mockProps,
      currentPage: 1,
      totalDataCount: 10,
      tabelSize: 10,
    };
    render(<Pagination {...mockProps} />);

    screen.queryByRole('button', { name: "<<"});
    screen.queryByRole('button', { name: "<"});
    screen.queryByRole('button', { name: "1"});
    screen.queryByRole('button', { name: ">"});
    screen.queryByRole('button', { name: ">>"});
  });

  it('should render the component with dots when totalDataCount value is more than 50', () => {
    mockGetPaginationList.mockReturnValue([1, 2, 3, 4, 5, '...', 7]);
    mockProps = {
      ...mockProps,
      currentPage: 1,
      totalDataCount: 70,
      tabelSize: 10,
    };
    render(<Pagination {...mockProps} />);

    screen.queryByRole('button', { name: "<<"});
    screen.queryByRole('button', { name: "<"});
    screen.queryByRole('button', { name: "1"});
    screen.queryByRole('button', { name: "2"});
    screen.queryByRole('button', { name: "3"});
    screen.queryByRole('button', { name: "4"});
    screen.queryByRole('button', { name: "5"});
    screen.queryByRole('button', { name: "..."});
    screen.queryByRole('button', { name: "7"});
    screen.queryByRole('button', { name: ">"});
    screen.queryByRole('button', { name: ">>"});
  });

  it('should render the component dots when current page is middle one and totalDataCount value is more than 100', () => {
    mockGetPaginationList.mockReturnValue([1, '...', 4, 5, 6, '...', 10]);
    mockProps = {
      ...mockProps,
      currentPage: 5,
      totalDataCount: 100,
      tabelSize: 10,
    };
    render(<Pagination {...mockProps} />);

    screen.queryByRole('button', { name: "<<"});
    screen.queryByRole('button', { name: "<"});
    screen.queryByRole('button', { name: "1"});
    screen.queryByRole('button', { name: "..."});
    screen.queryByRole('button', { name: "4"});
    screen.queryByRole('button', { name: "5"});
    screen.queryByRole('button', { name: "6"});
    screen.queryByRole('button', { name: "..."});
    screen.queryByRole('button', { name: "10"});
    screen.queryByRole('button', { name: ">"});
    screen.queryByRole('button', { name: ">>"});
  });
});