import React, { useRef } from "react";
import useKeydownEvent from "utils/hooks/useKeydownEvent";
import useOutsideClick from "utils/hooks/useOutsideClick";
import ChartFilterOption, {
  TChartFilterOption,
} from "./components/ChartFilterOption/ChartFilterOption";
import { TFilterLabel } from "../../CollectionFilterMenu.utils";
import ImgChevronUp from "./assets/chevron-up.svg";
import styles from "./FilterDrawerToggler.module.scss";
import classNames from "classnames";

type TProps = {
  options: TChartFilterOption[];
  filterValue: string;
  setFilterValue: (nextValue: string) => void;
  defaultFilterValue: string;
  setOpenedFilter: (nextOpenedFilterLabel: TFilterLabel | null) => void;
  innerClassNames?: { summary?: string; drawer?: string };
  isExpanded: boolean;
  label: TFilterLabel;
  className?: string;
};

const FilterDrawerToggler = ({
  options,
  defaultFilterValue,
  filterValue,
  setFilterValue,
  setOpenedFilter,
  innerClassNames,
  isExpanded,
  label,
  className,
}: TProps) => {
  const refFilterDrawerToggler: React.RefObject<HTMLDetailsElement> =
    useRef(null);

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleDrawerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleFilterToggle = () => {
    setOpenedFilter(!isExpanded ? label : null);
  };

  const closeFilters = () => {
    setOpenedFilter(null);
  };

  useKeydownEvent({ Escape: closeFilters }, { shouldActivate: isExpanded });

  useOutsideClick(refFilterDrawerToggler, closeFilters, {
    shouldActivate: isExpanded,
  });

  const isHighlighted =
    filterValue !== defaultFilterValue &&
    !!options.find(({ value }) => value === filterValue);

  return (
    <details
      key={label}
      className={classNames(
        styles.FilterDrawerToggler,
        { [styles.isHighlighted]: isHighlighted },
        className,
      )}
      onClick={handleDetailsClick}
      open={isExpanded}
      ref={refFilterDrawerToggler}
    >
      <div
        className={classNames(styles.drawer, innerClassNames?.drawer)}
        onClick={handleDrawerClick}
      >
        <div className={styles.content}>
          <fieldset>
            <legend>{label}</legend>
            <span>(100 bubbles displayed at all times)</span>
            <hr />

            <div className={styles.options}>
              {options.map(({ text, value }) => (
                <ChartFilterOption
                  key={value}
                  text={text}
                  label={label}
                  value={value}
                  filterValue={filterValue}
                  defaultFilterValue={defaultFilterValue}
                  setFilterValue={setFilterValue}
                />
              ))}
            </div>
          </fieldset>
        </div>
      </div>

      <summary
        className={innerClassNames?.summary}
        title={`Toggle ${label} filter options`}
        onClick={handleFilterToggle}
      >
        {label}
        <img
          src={ImgChevronUp}
          alt={isExpanded ? "Options shown" : "Options hidden"}
        />
      </summary>
    </details>
  );
};

export default FilterDrawerToggler;
