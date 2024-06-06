import PropTypes from 'prop-types';

import './checkbox.styles.scss';

const CheckBox = ({
  testID = 'user-box',
  checked,
  handleCheckboxChange,
}) => (
  <div className='checkbox-wrapper'>
    <input type="checkbox" checked={checked} onChange={handleCheckboxChange} data-testid={testID} />
    <label data-testid={`${testID}-label`} />
  </div>
);

CheckBox.propTypes = {
  handleCheckboxChange: PropTypes.func.isRequired,
  testID: PropTypes.string,
  checked: PropTypes.bool.isRequired,
};

export default CheckBox;
