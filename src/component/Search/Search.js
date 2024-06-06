import { useState } from 'react';
import PropTypes from 'prop-types';

import CrossIcon from '../../asset/icon/cross.svg';
import SearchIcon from '../../asset/icon/search.svg';

import './search.styles.scss';

const Search = ({ onInputChange, resetInputChange, disabled = false }) => {

  const [inputValue, setInputValue] = useState('');

  const onChangeInputValue = (value) => {
    setInputValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onInputChange(inputValue);
  }

  const clearInputValue = () => {
    setInputValue('');
    resetInputChange();
  };

  return (
    <div className={`input-box-wrapper ${disabled ? 'disabled' : ''}`}>
      <form className="search-form" data-testid="search-form" onSubmit={handleSubmit}>
        <input
          className="search-input"
          data-test="search-input"
          onChange={({ target: { value }}) => onChangeInputValue(value)}
          placeholder="Search by name, email or role"
          value={inputValue}
        />

        {inputValue?.length ?
          <div className="cross-icon-wrapper" data-testid="cross-icon" onClick={clearInputValue}>
            <img src={CrossIcon} alt="Icon" title="Clear" className="cross-icon" />
          </div>
        :
          <></>
        }
      </form>
      <button className="search-button" data-testid="search-button" onClick={handleSubmit}>
        <img src={SearchIcon} alt="search" title="search" className="search-icon" />
      </button>
    </div>
  )
};

Search.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  resetInputChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Search;
