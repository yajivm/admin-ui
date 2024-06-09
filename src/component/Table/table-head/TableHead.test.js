import { render, screen } from '@testing-library/react';

import TableHead from "./TableHead";
// Context
import UserContext from "../../../context/userContext";

jest.mock('../../CheckBox', () => props => <div data-testid="mock-checkbox" {...props} />);

const mockSelectAllTableRow = jest.fn();
const mockCheckBoxDisabled = jest.fn();

let mockProps = {
  screenSize: 1200,
  onSelectAllTableRow: mockSelectAllTableRow,
  isCheckBoxDisabled: mockCheckBoxDisabled,
};

describe('TableHead', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render the component', () => {
    render(
      <UserContext.Provider value={{
        isAllUsersChecked: false,
      }}>
        <TableHead {...mockProps} />
      </UserContext.Provider>
    );

    expect(screen.getAllByTestId('mock-checkbox')).toHaveLength(1);
    screen.getByText('Name');
    screen.getByText('Email');
    screen.getByText('Role');
    screen.getByText('Actions');
  });

  it('should not show email and role when screensize is below 900', () => {
    render(
      <UserContext.Provider value={{
        isAllUsersChecked: false,
      }}>
        <TableHead {...mockProps} screenSize={899} />
      </UserContext.Provider>
    );

    expect(screen.getAllByTestId('mock-checkbox')).toHaveLength(1);
    screen.getByText('User');
    expect(screen.queryByText('Email')).toBeNull();
    expect(screen.queryByText('Role')).toBeNull();
    screen.getByText('Actions');
  });

  it('should not show action when screensize is below 500', () => {
    render(
      <UserContext.Provider value={{
        isAllUsersChecked: false,
      }}>
        <TableHead {...mockProps} screenSize={499} />
      </UserContext.Provider>
    );

    expect(screen.getAllByTestId('mock-checkbox')).toHaveLength(1);
    screen.getByText('User');
    expect(screen.queryByText('Email')).toBeNull();
    expect(screen.queryByText('Role')).toBeNull();
    expect(screen.queryByText('Actions')).toBeNull();
  });
});
