import { render, screen } from '@testing-library/react';
// Context
import UserContext from "../../context/userContext";
//
import Home from './Home';

jest.mock('../../component/Search', () => props => <div data-testid="mock-search" {...props} />);
jest.mock('../../component/Table', () => props => <div data-testid="mock-table" {...props} />);
jest.mock('../../component/EmptyContainer', () => props => <div data-testid="mock-emptyContainer" {...props} />);

const list = [{
  name: 'testName',
  email: 'test@email.com',
  role: 'testing',
  id: '1',
}];

describe('Home', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render the empty component when userTableList is empty', () => {
    render(
      <UserContext.Provider value={{
        userTableList: [],
      }}>
        <Home />
      </UserContext.Provider>
    );

    screen.getByTestId('mock-search');
    screen.getByTestId('mock-emptyContainer');
    expect(screen.queryByTestId('mock-table')).toBeNull();
  });


  it('should render the table component when userTableList has data', () => {
    render(
      <UserContext.Provider value={{
        userTableList: list,
      }}>
        <Home />
      </UserContext.Provider>
    );

    screen.getByTestId('mock-search');
    screen.getByTestId('mock-table');
    expect(screen.queryByTestId('mock-emptyContainer')).toBeNull();
  });
});
