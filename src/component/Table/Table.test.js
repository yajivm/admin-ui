import { render, screen } from '@testing-library/react';
// Context
import UserContext from "../../context/userContext";
//
import Table from './Table';

jest.mock('./table-body-row', () => props => <div data-testid="mock-tableBodyRow" {...props} />);
jest.mock('./table-head', () => props => <div data-testid="mock-tableHead" {...props} />);
jest.mock('../EmptyContainer', () => props => <div data-testid="mock-emptyContainer" {...props} />);
jest.mock('../Button', () => props => <div data-testid="mock-button" {...props} />);
jest.mock('../Pagination', () => props => <div data-testid="mock-pagination" {...props} />);

const list = [{
  name: 'testName',
  email: 'test@email.com',
  role: 'testing',
  id: '1',
}];

let mockProps = {
  tableData: [],
  setDisableSearch: jest.fn(),
  isCheckBoxDisabled: false,
};

let mockUserProviderValues = {
  currentUserTableList: [],
  deleteSelectedUsers: jest.fn(),
  getCurrentTableData: jest.fn(),
  setAllUsersChecked: jest.fn(),
  onCheckCurrentTableAllUsers: jest.fn(),
  onSelectUser: jest.fn(),
  handleDeleteUserData: jest.fn(),
  updateUsersListData: jest.fn(),
};

describe('Table', () => {
  it('should render empty container when there is no data', () => {
    render(
      <UserContext.Provider value={mockUserProviderValues}>
        <Table {...mockProps} />
      </UserContext.Provider>
    );

    screen.getByTestId('mock-emptyContainer');
    expect(screen.queryByTestId('mock-tableHead')).toBeNull();
    expect(screen.queryByTestId('mock-tableBodyRow')).toBeNull();
    expect(screen.queryByTestId('mock-button')).toBeNull();
    expect(screen.queryByTestId('mock-pagination')).toBeNull();
  });

  it('should render empty container when there is no data', () => {
    render(
      <UserContext.Provider value={{
        ...mockUserProviderValues,
        currentUserTableList: list
      }}>
        <Table {...mockProps} tableData={list} />
      </UserContext.Provider>
    );

    screen.getByTestId('mock-tableHead');
    screen.getByTestId('mock-tableBodyRow');
    expect(screen.queryByTestId('mock-emptyContainer')).toBeNull();
    screen.getByTestId('mock-button');
    screen.getByTestId('mock-pagination');
  });
});
