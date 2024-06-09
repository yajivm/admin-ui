import { fireEvent, render, screen } from '@testing-library/react';
// Context
import UserContext from "../../context/userContext";
//
import Search from './Search';

jest.mock('../Button', () => props => <div data-testid="mock-button" {...props} />);

const list = [{
  name: 'testName',
  email: 'test@email.com',
  role: 'testing',
  id: '1',
}];
const mockHandleSearchUser = jest.fn();
const mockResetSearchResults = jest.fn();

describe('Search', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render the component', () => {
    render(
      <UserContext.Provider value={{
        handleSearchUser: mockHandleSearchUser,
        resetSearchResults: mockResetSearchResults,
      }}>
        <Search searchableList={list} />
      </UserContext.Provider>
    );

    const input = screen.getByTestId('search-input');
    const btn = screen.getAllByTestId('mock-button');

    expect(input).toBeInTheDocument();
    expect(btn).toHaveLength(1);
  });

  it('should render two button when user entering values in the input', () => {
    render(
      <UserContext.Provider value={{
        handleSearchUser: mockHandleSearchUser,
        resetSearchResults: mockResetSearchResults,
      }}>
        <Search searchableList={list} />
      </UserContext.Provider>
    );

    const input = screen.getByTestId('search-input');

    fireEvent.change(input, { target: { value: 'test' }});

    expect(screen.getAllByTestId('mock-button')).toHaveLength(2);
  });
});
