import { act, useContext } from "react";
//
import UserContext from "./userContext";
import UserProvider from "./userProvider";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const mockGetUsersListService = jest.fn();
jest.mock('../service/users.service', () => {
  return {
    getUsersListService: () => mockGetUsersListService(),
  }
});

const list = [{
  name: 'testName',
  email: 'test@email.com',
  role: 'testing',
  id: '1',
}, {
  name: 'mock',
  email: 'test2@email.com',
  role: 'testing2',
  id: '2',
}];

const updatedList = [
  {
    name: 'testFancyName',
    email: 'test@email.com',
    role: 'testing',
    id: '1',
  }, {
    name: 'mockFancy',
    email: 'test2@email.com',
    role: 'testing2',
    id: '2',
  }
];

const mockList = [
  ...list,
  {
    name: 'testName3',
    email: 'test3@email.com',
    role: 'testing3',
    id: '3',
  }, {
    name: 'mock3',
    email: 'test23@email.com',
    role: 'testing23',
    id: '4',
  },
  {
    name: 'testName4',
    email: 'test4@email.com',
    role: 'testing4',
    id: '5',
  }, {
    name: 'mock5',
    email: 'test25@email.com',
    role: 'testing25',
    id: '6',
  },
  {
    name: 'testName6',
    email: 'test@email6.com',
    role: 'testing6',
    id: '7',
  }, {
    name: 'mock7',
    email: 'test27@email.com',
    role: 'testing27',
    id: '8',
  },
  {
    name: 'testName8',
    email: 'test8@email.com',
    role: 'testing8',
    id: '9',
  }, {
    name: 'mock9',
    email: 'test29@email.com',
    role: 'testing29',
    id: '10',
  },
  {
    name: 'testName10',
    email: 'test10@email.com',
    role: 'testing10',
    id: '11',
  }, {
    name: 'mock11',
    email: 'test211@email.com',
    role: 'testing21',
    id: '12',
  },
  {
    name: 'testName12',
    email: 'test12@email.com',
    role: 'testing12',
    id: '13',
  },
];

const ChildComponent = () => {
  const {
    userTableList,
    isAllUsersChecked,
    currentUserTableList,
    deleteSelectedUsers,
    onCheckCurrentTableAllUsers,
    onSelectUser,
    updateUsersListData,
    handleDeleteUserData,
    getCurrentTableData,
    setAllUsersChecked,
    handleSearchUser,
    resetSearchResults,
  } = useContext(UserContext);

  return (
    <>
      {userTableList.length ? 
        userTableList.map((user, ind) => {
          return (
            <div key={ind} data-testid="data-list">
              <div data-testid={user.name}>{`${user.checked}`}</div>
            </div>
          );
        })
      :
        <></>
      }
      <div data-testid="all-user-box-checked">{isAllUsersChecked ? 'Checked' : 'Not Checked'}</div>
      {currentUserTableList.length ? 
        currentUserTableList.map((user, ind) => {
          return (
            <div key={`ind-${ind}`} data-testid="current-tablel-list">
              <div data-testid={`current-${user.name}`}>{`${user.checked}`}</div>
            </div>
          );
        })
      :
        <></>
      }
      <div data-testid="deleteSelectedUsers" onClick={() => deleteSelectedUsers('1')} />
      <div data-testid="onCheckCurrentTableAllUsers" onClick={() => onCheckCurrentTableAllUsers(true)} />
      <div data-testid="onSelectUser" onClick={() => onSelectUser(1, true)} />
      <div data-testid="updateUsersListData" onClick={() => updateUsersListData(updatedList)} />
      <div data-testid="getCurrentTableData" onClick={() => getCurrentTableData(0, 10)} />
      <div data-testid="setAllUsersChecked" onClick={setAllUsersChecked} />
      <div data-testid="handleDeleteUserData" onClick={() => handleDeleteUserData('1')} />
      <div data-testid="handleSearchUser" onClick={() => handleSearchUser('name')} />
      <div data-testid="resetSearchResults" onClick={resetSearchResults} />
    </>
  );
};

const renderComponent = () => {
  return (
    act(() =>
      render(
        <UserProvider>
          <ChildComponent />
        </UserProvider>
      )
    )
  );
};

