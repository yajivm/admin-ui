import { useState } from "react";
import PropTypes from 'prop-types';

import './textbox.styles.scss';

const TextBox = ({
  field,
  handleInputChange,
  Id,
  testID,
  value,
}) => {
  const [inputValue, setInputValue] = useState(value);

  const onInputValueChange = ({ target: { value }}) => {
    setInputValue(value);
    handleInputChange(field, value, Id);
  };

  return (
    <div className="form-field">
      <input className="text-input" type="text" data-testid={testID} value={inputValue} onChange={onInputValueChange} />
    </div>
  );
};

TextBox.propTypes = {
  field: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  Id: PropTypes.string.isRequired,
  testID: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default TextBox;
