import React from 'react';
import classnames from 'classnames';
import { usePagination } from './usePagination';
import Icons from '../../atoms/icons';
import './index.scss'
import getPostType from '../../../resources/js/getPostType';
import { useEffect } from 'react';
const Pagination = props => {
    

    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    const postType = getPostType();
     useEffect(() =>{
        onPageChange(1);
    },[postType])

    // If there are less than 2 times in pagination range we shall not render the component
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }
    const totalPageCount = Math.ceil(totalCount / pageSize);

    const onFirst = () => {
        if (currentPage != 1 && currentPage != 2) {
            onPageChange(1);
        }
    };

    const onPrevious = () => {
        if (currentPage != 1) {
            onPageChange(currentPage - 1);
        }
    };

    const onNext = () => {
        if (currentPage != totalPageCount) {
            onPageChange(currentPage + 1);
        }
    };

    const onLast = () => {
        if (currentPage != totalPageCount && currentPage != totalPageCount-1) {
            onPageChange(totalPageCount);
        }
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <ul className={classnames('pagination-container', { [className]: className })} >
            <li className='item-count'>{totalCount} items</li>

            <li className={classnames('pagination-item', {
                disabled: (currentPage === 1 || currentPage == 2)
            })}
                onClick={onFirst}
            >
                «
            </li>


            <li className={classnames('pagination-item', {
                disabled: currentPage === 1
            })}
                onClick={onPrevious}
            >
                ‹
            </li>
            {/* {paginationRange.map((pageNumber, i) => {

                // If the pageItem is a DOT, render the DOTS unicode character
                // if (pageNumber === DOTS) {
                //   return <li className="pagination-item dots">&#8230;</li>;
                // }

                // Render our Page Pills
                return (
                    <li key={i} className={classnames('pagination-item', {
                        selected: pageNumber === currentPage
                    })}

                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            })} */}
            <li className='item-count'>{currentPage} of {totalPageCount}</li>
            <li className={classnames('pagination-item', {
                disabled: currentPage === lastPage
            })}

                onClick={onNext}
            >
                ›
            </li>

            <li className={classnames('pagination-item', {
                disabled: (currentPage === lastPage || currentPage == lastPage-1)
            })}
                onClick={onLast}
            >
                »
            </li>
        </ul>
    );
};

export default Pagination;