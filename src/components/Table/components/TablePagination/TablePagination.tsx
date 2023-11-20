import React, { useEffect } from "react";
import Button from "components/Button/Button";
import ImgChevronRight from "./assets/chevronRight.svg";
import styles from "./TablePagination.module.scss";
import scrollUpToRefElement from "utils/functions/scrollUpToRefElement";

export type TTablePaginationProps = {
  currentPageNumber: number;
  availablePages: number;
  isLoading: boolean;
  navigateToPage: (nextPageNumber: number) => void;
  refParentTable: React.RefObject<HTMLTableElement>;
};

const TablePagination = ({
  currentPageNumber,
  availablePages,
  navigateToPage,
  isLoading,
  refParentTable,
}: TTablePaginationProps) => {
  const previousPageNumber = currentPageNumber - 1;
  const nextPageNumber = currentPageNumber + 1;

  const handleSelectChange = (e: React.ChangeEvent) => {
    navigateToPage(parseInt((e.target as HTMLSelectElement).value));
  };

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        scrollUpToRefElement(refParentTable);
      }, 10);
    }
  }, [isLoading, refParentTable]);

  return (
    <div className={styles.TablePagination}>
      <p>
        {"Page "}

        <select
          value={currentPageNumber}
          onChange={handleSelectChange}
          disabled={isLoading}
        >
          {[...new Array(availablePages)].map((_, pageIndex) => {
            const pageNumber = pageIndex + 1;
            return <option value={pageNumber}>{pageNumber}</option>;
          })}
        </select>

        {` of ${availablePages}`}
      </p>

      <div className={styles.singleStepNavigation}>
        <Button
          disabled={isLoading || previousPageNumber < 1}
          onClick={() => {
            navigateToPage(previousPageNumber);
          }}
        >
          <img src={ImgChevronRight} alt="arrow left" />
          Previous
        </Button>

        <Button
          disabled={isLoading || nextPageNumber >= availablePages}
          onClick={() => {
            navigateToPage(nextPageNumber);
          }}
        >
          Next
          <img src={ImgChevronRight} alt="arrow right" />
        </Button>
      </div>
    </div>
  );
};

export default TablePagination;
