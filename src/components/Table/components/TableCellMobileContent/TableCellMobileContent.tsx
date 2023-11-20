import React, { useState } from "react";
import classNames from "classnames";
import Button from "components/Button/Button";
import styles from "./TableCellMobileContent.module.scss";

type TCellContent = React.ReactNode | string;
export type TCellData = { [x: string]: TCellContent };

type TTableCellMobileProps = {
  columnId: string;
  columnHeadingEntries: Array<[string, any]>;
  finalCells: TCellData;
  rowOptionsArea: React.ReactNode;
  className?: string;
};

type TCellRendererOptions = { isTableView?: boolean };

export type TColumnHeadingOrRenderer =
  | TCellContent
  | ((options: TCellRendererOptions) => TCellContent);

type TColumnHeadingProcessor = (
  columnHeading: TColumnHeadingOrRenderer,
  options?: TCellRendererOptions,
) => TCellContent;

export const getProcessedColumnHeading: TColumnHeadingProcessor = (
  columnHeading, // To accept callback that handles rendering
  options,
) => {
  return typeof columnHeading === "function"
    ? columnHeading({ isTableView: options?.isTableView })
    : columnHeading;
};

const TableCellMobileContent = ({
  columnId,
  columnHeadingEntries,
  rowOptionsArea,
  finalCells,
  className,
}: TTableCellMobileProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandButtonClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={classNames(styles.TableCellMobileContent, className)}>
      <div className={styles.mobileViewSummary}>
        <span>{finalCells[columnId]}</span>

        {rowOptionsArea && (
          <div
            className={classNames(styles.rowOptionsArea, styles.mobileOnly, {
              [styles.detailsExpanded]: isExpanded,
            })}
          >
            {rowOptionsArea}
          </div>
        )}
      </div>

      <dl
        className={classNames(styles.cellDetails, styles.mobileOnly, {
          [styles.expanded]: isExpanded,
        })}
      >
        {columnHeadingEntries.map((columnHeadingEntry, index) => {
          const [columnId, columnHeading] = columnHeadingEntry;
          const definitionDescription = finalCells[columnId];
          return (
            index > 0 &&
            definitionDescription &&
            columnId && (
              <div key={columnHeading} className={styles.definitionGroup}>
                <dt>{getProcessedColumnHeading(columnHeading)}</dt>
                <dd>{definitionDescription}</dd>
              </div>
            )
          );
        })}
      </dl>

      {Object.values(finalCells).length > 1 && (
        <Button
          onClick={handleExpandButtonClick}
          className={classNames(
            styles.btnExpand,
            styles.btnLinkShouldBeGlobalMaybe,
            styles.mobileOnly,
          )}
        >
          {!isExpanded ? "See more" : "See less"}
        </Button>
      )}
    </div>
  );
};

export default TableCellMobileContent;
