import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useSearchParams } from "react-router-dom";
import { searchParamCollectionDetails } from "utils/constants";
import Button from "components/Button/Button";
import IconBLUE from "./assets/temp/iconBLUE.svg";
import styles from "./HighlightedCollections.module.scss";

type TProps = {
  innerClassNames: {
    icon: string;
  };
};

type TCollectionData = {
  id: string;
  name: string;
  logo: string;
};

// TODO: Can it be merged with HeaderFilters' data?
// (data from API may be different)
const highlightedCollections: TCollectionData[] = [
  { id: "234", name: "Blue Collection", logo: IconBLUE },
  { id: "235", name: "Green Collection", logo: IconBLUE },
  { id: "236", name: "Yellow Collection", logo: IconBLUE },
];

const HighlightedCollections = ({ innerClassNames }: TProps) => {
  const [, setSearchParams] = useSearchParams();

  const [displayedCollectionIndexes, setDisplayedCollectionIndexes] = useState<
    [number | null, number]
  >([null, 0]);

  const [, currentCollectionIndex] = displayedCollectionIndexes;
  const currentCollection = highlightedCollections[currentCollectionIndex];

  const handleHighlightClick = () => {
    setSearchParams({
      [searchParamCollectionDetails]: currentCollection.name,
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const incrementedCollectionIndex = currentCollectionIndex + 1;
      const nextCollectionIndex =
        incrementedCollectionIndex < highlightedCollections.length
          ? incrementedCollectionIndex
          : 0;

      const nextDisplayedIndexes = [
        currentCollectionIndex,
        nextCollectionIndex,
      ];

      setDisplayedCollectionIndexes(nextDisplayedIndexes as [number, number]);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentCollectionIndex]);

  return (
    <Button
      className={styles.HighlightedCollections}
      title={`See details of ${currentCollection.name}`}
      onClick={handleHighlightClick}
    >
      {displayedCollectionIndexes.map((collectionIndex) => {
        if (collectionIndex === null) {
          return null;
        }

        const { id, name, logo } = highlightedCollections[collectionIndex];

        return (
          <span key={id} className={styles.collection}>
            <img
              className={classNames(styles.icon, innerClassNames.icon)}
              src={logo}
              alt={`${name} logo`}
            />
            <span>{name}</span>
          </span>
        );
      })}
    </Button>
  );
};

export default HighlightedCollections;
