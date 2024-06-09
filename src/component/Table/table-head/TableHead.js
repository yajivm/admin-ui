import { useContext } from 'react';
import PropTypes from 'prop-types';
// Components
import CheckBox from "../../CheckBox";
// Context
import UserContext from "../../../context/userContext";
// constants
import { USER_TABLE_HEAD } from '../../../constants';
//
import '../table.styles.scss';

const TableHead = ({ screenSize, onSelectAllTableRow, isCheckBoxDisabled }) => {

  const { isAllUsersChecked } = useContext(UserContext);

  const onCheckedAllBoxes = () => {
    onSelectAllTableRow(!isAllUsersChecked);
  };

  const getUserTableHead = () => (
    screenSize > 900 ?
      USER_TABLE_HEAD.map((headText, ind) => (
        <div key={`head-cell-${ind}`} className="head-cell">{headText}</div>
      ))
    :
      screenSize > 500 ?
        <>
          <div className="head-cell">User</div>
          <div className="head-cell">Actions</div>
        </>
      :
        <div className="head-cell">User</div>
  );

  const responsiveTableHeadClassName = screenSize < 900 ? ' responsive-head' : '';

  return (
    <div className={`table-row table-head${responsiveTableHeadClassName}`}>
      <div className="head-cell">
        <CheckBox
          testID="all-user-selection"
          handleCheckboxChange={onCheckedAllBoxes}
          checked={isAllUsersChecked}
          isCheckBoxDisabled={isCheckBoxDisabled}
        />
      </div>
      {getUserTableHead()}
    </div>
  );
};

TableHead.propTypes = {
  onSelectAllTableRow: PropTypes.func.isRequired,
  screenSize: PropTypes.number.isRequired,
  isCheckBoxDisabled: PropTypes.bool.isRequired,
};

export default TableHead;
