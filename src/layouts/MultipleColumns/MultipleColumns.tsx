import React from "react";
import classNames from "classnames";
import styles from "./MultipleColumns.module.scss";

type TProps = {
  className?: string;
  addOrdinalNumbersToInnerHeadings?: boolean;
  children: React.ReactNode;
};

const MultipleColumns = ({
  addOrdinalNumbersToInnerHeadings,
  className,
  children,
}: TProps) => {
  const finalClassNames = classNames(styles.MultipleColumns, className);

  return addOrdinalNumbersToInnerHeadings ? (
    <ol className={classNames(finalClassNames, styles.hasOrderedHeadings)}>
      {React.Children.map(children, (child) => (
        <li>{child}</li>
      ))}
    </ol>
  ) : (
    <div className={finalClassNames}>{children}</div>
  );
};

export default MultipleColumns;
