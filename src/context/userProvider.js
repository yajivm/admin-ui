import { useState, useEffect } from "react";
//
import UserContext from "./userContext";

// Service
import { getUsersListService } from "../service/users.service";

const UserProvider = ({ children }) => {

  const [usersList, setUsersList] = useState([]);
  const [isAllUsersChecked, setAllUsersChecked] = useState(false);

  const getUsersList = () => {
    getUsersListService()
      .then(({ data }) => {
        data.forEach(obj => {
          obj.checked = false;
        });
        setUsersList(data);
      })
      .catch(err => {
        console.log('users api err=====>', err.response);
      });
  }

  useEffect(() => {
    getUsersList();
  }, []);

  const onCheckAllUsers = (checked) => {
    let checkedUsers = usersList.map(user => {
      return {
        ...user,
        checked,
      };
    });

    setAllUsersChecked(checked);
    setUsersList(checkedUsers);
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
    const filteredUsers = usersList.filter(user => !user.checked);

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
  }

  return (
    <UserContext.Provider value={{
      usersList,
      isAllUsersChecked,
      deleteSelectedUsers,
      onCheckAllUsers,
      onSelectUser,
      setUsersList,
      updateUsersListData,
      handleDeleteUserData,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;