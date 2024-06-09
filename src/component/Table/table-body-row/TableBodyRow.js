import { useState } from 'react';
import PropTypes from 'prop-types';
// Component
import CheckBox from "../../CheckBox";
import TextBox from '../../TextBox';
import Button from '../../Button'; 
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
  screenSize,
  isCheckBoxDisabled,
}) => {
  const { checked, email, id, name, role } = tableCellData;
  const isRowDisbaled = editableRowData.action === EDIT_ROW && editableRowData.id !== id;
  const canShowSaveCancelCTAs = editableRowData.action === EDIT_ROW && editableRowData.id === id;
  const userData = {
    name,
    email,
    role
  };

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

  const userCellClassName = `${screenSize < 900 ? '' : 'table-cell'}`;
  const tableResponsiveClassName =
    `table-row ${checked ? 'selected-row' : ''} ${isRowDisbaled ? 'disabled' : ''} ${screenSize < 500 ? 'responsive-table' : ''}`;

  const getUserData = (type, value) => (
    <div className={userCellClassName} key={`user-${type}-${id}`}>
      {type !== 'role' ?
        loadEditableInputField(type, value)
      :
        <>
          {value !== NON_EDITABLE_FIELD_NAME ? loadEditableInputField(type, value) : value}
        </>
      }
    </div>
  );

  const getUserCellData = () => {
    return Object.keys(userData).map(key => getUserData(key, userData[key]));
  };

  const getUserTableCell = () => {
    return screenSize < 900 ?
      <div className="responsive-table-cell">
        {getUserCellData()}
      </div>
    :
      <>
        {getUserCellData()}
      </>;
  };

  return(
    <div className={tableResponsiveClassName}>
      <div className="table-cell">
        <CheckBox
          testID={`user-${id}`}
          checked={checked}
          handleCheckboxChange={() => onSelectTabelRow(id, !checked)}
          isCheckBoxDisabled={isCheckBoxDisabled}
        />
      </div>
      {getUserTableCell()}
      <div className={'table-cell action-item-cell'}>
        <div className="action-items-wrapper">
          {canShowSaveCancelCTAs ?
            <>
              <Button
                onClick={() => handleSaveRowData(modifiedRowsData)}
                buttonImage={SaveIcon}
                imgType="save"
                isImgWithBg
              />
              <Button
                onClick={handleCancelEdit}
                buttonImage={CancelIcon}
                imgType="cancel"
                isImgWithBg
              />
            </>
          :
            <>
              <Button
                onClick={(e) => handleEditRow(id)}
                buttonImage={EditIcon}
                imgType="edit"
              />
              <Button
                onClick={(e) => handleDeleteTableRow(id)}
                buttonImage={DeleteIcon}
                imgType="delete"
              />
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
  screenSize: PropTypes.number.isRequired,
  isCheckBoxDisabled: PropTypes.bool.isRequired,
};

export default TableBodyRow;
