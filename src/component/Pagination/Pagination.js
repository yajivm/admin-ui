import PropTypes from 'prop-types';
//
import {
  DISABLED,
  DOTS,
  ACTIVE,
  NON_ACTIVE,
  COMMON_BUTTON_CLS_NAME,
  ROW_COUNT_PER_PAGE,
}
from '../../constants';
// Components
import Button from '../Button';
// helpers
import getPaginationList from '../../helpers/getPaginationList';
//
import './pagination.styles.scss';

const Pagination = ({
  currentPage,
  onPageChange,
  totalDataCount,
  tabelSize,
}) => {

  if (currentPage === 0 || totalDataCount < ROW_COUNT_PER_PAGE) {
    return null;
  }

  const pageNumbers = getPaginationList({
    totalDataCount,
    tabelSize,
    currentPage,
  });

  const onClickNext = () => {
    onPageChange(currentPage + 1);
  };

  const onClickPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = Math.ceil(totalDataCount / tabelSize);

  const getButtonDisabledStatus = pageNum => currentPage === pageNum ? DISABLED : '';
  const getPageNumButtonActiveStatus = pageNum => currentPage === pageNum? ACTIVE : NON_ACTIVE ;
  const getCommonPageNumBtnClassName = type => `${COMMON_BUTTON_CLS_NAME} ${type}-page`;
  const getPageClassNameWithNumber = (ind, pageNum) =>
    ind === 0 ? `first-page` :
      ind === pageNumbers.length - 1 ?
        `last-page` : `page-number-${pageNum}`;

  return (
    <div className="pagination-wrapper">
      <ul>
          <li>
            <Button
              isButtonWithText
              buttonText={`<<`}
              onClick={() => onPageChange(1)}
              btnClassName={`${getCommonPageNumBtnClassName('first')} ${getButtonDisabledStatus(1)}`}
            />
          </li>
          <li>
            <Button
              isButtonWithText
              buttonText={`<`}
              onClick={onClickPrevious}
              btnClassName={`${getCommonPageNumBtnClassName('previous')} ${getButtonDisabledStatus(1)}`}
            />
          </li>
          {pageNumbers.length ?
            <li className="no-list-button">
              <ul>
                {pageNumbers.map((no, ind) => {
                  if (no === DOTS) {
                    return <li key={`don-${ind}`} className="pagination-item dots">&#8230;</li>;
                  }

                  return (
                    <li key={`page-number-${no}`}>
                      <Button
                        isButtonWithText
                        buttonText={`${no}`}
                        onClick={() => onPageChange(no)}
                        btnClassName={`${COMMON_BUTTON_CLS_NAME} ${getPageClassNameWithNumber(ind, no)} ${getPageNumButtonActiveStatus(no)}`}
                      />
                    </li>
                  )
                })}
              </ul>
            </li>
          :
            <></>  
          }
          <li>
            <Button
              isButtonWithText
              buttonText={`>`}
              onClick={onClickNext}
              btnClassName={`${getCommonPageNumBtnClassName('next')} ${getButtonDisabledStatus(lastPage)}`}
            />
          </li>
          <li>
            <Button
              isButtonWithText
              buttonText={`>>`}
              onClick={() => onPageChange(lastPage)}
              btnClassName={`${getCommonPageNumBtnClassName('last')} ${getButtonDisabledStatus(lastPage)}`}
            />
          </li>
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  totalDataCount: PropTypes.number.isRequired,
  tabelSize: PropTypes.number.isRequired,
};

export default Pagination;
