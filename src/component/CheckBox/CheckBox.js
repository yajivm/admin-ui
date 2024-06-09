import PropTypes from 'prop-types';

import './checkbox.styles.scss';

const CheckBox = ({
  testID = 'user-box',
  checked,
  handleCheckboxChange,
  isCheckBoxDisabled,
}) => (
  <div className={ `checkbox-wrapper${isCheckBoxDisabled ? ' disabled' : ''}`}>
    <input type="checkbox" checked={checked} onChange={handleCheckboxChange} data-testid={testID} />
    <label data-testid={`${testID}-label`} />
  </div>
);

CheckBox.propTypes = {
  handleCheckboxChange: PropTypes.func.isRequired,
  testID: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  isCheckBoxDisabled: PropTypes.bool.isRequired
};

export default CheckBox;
