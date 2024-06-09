import { useCallback, useEffect, useRef } from 'react';
//
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
  const buttonRef = useRef(null);

  const handleEnterKeyEvent = useCallback((e) => {
    if(!isSubmitButton && e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
    }
  }, [isSubmitButton, ]);

  useEffect(() => {
    const buttonEl = buttonRef?.current;
    buttonEl?.addEventListener('keydown', handleEnterKeyEvent);

    return () => {
      buttonEl?.removeEventListener('keydown', handleEnterKeyEvent);
    }
  }, [handleEnterKeyEvent]);
  
  if (isButtonWithText) {
    return (
      <button
        className={btnClassName ? btnClassName : `button ${type}`}
        data-testid={testID}
        onClick={onClick}
        type="button"
        ref={buttonRef}
      >
        {buttonText}
      </button>
    )
  }
  
  if (!isButtonWithText && !!buttonImage) {
    return (
      <button
        className={btnClassName ? btnClassName : `action-button ${imgType}${isImgWithBg ? ' non-bg' : ''}`}
        data-testid={`${imgType}-button`}
        onClick={onClick}
        type={isSubmitButton ? 'submit' : 'button'}
        ref={buttonRef}
      >
        <img src={buttonImage} alt={imgType} title={imgType} />
      </button>
    );
  }

  return <></>;
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
  isSubmitButton: PropTypes.bool,
};

export default Button;
