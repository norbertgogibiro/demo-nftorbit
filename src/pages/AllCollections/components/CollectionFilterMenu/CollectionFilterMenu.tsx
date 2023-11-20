import React, { useState } from "react";
import classNames from "classnames";
import { v4 as uuidv4 } from "uuid";
import {
  TFilterLabel,
  TFilterOption,
  defaultDisplayed100End,
  defaultDatasetPeriod,
  displayed100EndOptions,
  datasetPeriodOptions,
} from "./CollectionFilterMenu.utils";
import { TInfoBarContentProps } from "components/BubbleChart/components/ChartInfoBar/ChartInfoBar";
import FilterDrawerToggler from "./components/FilterDrawerToggler/FilterDrawerToggler";
import Button from "components/Button/Button";
import ImgClose from "./assets/times.svg";
import styles from "./CollectionFilterMenu.module.scss";

type TFilters = {
  value: string;
  setValue: (nextValue: string) => void;
  defaultValue: string;
  controllers: {
    label: TFilterLabel;
    options: TFilterOption[];
  }[];
}[];

const collapsibleAreaId = `collapsible-menu-${uuidv4()}`;

const CollectionFilterMenu = ({ isTopPositioned }: TInfoBarContentProps) => {
  const [openedFilter, setOpenedFilter] = useState<TFilterLabel | null>(null);
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(true);
  const [displayed100End, setDisplayed100End] = useState<string>(
    defaultDisplayed100End,
  );
  const [datasetPeriod, setDatasetPeriod] =
    useState<string>(defaultDatasetPeriod);

  const filters: TFilters = [
    {
      value: displayed100End,
      setValue: setDisplayed100End,
      defaultValue: defaultDisplayed100End,
      controllers: [{ label: "top", options: displayed100EndOptions }],
    },
    {
      value: datasetPeriod,
      setValue: setDatasetPeriod,
      defaultValue: defaultDatasetPeriod,
      controllers: [
        { label: "price", options: datasetPeriodOptions.price },
        { label: "volume", options: datasetPeriodOptions.volume },
      ],
    },
  ];

  const isAnyFilterAltered = filters.some(({ value, defaultValue }) => {
    return value !== defaultValue;
  });

  const btnCloseTitle = isAnyFilterAltered
    ? "Clear all filter parameters"
    : "Hide filters menu";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submitted");
  };

  const toggleMenu = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };

  const collapseMenu = () => {
    setIsMenuExpanded(false);
  };

  const resetFilters = () => {
    setDisplayed100End(defaultDisplayed100End);
    setDatasetPeriod(defaultDatasetPeriod);
    setOpenedFilter(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={classNames(styles.CollectionFilterMenu, {
        [styles.isTopPositioned]: isTopPositioned,
        [styles.isExpanded]: isMenuExpanded,
      })}
    >
      <section className={styles.filterContent}>
        <header>
          <Button
            className={styles.btnToggleMenuExpansion}
            aria-controls={collapsibleAreaId}
            title="Toggle filter menu options"
            onClick={toggleMenu}
          >
            Filters
          </Button>
        </header>

        <div id={collapsibleAreaId} className={styles.collapsibleArea}>
          {filters.map(({ defaultValue, value, setValue, controllers }) => {
            return controllers.map(({ label, options }) => (
              <FilterDrawerToggler
                className={styles.FilterDrawerToggler}
                isExpanded={openedFilter === label}
                options={options}
                filterValue={value}
                setFilterValue={setValue}
                defaultFilterValue={defaultValue}
                setOpenedFilter={setOpenedFilter}
                label={label}
                innerClassNames={{
                  summary: styles.filterOptionsToggler,
                  drawer: styles.filterOptionsDrawer,
                }}
              />
            ));
          })}

          <footer>
            <Button
              title={btnCloseTitle}
              onClick={isAnyFilterAltered ? resetFilters : collapseMenu}
              className={classNames(styles.btnClearFilters, {
                [styles.isAnyFilterAltered]: isAnyFilterAltered,
              })}
            >
              <img src={ImgClose} alt="x" />
            </Button>
          </footer>
        </div>
      </section>
    </form>
  );
};

export default CollectionFilterMenu;
