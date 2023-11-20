import React from "react";
import { useSearchParams } from "react-router-dom";
import { searchParamHistoricData } from "utils/constants";
import getRoundedNumber from "utils/functions/getRoundedNumber";
import { TProcessedData } from "../../AllCollections.utils";
import { SimpleTable, TSetRowClickHandlerData } from "components/Table/Table";
import CollectButton from "components/CollectButton/CollectButton";
import CurrencyIcon from "components/CurrencyIcon/CurrencyIcon";
import styles from "./AllCollectionsTable.module.scss";

type TProps = {
  data: TProcessedData | null;
  currentPage: number;
  setCurrentPage: (nextPageNumber: number) => void;
  isLoading: boolean;
};

const specificColumnHeadingContents = {
  priceChangeDaily: "1D",
  priceChangeWeekly: "1W",
  priceChangeMonthly: "1M",
  // priceChangeYearly: "1Y",
  volumeChangeDaily: "1D",
  volumeChangeWeekly: "1W",
  volumeChangeMonthly: "1M",
  // volumeChangeYearly: "1Y",
};

const getColoredPercentage = (amount: number) => {
  if (amount !== null) {
    const polarity = amount < 0 ? "negative" : "positive";
    return (
      <span className={styles[`polarity-${polarity}`]}>
        {`${getRoundedNumber(amount)}%`}
      </span>
    );
  }

  return "-";
};

const AllCollectionsTable = ({
  data,
  currentPage,
  setCurrentPage,
  isLoading,
}: TProps) => {
  const [, setSearchParams] = useSearchParams();

  const setRowClickHandlerData: TSetRowClickHandlerData = (args) => {
    const { ticker } = args?.cells || {};
    const passedTickerType = typeof ticker;

    if (passedTickerType !== "string") {
      throw new Error(
        `ERROR: Unexpected name type (not string but ${passedTickerType})`,
      );
    }

    return {
      title: "See historical data",
      callback: () => {
        setSearchParams({
          [searchParamHistoricData]: ticker?.toString() || "",
        });
      },
    };
  };

  const displayedData =
    data?.limitedResults.map(
      (
        { ticker, name, lastPrice, lastVolume, priceChange, volumeChange },
        index,
      ) => {
        const getPriceWithCurrency = (amount: number) => (
          <span className={styles.price}>
            <CurrencyIcon currency="EGLD" />
            <span>
              {Intl.NumberFormat("en-US", {
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(amount)}
            </span>
          </span>
        );

        return {
          rank: index + 1,
          name,
          ticker,
          price: getPriceWithCurrency(lastPrice),
          priceChangeDaily: getColoredPercentage(priceChange.day),
          priceChangeWeekly: getColoredPercentage(priceChange.week),
          priceChangeMonthly: getColoredPercentage(priceChange.month),
          // priceChangeYearly: getColoredPercentage(priceChange.year),
          volume: getPriceWithCurrency(lastVolume),
          volumeChangeDaily: getColoredPercentage(volumeChange.day),
          volumeChangeWeekly: getColoredPercentage(volumeChange.week),
          volumeChangeMonthly: getColoredPercentage(volumeChange.month),
          // volumeChangeYearly: getColoredPercentage(volumeChange.year),
          collect: (
            <CollectButton collectionTicker={ticker}>
              <CurrencyIcon currency="EGLD" />
            </CollectButton>
          ),
        };
      },
    ) || [];

  return (
    <SimpleTable
      className={styles.AllCollectionsTable}
      setRowClickHandlerData={setRowClickHandlerData}
      specificColumnHeadingContents={specificColumnHeadingContents}
      hiddenColumns={["ticker"]}
      data={displayedData}
      isLoading={isLoading}
      pagination={{
        currentPageNumber: currentPage,
        availablePages: data?.numberOfAllResults || 0,
        navigateToPage: (nextPageNumber) => {
          setTimeout(() => {
            if (currentPage !== nextPageNumber) {
              setCurrentPage(nextPageNumber);
            }
          }, 0);
        },
      }}
    />
  );
};

export default AllCollectionsTable;
