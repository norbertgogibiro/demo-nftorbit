import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";
import { LoadingArea } from "components/Loader/Loader";
import {
  /* 
  // TODO: Implement this for mobile accordion support:
  TableCellMobileContent, */ TCellData,
  TColumnHeadingOrRenderer,
  getProcessedColumnHeading,
} from "./components/TableCellMobileContent/TableCellMobileContent";
import TablePagination, {
  TTablePaginationProps,
} from "./components/TablePagination/TablePagination";
import styles from "./Table.module.scss";

type TColumnHeadings = { [x: string]: TColumnHeadingOrRenderer };
type TColumnHeadingEntry = [string, TColumnHeadingOrRenderer];

type TTableData = {
  rows: TCellData[];
  groupId?: string;
  groupTitleContent?: React.ReactNode;
  groupHeadings?: TColumnHeadings;
};

type TNonEmptyTableData = [TTableData] | TTableData[];

type TLoadingProofData = {
  tableData: TNonEmptyTableData;
  availablePages: TTablePaginationProps["availablePages"];
};

type TRowGroupData = {
  groupId?: string;
  rows: TCellData[];
  cells: TCellData;
};

export type TSetRowClickHandlerData = (cells?: TRowGroupData) => {
  title: string;
  callback: () => void;
};

export type TTableProps = {
  className?: string;
  data: TNonEmptyTableData;
  isLoading: boolean;
  pagination?: Omit<TTablePaginationProps, "refParentTable" | "isLoading">;
  specificColumnHeadingContents?: TColumnHeadings;
  hiddenColumns?: [string] | string[];
  renderRowOptionsArea?: (data: TRowGroupData) => React.ReactNode;
  setRowClickHandlerData?: TSetRowClickHandlerData;
  getFinalCells?: (unformattedCells: TCellData) => {
    [x: string]: React.ReactNode | string;
  };
};

