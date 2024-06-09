import { useEffect  } from 'react';
import PropTypes from 'prop-types';

import './button.styles.scss';

const Button = ({
  buttonText = null,
  onClick,
  testID = 'button',
  type = 'primary', // primary: #ff5171, secondary: #4a4a4a,
  isButtonWithText = false,
  imgType = 'save',
  buttonImage,
  isImgWithBg = false,
  btnClassName = null,
  isSubmitButton = false
}) => {

  const handleEnterKeyEvent = (e) => {
    var key = e.keyCode || e.charCode;
    if (key === 13) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEnterKeyEvent);

    return () => {
      window.removeEventListener('keydown', handleEnterKeyEvent);
    }
  }, []);
  
  if (isButtonWithText) {
    return (
      <button
        className={btnClassName ? btnClassName : `button ${type}`}
        data-test={testID}
        onClick={onClick}
        type="button"
      >
        {buttonText}
      </button>
    )
  }

  return (
    <button
      className={btnClassName ? btnClassName : `action-button ${imgType}${isImgWithBg ? ' non-bg' : ''}`}
      data-test={`${imgType}-button`}
      onClick={onClick}
      type={isSubmitButton ? 'submit' : 'button'}
    >
      <img src={buttonImage} alt={imgType} title={imgType} className={`${imgType}-icon`} />
    </button>
  )
};

Button.propTypes = {
  buttonText: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  testID: PropTypes.string,
  type: PropTypes.string,
  isButtonWithText: PropTypes.bool,
  buttonImage: PropTypes.string,
  imgType: PropTypes.string,
  isImgWithBg: PropTypes.bool,
  btnClassName: PropTypes.string,
};

export default Button;
