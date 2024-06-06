import { useState, useEffect, useContext } from "react";
// Components
import Search from "../../component/Search";
import Table from "../../component/Table";
import EmptyContainer from "../../component/EmptyContainer";
// Context
import UserContext from "../../context/userContext";
//
import './home.styles.scss';

const Home = () => {

  const {
    usersList,
    onCheckAllUsers,
    onSelectUser,
    handleDeleteUserData,
    updateUsersListData,
  } = useContext(UserContext);

  const [filteredUserList, setFilteredUsersList] = useState([]);

  useEffect(() => {
    setFilteredUsersList(usersList);
  }, [usersList]);

  const onSearchUser = (searchKey) => {
    let users = filteredUserList;
    if (searchKey.length >= 1) {
      users = filteredUserList.filter(user => Object
        .keys(user)
        .some(key => 
          user[key].toLowerCase()?.includes(searchKey.toLowerCase())
        )
      );
    }

    if (searchKey.length === 0) {
      users = usersList;
    }

    console.log('users', users);
    setFilteredUsersList(users);
  };

  const resetSearchResults = () => setFilteredUsersList(usersList);

  return(
    <main>
      <Search onInputChange={onSearchUser} resetInputChange={resetSearchResults} disabled={!usersList.length} />
      {usersList.length ?
        <>
          <Table
            tableData={filteredUserList}
            onSelectAllTableRow={onCheckAllUsers}
            onSelectTabelRow={onSelectUser}
            handleDeleteTableRow={handleDeleteUserData}
            handlEditTableRow={updateUsersListData}
          />
        </>
      :
        <EmptyContainer />
      }
    </main>
  )
};

export default Home;
