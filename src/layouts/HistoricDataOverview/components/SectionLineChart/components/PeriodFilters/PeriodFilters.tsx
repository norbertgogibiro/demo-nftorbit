import React from "react";
import classNames from "classnames";
import getRoundedNumber from "utils/functions/getRoundedNumber";
import styles from "./PeriodFilters.module.scss";

export type TPeriodName = "day" | "week" | "month";
export type TDataset = "floorPrice" | "volume";

export type TPeriodChanges = {
  [x in TDataset]: {
    [x in TPeriodName]: number;
  };
};

const datasetLabels: { [x in TDataset]: string } = {
  floorPrice: "floor price",
  volume: "volume",
};

type TProps = {
  dataset: TDataset;
  disabled?: boolean;
  datasetPeriodChanges: TPeriodChanges;
  activeFilterName: string;
  handleChange: (e: React.ChangeEvent) => void;
};

const PeriodFilters = ({
  dataset,
  disabled,
  datasetPeriodChanges,
  activeFilterName,
  handleChange,
}: TProps) => {
  const periodChanges = datasetPeriodChanges[dataset];
  return (
    <section className={styles.PeriodFilters}>
      {Object.entries(periodChanges).map(([periodName, percentageChange]) => {
        const firstLetter = periodName[0];
        const changePolarity = percentageChange < 0 ? "negative" : "positive";
        const isActive = periodName === activeFilterName;

        return (
          <label
            key={periodName}
            className={classNames(
              styles.periodFilter,
              styles[`polarity-${changePolarity}`],
              { [styles.isActive]: isActive },
            )}
            title={`Show ${datasetLabels[dataset]} changes in this ${periodName}`}
          >
            <input
              type="radio"
              name="period"
              value={periodName}
              checked={isActive}
              onChange={handleChange}
              disabled={disabled}
            />
            <div className={styles.filterText}>
              <p className={styles.title}>{`1${firstLetter}`}</p>
              <p className={styles.changeIndicator}>
                {`${getRoundedNumber(percentageChange)}%`}
              </p>
            </div>
          </label>
        );
      })}
    </section>
  );
};

export default PeriodFilters;
