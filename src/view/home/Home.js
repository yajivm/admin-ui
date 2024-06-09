import { useContext, useState } from "react";
// Components
import Search from "../../component/Search";
import Table from "../../component/Table";
import EmptyContainer from "../../component/EmptyContainer";
// Context
import UserContext from "../../context/userContext";
//
import './home.styles.scss';

const Home = () => {

  const [isUserInputDisabled, setIsUserInputDisabled] = useState(false);

  const { userTableList } = useContext(UserContext);

  const setDisableSearchField = (toggledValue) => {
    setIsUserInputDisabled(toggledValue);
  };

  return(
    <main>
      <Search searchableList={userTableList} isSearchDisabled={isUserInputDisabled} />
      {userTableList.length ?
        <Table
          tableData={userTableList}
          setDisableSearch={setDisableSearchField}
          isCheckBoxDisabled={isUserInputDisabled}
        />
      :
        <EmptyContainer />
      }
    </main>
  )
};

export default Home;
