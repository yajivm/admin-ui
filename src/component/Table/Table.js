import { useContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';
// Components
import TableBodyRow from "./table-body-row";
import TableHead from "./table-head";
import EmptyContainer from '../EmptyContainer';
import Button from "../Button";
import Pagination from "../Pagination";
// Context
import UserContext from "../../context/userContext";
// helpers
import getWindowSize from '../../helpers/utils';
// Config
import Config from '../../config';

const { EDIT_ROW, DEFAULT_ACTION, ROW_COUNT_PER_PAGE } = Config;

const Table = ({ tableData = [], setDisableSearch, isCheckBoxDisabled }) => {

  const {
    currentUserTableList,
    deleteSelectedUsers,
    getCurrentTableData,
    setAllUsersChecked,
    onCheckAllUsers,
    onSelectUser,
    handleDeleteUserData,
    updateUsersListData,
  } = useContext(UserContext);

  const [editableRowData, setEditableRowData] = useState({ action: DEFAULT_ACTION, id: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [windowSize, setWindowSize] = useState(getWindowSize());

  const handleEditRow = (editRowId) => {
    setEditableRowData({
      action: EDIT_ROW,
      id: editRowId,
    });
    setDisableSearch(true);
  };

  const handleCancelEdit = () => {
    setEditableRowData({
      action: DEFAULT_ACTION,
      id: '',
    });
    setDisableSearch(false);
  };

  const handleSaveRowData = (modifiedData) => {
    updateUsersListData(modifiedData);
    handleCancelEdit();
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    const lastIndex = currentPage * ROW_COUNT_PER_PAGE;
    const firstIndex = lastIndex -  ROW_COUNT_PER_PAGE;
    getCurrentTableData(firstIndex, lastIndex);
  }, [currentPage, getCurrentTableData]);

  const handlePageNumberChange = pageNumber => {
    setAllUsersChecked(false);
    setCurrentPage(pageNumber);
  };

  const screenSize = windowSize.innerWidth;

  if (!tableData?.length) {
    return <EmptyContainer />;
  }
 
  return(
    <>
      <div className="table">
        <TableHead
          screenSize={screenSize}
          onSelectAllTableRow={onCheckAllUsers}
          isCheckBoxDisabled={isCheckBoxDisabled}
        />
        {currentUserTableList.map((data, ind) => (
          <TableBodyRow
            key={`table-cell-${ind}`}
            editableRowData={editableRowData}
            tableCellData={data}
            onSelectTabelRow={onSelectUser}
            handleDeleteTableRow={handleDeleteUserData}
            handleEditRow={handleEditRow}
            handleCancelEdit={handleCancelEdit}
            handleSaveRowData={handleSaveRowData}
            screenSize={screenSize}
            isCheckBoxDisabled={isCheckBoxDisabled}
          />
        ))}
      </div>
      <div className="table-bottom-wrapper">
        <Button buttonText="Delete selected" onClick={deleteSelectedUsers} isButtonWithText />
        <Pagination
          currentPage={currentPage}
          totalDataCount={tableData.length}
          tabelSize={ROW_COUNT_PER_PAGE}
          onPageChange={handlePageNumberChange}
        />
      </div>
    </>
  );
};

Table.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  })),
  setDisableSearch: PropTypes.func.isRequired,
  isCheckBoxDisabled: PropTypes.bool.isRequired,
};

export default Table;
