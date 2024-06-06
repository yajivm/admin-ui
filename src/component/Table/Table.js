import { useContext, useState } from "react";
import PropTypes from 'prop-types';
// Components
import TableBodyRow from "./table-body-row";
import TableHead from "./table-head";
import EmptyContainer from '../EmptyContainer';
import Button from "../Button";
// Context
import UserContext from "../../context/userContext";
import Config from '../../config';

const { EDIT_ROW, DEFAULT_ACTION } = Config;

const Table = ({
  tableData = [],
  onSelectAllTableRow,
  onSelectTabelRow,
  handlEditTableRow,
  handleDeleteTableRow
}) => {

  const { deleteSelectedUsers } = useContext(UserContext);

  const [editableRowData, setEditableRowData] = useState({ action: DEFAULT_ACTION, id: '' });

  const handleEditRow = (editRowId) => {
    setEditableRowData({
      action: EDIT_ROW,
      id: editRowId,
    });
  };

  const handleCancelEdit = () => {
    setEditableRowData({
      action: DEFAULT_ACTION,
      id: '',
    });
  };

  const handleSaveRowData = (modifiedData) => {
    handlEditTableRow(modifiedData);
    handleCancelEdit();
  };

  if (!tableData?.length) {
    return <EmptyContainer />;
  }
 
  return(
    <>
      <div className="table">
        <TableHead onSelectAllTableRow={onSelectAllTableRow} />
        {
          tableData.map((data, ind) => (
            <TableBodyRow
              key={`table-cell-${ind}`}
              editableRowData={editableRowData}
              tableCellData={data}
              onSelectTabelRow={onSelectTabelRow}
              handleDeleteTableRow={handleDeleteTableRow}
              handleEditRow={handleEditRow}
              handleCancelEdit={handleCancelEdit}
              handleSaveRowData={handleSaveRowData}
            />
          ))
        }
      </div>
      <div className="button-wrapper">
        <Button buttonText="Delete selected" onClick={deleteSelectedUsers} />
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
  onSelectAllTableRow: PropTypes.func.isRequired,
  onSelectTabelRow: PropTypes.func.isRequired,
  handlEditTableRow: PropTypes.func.isRequired,
  handleDeleteTableRow: PropTypes.func.isRequired,
};

export default Table;
