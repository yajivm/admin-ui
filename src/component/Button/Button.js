import PropTypes from 'prop-types';

import './button.styles.scss';

const Button = ({
  buttonText,
  onClick,
  testID = 'button',
  type = 'primary', // primary: #ff5171, secondary: #4a4a4a
}) => (
  <button
    className={`button ${type}`}
    data-test={testID}
    onClick={onClick}
    type="button"
  >
    {buttonText}
  </button>
);

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  testID: PropTypes.string,
  type: PropTypes.string,
};

export default Button;