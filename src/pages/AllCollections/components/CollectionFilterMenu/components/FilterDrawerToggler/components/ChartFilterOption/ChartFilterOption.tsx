import React, { useEffect, useState } from "react";
import { TFilterLabel } from "../../../../CollectionFilterMenu.utils";
import ImgClose from "./assets/times.svg";
import styles from "./ChartFilterOption.module.scss";

export type TChartFilterOption = {
  text: string;
  value: string;
};

type TProps = TChartFilterOption & {
  label: TFilterLabel;
  filterValue: string;
  setFilterValue: (nextFilterValue: string) => void;
  defaultFilterValue: string;
};

const ChartFilterOption = ({
  text,
  value,
  label,
  filterValue,
  setFilterValue,
  defaultFilterValue,
}: TProps) => {
  const [checked, setChecked] = useState<boolean>(false);

  const deactivateOption = () => {
    if (checked) {
      setFilterValue(defaultFilterValue);
    }
  };

  const handleChange = () => {
    setFilterValue(value);
  };

  const handleKeyup = ({ key }: React.KeyboardEvent) => {
    if (key === " " || key === "Backspace") {
      deactivateOption();
    }
  };

  useEffect(() => {
    setChecked(filterValue === value);
  }, [filterValue, value]);

  return (
    <label className={styles.ChartFilterOption}>
      <input
        type="radio"
        name={label}
        value={value}
        checked={checked}
        onChange={handleChange}
        onKeyUp={handleKeyup}
        onClick={deactivateOption}
      />
      <span className={styles.filterOptionContent}>
        <span className={styles.text}>{text}</span>
        {value !== defaultFilterValue && (
          <img className={styles.iconClose} src={ImgClose} alt="x" />
        )}
      </span>
    </label>
  );
};

export default ChartFilterOption;
