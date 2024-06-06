import { useState } from 'react';
import PropTypes from 'prop-types';
// Component
import CheckBox from "../../CheckBox";
import TextBox from '../../TextBox';
// Icons
import EditIcon from '../../../asset/icon/edit.png';
import DeleteIcon from '../../../asset/icon/delete.png';
import CancelIcon from '../../../asset/icon/close.png';
import SaveIcon from '../../../asset/icon/checkmark.png';
// Config
import Config from '../../../config';

const { EDIT_ROW, NON_EDITABLE_FIELD_NAME } = Config;

const TableBodyRow = ({
  editableRowData,
  tableCellData,
  onSelectTabelRow,
  handleDeleteTableRow,
  handleEditRow,
  handleCancelEdit,
  handleSaveRowData,
}) => {
  const { checked, email, id, name, role } = tableCellData;

  const [modifiedRowsData, setModifiedRowData] = useState([]);

  const onValueChange = (field, value, changedRowId) => {
    const obj = {
      ...tableCellData,
      ...modifiedRowsData,
      id: changedRowId,
      [field]: value,
    };

    setModifiedRowData(obj);
  };

  const loadEditableInputField = (field, value) => {
    if (editableRowData.id === id) {
      return <TextBox value={value} field={field} testID={`${field}-text-box-${id}`} handleInputChange={onValueChange} Id={id} />
    }

    return <>{value}</>;
  }

  const isRowDisbaled = editableRowData.action === EDIT_ROW && editableRowData.id !== id;
  const canShowSaveCancelCTAs = editableRowData.action === EDIT_ROW && editableRowData.id === id;

  return(
    <div className={`table-row ${checked ? 'selected-row' : ''} ${isRowDisbaled ? 'disabled' : ''}`}>
      <div className="table-cell">
        <CheckBox testID={`user-${id}`} checked={checked} handleCheckboxChange={() => onSelectTabelRow(id, !checked)} />
      </div>
      <div className="table-cell">
        {loadEditableInputField('name', name)}
      </div>
      <div className="table-cell">
        {loadEditableInputField('email', email)}
      </div>
      <div className="table-cell">
        {role !== NON_EDITABLE_FIELD_NAME ? loadEditableInputField('role', role) : role}
      </div>
      <div className="table-cell">
        <div className="action-items-wrapper">
          {canShowSaveCancelCTAs ?
            <>
              <button className="action-button save non-bg" data-test="save-button" onClick={() => handleSaveRowData(modifiedRowsData)}>
                <img src={SaveIcon} alt="Save" title="save" className="save-icon" />
              </button>
              <button className="action-button cancel non-bg" data-test="cancel-button" onClick={handleCancelEdit}>
                <img src={CancelIcon} alt="Cancel" title="cancel" className="cancel-icon" />
              </button>
            </>
          :
            <>
              <button className="action-button edit" data-test="edit-button" onClick={() => handleEditRow(id)}>
                <img src={EditIcon} alt="Edit" title="edit" className="edit-icon" />
              </button>
              <button className="action-button delete" data-test="delete-button" onClick={() => handleDeleteTableRow(id)}>
                <img src={DeleteIcon} alt="Delete" title="delete" className="delete-icon" />
              </button>
            </>
          }
        </div>
      </div>
    </div>
  )
};

TableBodyRow.propTypes = {
  tableCellData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  onSelectTabelRow: PropTypes.func.isRequired,
  handleDeleteTableRow: PropTypes.func.isRequired,
  editableRowData: PropTypes.shape({
    action: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  handleEditRow: PropTypes.func.isRequired,
  handleCancelEdit: PropTypes.func.isRequired,
  handleSaveRowData: PropTypes.func.isRequired,
};

export default TableBodyRow;
