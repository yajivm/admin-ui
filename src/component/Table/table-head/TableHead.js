import { useContext } from 'react';
import PropTypes from 'prop-types';
// Components
import CheckBox from "../../CheckBox";
// Context
import UserContext from "../../../context/userContext";
// Config
import Config from '../../../config';
//
import '../table.styles.scss';

const { USER_TABLE_HEAD } = Config;

const TableHead = ({ onSelectAllTableRow }) => {

  const { isAllUsersChecked } = useContext(UserContext);

  const onCheckedAllBoxes = () => {
    onSelectAllTableRow(!isAllUsersChecked);
  };

  return (
    <div className="table-row table-head">
      <div className="head-cell">
        <CheckBox handleCheckboxChange={onCheckedAllBoxes} checked={isAllUsersChecked} testID="all-user-selection" />
      </div>
      {
        USER_TABLE_HEAD.map((headText, ind) => (
          <div key={`head-cell-${ind}`} className="head-cell">{headText}</div>
        ))
      }
    </div>
  );
};

TableHead.propTypes = {
  onSelectAllTableRow: PropTypes.func.isRequired,
};

export default TableHead;
