import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
// Context
import UserContext from "../../context/userContext";
// Icons
import CrossIcon from '../../asset/icon/cross.svg';
import SearchIcon from '../../asset/icon/search.svg';
// Component
import Button from '../Button';
//
import './search.styles.scss';

const Search = ({ searchableList, isSearchDisabled }) => {

  const {
    handleSearchUser,
    resetSearchResults,
  } = useContext(UserContext);

  const [inputValue, setInputValue] = useState('');

  const onChangeInputValue = (value) => {
    setInputValue(value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearchUser(inputValue);
  }

  const clearInputValue = () => {
    setInputValue('');
    resetSearchResults();
  };

  const isDisabled = (!searchableList.length && !inputValue.length) || isSearchDisabled;

  return (
    <div className={`input-box-wrapper ${isDisabled ? 'disabled' : ''}`}>
      <form className="search-form" data-testid="search-form" onSubmit={handleSubmit}>
        <input
          className="search-input"
          data-test="search-input"
          onChange={({ target: { value }}) => onChangeInputValue(value)}
          placeholder="Search by name, email or role"
          value={inputValue}
        />

        {inputValue?.length ?
          <Button
            imgType="cross"
            onClick={clearInputValue}
            buttonImage={CrossIcon}
            btnClassName="cross-icon-wrapper"
          />
        :
          <></>
        }
      </form>
      <Button
        imgType="search"
        onClick={handleSubmit}
        buttonImage={SearchIcon}
        btnClassName="search-button"
        isSubmitButton
      />
    </div>
  )
};

Search.propTypes = {
  searchableList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  })),
  isSearchDisabled: PropTypes.bool.isRequired,
};

export default Search;
