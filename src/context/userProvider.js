import { useState, useEffect, useCallback } from "react";
//
import UserContext from "./userContext";
// Service
import { getUsersListService } from "../service/users.service";

const DEFAULT = 'default';
const SEARCH = 'search';
const RESET_SEARCH = 'reset_search';
const DEFAULT_SEARCH = { action: DEFAULT, value: '' };

const UserProvider = ({ children }) => {

  const [usersList, setUsersList] = useState([]);
  const [currentUserTableList, setCurrentUserTableList] = useState([]);
  const [filteredUsersList, setFilteredUsersList] = useState([]);
  const [isAllUsersChecked, setAllUsersChecked] = useState(false);
  const [searchKeyValue, setSearchKeyValue] = useState(DEFAULT_SEARCH);

  const getUsersList = () => {
    getUsersListService()
      .then(({ data }) => {
        data?.forEach(obj => {
          obj.checked = false;
        });
        setUsersList(data);
      })
      .catch(err => {
        console.log('getUsersList err=====>', err);
      });
  }

  useEffect(() => { getUsersList() }, []);

  const getSearchResults = useCallback(() => {
    const { value: searchKey } = searchKeyValue;
    if(searchKeyValue.value.length && searchKeyValue.action !== RESET_SEARCH) {
      let listData = usersList;
      if (searchKey.length) {
        listData = listData.filter(user =>
          Object
            .keys(user)
            .some(key => {
              if (user[key]) {
                return user[key].toLowerCase()?.includes(searchKey.toLowerCase())
              }
  
              return false;
            })
        );
      }

      setFilteredUsersList(listData);
    }
  }, [searchKeyValue, usersList]);

  useEffect(() => {
    getSearchResults();
  }, [searchKeyValue, getSearchResults]);

  const getCurrentListData = useCallback(() => {
    let listData = usersList;
    if (searchKeyValue.value.length && searchKeyValue.action !== RESET_SEARCH) {
      listData = filteredUsersList;
    }

    return listData;
  }, [searchKeyValue, usersList, filteredUsersList]);

  const getCurrentTableData = useCallback((firstIndex, lastIndex) => {
    const slicedUsersList = getCurrentListData().slice(firstIndex,lastIndex);
    setCurrentUserTableList(slicedUsersList);
  }, [getCurrentListData]);

  useEffect(() => {
    getCurrentTableData(0, 10);
  }, [getCurrentTableData]);

  const onCheckCurrentTableAllUsers = (checked) => {
    let checkedUsers = currentUserTableList.map(user => {
      return {
        ...user,
        checked,
      };
    });

    setAllUsersChecked(checked);
    setCurrentUserTableList(checkedUsers);
  };

  const onSelectUser = (id, checked) => {
    let checkedUser = usersList.map(user => {
      if (user.id === id) {
        user.checked = checked;
      }

      return user;
    });

    if (!checked) {
      setAllUsersChecked(false);
    }

    setUsersList(checkedUser);
  };

  const deleteSelectedUsers = () => {
    let filteredUsers;
    if (isAllUsersChecked) {
      filteredUsers = usersList.filter(user1 => !currentUserTableList.some(user2 => user1.id === user2.id));
    } else {
      filteredUsers = usersList.filter(user => !user.checked);
    }

    setAllUsersChecked(false);
    setUsersList(filteredUsers);
  };

  const handleDeleteUserData = (id) => {
    const filteredUsers = usersList.filter(user => user.id !== id);

    setUsersList(filteredUsers);
  };

  const updateUsersListData = (modifiedData) => {
    let updatedList = usersList.map(user => {
      if (user.id === modifiedData.id) {
        return {
          ...modifiedData,
          checked: false,
        };
      }

      return user;
    });

    setUsersList(updatedList);
  };

  const resetSearchResults = () => {
    setSearchKeyValue({ action: RESET_SEARCH, value: "" });
  };

  const handleSearchUser = (searchKey) => {
    setSearchKeyValue({ action: SEARCH, value: searchKey});
  };

  return (
    <UserContext.Provider value={{
      userTableList: getCurrentListData(),
      isAllUsersChecked,
      currentUserTableList,
      deleteSelectedUsers,
      onCheckCurrentTableAllUsers,
      onSelectUser,
      setUsersList,
      updateUsersListData,
      handleDeleteUserData,
      getCurrentTableData,
      setAllUsersChecked,
      handleSearchUser,
      resetSearchResults,
      setSearchKeyValue,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
