import React from "react";
import classNames from "classnames";
import IconClose from "./assets/times.svg";
import Button from "components/Button/Button";
import styles from "./HeaderFilter.module.scss";

type TProps = {
  className?: string;
  collectionName: string;
  isSelected?: boolean;
  handleFilterClick: (e: React.MouseEvent) => void;
  icon: string;
  innerClassNames: {
    icon: string;
    isSelected: string;
  };
};

const HeaderFilter = ({
  className,
  collectionName,
  isSelected,
  handleFilterClick,
  innerClassNames,
  icon,
}: TProps) => (
  <Button
    title={!isSelected ? "Activate this filter" : "Deactivate this filter"}
    onClick={handleFilterClick}
    className={classNames(styles.HeaderFilter, className, {
      [styles.isSelected]: isSelected,
      [innerClassNames.isSelected]: isSelected,
    })}
  >
    <img
      className={classNames(styles.icon, innerClassNames.icon)}
      src={icon}
      alt={`${collectionName} icon`}
    />

    <span className={styles.content}>
      <span>{collectionName}</span>
      <img className={styles.iconClose} src={IconClose} alt="x" />
    </span>
  </Button>
);

export default HeaderFilter;