describe("UserProvide", () => {
  beforeEach(() => {
    mockGetUsersListService.mockResolvedValueOnce({ data: list });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should get list when component rendered', async() => {
    renderComponent();

    expect(mockGetUsersListService).toHaveBeenCalledTimes(1);

    await waitFor(() => screen.getAllByTestId('data-list'));

    expect(screen.getAllByTestId('data-list')).toHaveLength(2);
  });

  it('should get current table list', async() => {
    renderComponent();

    await waitFor(() => screen.getAllByTestId('current-tablel-list'));

    expect(screen.getAllByTestId('current-tablel-list')).toHaveLength(2);
  });

  it('should delete selected users data', async() => {
    renderComponent();

    fireEvent.click(screen.getByTestId('deleteSelectedUsers'));

    expect(screen.queryByTestId('data-list')).toBeNull();
  });

  it('should delete user delete', async() => {
    renderComponent();

    await waitFor(() => screen.getAllByTestId('data-list'));

    expect(screen.getAllByTestId('data-list')).toHaveLength(2);

    fireEvent.click(screen.getByTestId('handleDeleteUserData'));

    expect(screen.getAllByTestId('data-list')).toHaveLength(1);
  });

  it('should call search user', async() => {
    renderComponent();

    await waitFor(() => screen.getAllByTestId('data-list'));

    expect(screen.getAllByTestId('data-list')).toHaveLength(2);

    fireEvent.click(screen.getByTestId('handleSearchUser'));

    expect(screen.getAllByTestId('data-list')).toHaveLength(1);
  });

  it('should call resetSearchResults', async() => {
    renderComponent();

    await waitFor(() => screen.getAllByTestId('data-list'));

    expect(screen.getAllByTestId('data-list')).toHaveLength(2);

    act(() => {
      fireEvent.click(screen.getByTestId('handleSearchUser'));
    });

    expect(screen.getAllByTestId('data-list')).toHaveLength(1);

    act(() => {
      fireEvent.click(screen.getByTestId('resetSearchResults'));
    });

    expect(screen.getAllByTestId('data-list')).toHaveLength(2);
  });

  it('should check current table user row', async() => {
    renderComponent();

    await waitFor(() => screen.getAllByTestId('data-list'));

    expect(screen.getAllByTestId('data-list')).toHaveLength(2);

    fireEvent.click(screen.getByTestId('onCheckCurrentTableAllUsers'));

    waitFor(() => {
      expect(screen.getByTestId('testName')).toHaveTextContent('true');
      expect(screen.getByTestId('mock')).toHaveTextContent('true');
    });
  });

  it('should select user when onSelectuser caled', async() => {
    renderComponent();

    expect(mockGetUsersListService).toHaveBeenCalledTimes(1);

    await waitFor(() => screen.getAllByTestId('data-list'));

    
    expect(screen.getByTestId('testName')).toHaveTextContent('false');
    expect(screen.getByTestId('mock')).toHaveTextContent('false');

    fireEvent.click(screen.getByTestId('onSelectUser'));

    waitFor(() => {
      expect(screen.getByTestId('testName')).toHaveTextContent('true');
      expect(screen.getByTestId('mock')).toHaveTextContent('false');
    });
  });

  it('should update the modified data in the list', async() => {
    renderComponent();

    expect(mockGetUsersListService).toHaveBeenCalledTimes(1);

    await waitFor(() => screen.getAllByTestId('data-list'));

    expect(screen.getAllByTestId('data-list')).toHaveLength(2);

    fireEvent.click(screen.getByTestId('updateUsersListData'));

    await waitFor(() => screen.getAllByTestId('data-list'));

    waitFor(() => {
      expect(screen.getAllByTestId('data-list')).toHaveLength(2);
      screen.queryByTestId('testFancyName');
      screen.queryByTestId('mockFance')
      expect(screen.queryByTestId('testName')).toBeNull();
      expect(screen.queryByTestId('mock')).toBeNull();
    });
  });

  it('should get current table list data', async() => {
    mockGetUsersListService.mockRestore();

    mockGetUsersListService.mockResolvedValueOnce({ data: mockList });

    renderComponent();

    await waitFor(() => screen.getAllByTestId('data-list'));

    expect(screen.getAllByTestId('data-list')).toHaveLength(13);

    act(() => {
      fireEvent.click(screen.getByTestId('getCurrentTableData'));
    });

    await waitFor(() => screen.getAllByTestId('current-tablel-list'));

    expect(screen.getAllByTestId('current-tablel-list')).toHaveLength(10);
  });
});
