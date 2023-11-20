import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import useKeydownEvent from "utils/hooks/useKeydownEvent";
import useOutsideClick from "utils/hooks/useOutsideClick";
import { urlPath as allCollectionsPath } from "pages/AllCollections/AllCollections";
import { urlPath as upcomingCollectionsPath } from "pages/UpcomingCollections/UpcomingCollections";
import HeaderFilter from "./components/HeaderFilter";

// TODO: These will be fetched from the API: (are you sure?)
import IconARB from "./assets/temp/iconARB.svg";
import IconAVAX from "./assets/temp/iconAVAX.svg";
import IconBNB from "./assets/temp/iconBNB.svg";
import IconBTC from "./assets/temp/iconBTC.svg";
import IconEGLD from "./assets/temp/iconEGLD.svg";
import IconETH from "./assets/temp/iconETH.svg";
import IconMATIC from "./assets/temp/iconMATIC.svg";
import IconSOL from "./assets/temp/iconSOL.svg";

import styles from "./HeaderFilters.module.scss";

const maxCollectionFilters = 4;
const effectedPagesPaths = [allCollectionsPath, upcomingCollectionsPath];

type TObjectEntry = [string, string];
type TSortedFilters = [React.ReactElement[], React.ReactElement[]];

type TProps = {
  className?: string;
  innerClassNames: {
    icon: string;
  };
};

const collectionIcons: { [x: string]: string } = {
  EGLD: IconEGLD,
  SOL: IconSOL,
  MATIC: IconMATIC,
  ETH: IconETH,
  BTC: IconBTC,
  BNB: IconBNB,
  AVAX: IconAVAX,
  ARB: IconARB,
};

const collectionIconEntries: TObjectEntry[] = Object.entries(collectionIcons);

type TSelectedFilter = {
  filterName: string;
  isSelectedFromDropdown?: boolean;
};

type THandleFilterClick = (
  e: React.MouseEvent,
  clickedFilterName: string,
) => void;

const HeaderFilters = ({ className, innerClassNames }: TProps) => {
  const { pathname } = useLocation();
  const navigateTo = useNavigate();

  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [filterEntries, setFilterEntries] = useState<TObjectEntry[]>(
    collectionIconEntries,
  );

  const [firstCollectionName] = filterEntries[0];
  const isCurrentPageEffected = effectedPagesPaths.includes(pathname);

  const [selectedFilter, setSelectedFilter] = useState<TSelectedFilter | null>(
    isCurrentPageEffected ? { filterName: firstCollectionName } : null,
  );

  const refDropdown: React.RefObject<HTMLDetailsElement> = useRef(null);

  const handleFilterClick: THandleFilterClick = (e, clickedFilterName) => {
    if (!isCurrentPageEffected) {
      navigateTo(allCollectionsPath);
    }

    // Check if filter was clicked within the dropdown:
    const isSelectedFromDropdown: boolean = !!(e.target as HTMLElement).closest(
      `.${styles.dropdownWrapper}`,
    );

    setSelectedFilter((currentValue) => {
      return clickedFilterName !== currentValue?.filterName ||
        isSelectedFromDropdown !== currentValue.isSelectedFromDropdown
        ? { filterName: clickedFilterName, isSelectedFromDropdown }
        : null;
    });
  };

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };

  const [mainFilters, extendedFilters] = filterEntries.reduce(
    (sortedFilters: TSortedFilters, [name, icon]: TObjectEntry, index) => {
      const isDropdownFilter = index + 1 > maxCollectionFilters;
      const targetArrayIndex = !isDropdownFilter ? 0 : 1;
      const isSelected = name === selectedFilter?.filterName;

      sortedFilters[targetArrayIndex].push(
        <HeaderFilter
          className={styles.filter}
          collectionName={name}
          isSelected={isSelected}
          icon={icon}
          handleFilterClick={(e) => handleFilterClick(e, name)}
          innerClassNames={{
            icon: classNames(innerClassNames.icon, styles.filterIcon),
            isSelected: styles.isSelected,
          }}
        />,
      );

      return sortedFilters;
    },
    [[], []],
  );

  useEffect(() => {
    setDropdownOpen(false);

    // Put the selected dropdown filter in front of the main filters:
    const activeFilterIndex = filterEntries.findIndex(([collectionName]) => {
      return collectionName === selectedFilter?.filterName;
    });

    if (selectedFilter?.isSelectedFromDropdown) {
      const activeFilterEntry = filterEntries[activeFilterIndex];
      setFilterEntries([
        activeFilterEntry,
        ...filterEntries.slice(0, activeFilterIndex),
        ...filterEntries.slice(activeFilterIndex + 1),
      ]);
    }
  }, [filterEntries, selectedFilter]);

  useEffect(() => {
    if (!isCurrentPageEffected) {
      setSelectedFilter(null);
    }
  }, [isCurrentPageEffected]);

  useKeydownEvent(
    { Escape: handleDropdownClose },
    { shouldActivate: isDropdownOpen },
  );

  useOutsideClick(refDropdown, handleDropdownClose);

  return (
    <section className={classNames(styles.HeaderFilters, className)}>
      {mainFilters}

      {extendedFilters.map((extendedFilter) => (
        <span className={styles.mobileOnly}>{extendedFilter}</span>
      ))}

      <details
        ref={refDropdown}
        className={styles.dropdownWrapper}
        open={isDropdownOpen}
        onClick={handleDropdownToggle}
        title="See further filters"
      >
        <summary className={styles.filter}>more</summary>
        <div className={styles.dropdown}>{extendedFilters}</div>
      </details>
    </section>
  );
};

export default HeaderFilters;