const Table = ({
  getFinalCells,
  specificColumnHeadingContents,
  hiddenColumns = [],
  renderRowOptionsArea,
  setRowClickHandlerData,
  isLoading,
  className,
  pagination,
  data,
}: TTableProps) => {
  /**
   * @param data - Separate table body groups can be defined by adding multiple data objects. In this case, `groupId` is required. If only rows should be rendered in one single table body, then add single data object within an array. This way `groupId`-s can be defined per table group.
   * @param specificColumnHeadingContents - By default, cell object keys will be used as column headings. In case you want to display different or more detailed content in the column heading, then this prop provides you with support for doing so. If `getFinalCells` is provided, then the headings are validated after it - in case the cell data object changes after this runs, then the validation will check the final object's keys. If you don't want to add column heading for a data key (which will be interpreted as a column on desktop screens), then add `null`. If you don't want to display the column at all, then add its data key name to `hiddenColumns` prop - its data will be accessible via `rowData.cells`. The order of the heading keys determine the order of the columns. Accepts a renderer `(isTableView: boolean) => React.ReactNode | string` or a content `React.ReactNode | string`.
   * @param getFinalCells - Here you can modify the final data that will be used for rendering cells in the table rows. It will be checked whether all of the output object's keys has corresponding keys in `specificColumnHeadingContents`.
   * @param hiddenColumns - Prevents rendering all table columns where `columnId` (aka the cell data's key) matches the keys passed to the array of this prop. Although the column is not rendered, this way the data for the cells in the column are still accessible for rendering purposes via `rowdata.cells`.
   */

  const [loadingProofData, setLoadingProofData] = useState<TLoadingProofData>({
    tableData: data,
    availablePages: pagination?.availablePages || 0,
  });

  const refTable: React.RefObject<HTMLTableElement> = useRef(null);
  const uniqueId = uuidv4();
  const rowOptionsColumnId = `${uniqueId}-rowOptions`;

  // Runs after final cells' data object is ready:
  const checkIfAllHeadingsDefined = ({
    finalCells,
    finalColumnHeadings,
  }: {
    finalCells: TCellData;
    finalColumnHeadings: TColumnHeadingEntry[];
  }) => {
    const columnIds = finalColumnHeadings.map(([columnId]) => columnId);

    Object.keys(finalCells).forEach((columnId) => {
      if (!columnIds.includes(columnId)) {
        throw new Error(
          [
            `ERROR: No column heading was defined with the key "${columnId}".`,
            "If you intend to have empty heading content for this column,",
            "then assign a value of `null` to this key. You may have defined it",
            "either as a group heading in the data, or as column heading via props.",
          ].join(" "),
        );
      }
    });
  };

  const availableColumnHeadings = loadingProofData.tableData.reduce(
    (output: { [x: string]: TColumnHeadingOrRenderer }, { rows }) => {
      rows.forEach((cells) => {
        Object.keys(cells).forEach((key) => {
          const specifiedColumnHeading =
            specificColumnHeadingContents && specificColumnHeadingContents[key];

          output[key] =
            specifiedColumnHeading !== undefined ? specifiedColumnHeading : key;
        });
      });

      return output;
    },
    {},
  );

  useEffect(() => {
    if (!isLoading) {
      setLoadingProofData({
        tableData: data,
        availablePages: pagination?.availablePages || 0,
      });
    }
  }, [data, isLoading, pagination?.availablePages]);

  return (
    <LoadingArea isLoading={isLoading}>
      <div className={classNames(styles.Table, className)}>
        <table ref={refTable}>
          {loadingProofData.tableData.map(
            ({ groupId, groupTitleContent, rows, groupHeadings }) => {
              const finalColumnHeadings: TColumnHeadingEntry[] = Object.entries(
                {
                  ...(groupHeadings || availableColumnHeadings),
                  ...(renderRowOptionsArea
                    ? { [rowOptionsColumnId]: null }
                    : {}),
                },
              );

              return (
                <tbody key={groupId || uuidv4()}>
                  {groupTitleContent && (
                    <tr>
                      <th colSpan={finalColumnHeadings.length}>
                        {groupTitleContent}
                      </th>
                    </tr>
                  )}

                  <tr className={styles.rowColumnHeadings}>
                    {finalColumnHeadings.map(
                      ([columnId, columnHeading], index) => {
                        if (hiddenColumns.includes(columnId)) {
                          return null;
                        }

                        const getProcessedContent = (isTableView: boolean) => {
                          return getProcessedColumnHeading(columnHeading, {
                            isTableView,
                          });
                        };

                        // TODO: Implement this for mobile accordion support:
                        //const mobileHeadingContent = getProcessedContent(false);
                        const desktopHeadingContent = getProcessedContent(true);

                        return (
                          <th key={columnId} id={`${uniqueId}-${columnId}`}>
                            {/* // TODO: Implement this for mobile accordion support:
                    mobileHeadingContent && index === 0 && (
                      <span className={styles.mobileOnly}>
                        {mobileHeadingContent}
                      </span>
                    ) */}

                            {desktopHeadingContent && (
                              <span
                                className={classNames({
                                  [styles.mobileHidden]: index === 0,
                                })}
                              >
                                {desktopHeadingContent}
                              </span>
                            )}
                          </th>
                        );
                      },
                    )}
                  </tr>

                  {rows.map((cells) => {
                    const columnIds = finalColumnHeadings.map(([id]) => id);
                    const finalCells = getFinalCells
                      ? getFinalCells(cells)
                      : cells;
                    const rowDetails = { groupId, rows, cells };
                    let rowAttributes = {};

                    const rowOptionsArea =
                      renderRowOptionsArea && renderRowOptionsArea(rowDetails);

                    checkIfAllHeadingsDefined({
                      finalCells,
                      finalColumnHeadings,
                    });

                    if (setRowClickHandlerData) {
                      const rowClickHandlerData =
                        setRowClickHandlerData(rowDetails);

                      rowAttributes = {
                        className: styles.clickableRow,
                        onClick: rowClickHandlerData.callback,
                        title: rowClickHandlerData.title,
                        tabIndex: 0,
                      };
                    }

                    return (
                      <tr key={uuidv4()} {...rowAttributes}>
                        {columnIds.map((columnId, index) => {
                          if (hiddenColumns.includes(columnId)) {
                            return null;
                          }

                          /*
                    // TODO: Implement this for mobile accordion support:
                    return index === 0 ? (
                      <td headers={columnId}>
                        <TableCellMobileContent
                          key={columnId}
                          columnHeadingEntries={finalColumnHeadings}
                          columnId={columnId}
                          finalCells={finalCells}
                          rowOptionsArea={rowOptionsArea}
                          className={styles.TableCellMobileContent}
                        />
                      </td>
                    ) : (
                      <td key={columnId} headers={columnId}>
                        {columnId === rowOptionsColumnId
                          ? rowOptionsArea
                          : finalCells[columnId]}
                      </td>
                    ); */

                          return (
                            <td key={columnId} headers={columnId}>
                              {columnId === rowOptionsColumnId
                                ? rowOptionsArea
                                : finalCells[columnId]}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              );
            },
          )}

          {pagination && (
            <tfoot>
              <tr>
                <td colSpan={Object.keys(availableColumnHeadings).length}>
                  <TablePagination
                    refParentTable={refTable}
                    isLoading={isLoading}
                    currentPageNumber={pagination.currentPageNumber}
                    navigateToPage={pagination.navigateToPage}
                    availablePages={loadingProofData.availablePages}
                  />
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </LoadingArea>
  );
};

export default Table;

export type TSimpleTableProps = Omit<TTableProps, "data"> & {
  data: [TCellData] | TCellData[];
};

export const SimpleTable = ({ data, ...tableProps }: TSimpleTableProps) => (
  <Table data={[{ rows: data }]} {...tableProps} />
);
