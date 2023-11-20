import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchParamHistoricData } from "utils/constants";
import { getProcessedData, TProcessedData } from "./AllCollections.utils";
import MovingBlobs from "components/MovingBlobs/MovingBlobs";
import BubbleChart, {
  TBubbleChartProps,
} from "components/BubbleChart/BubbleChart";
import CollectionSearch from "./components/CollectionSearch/CollectionSearch";
import AllCollectionsTable from "./components/AllCollectionsTable/AllCollectionsTable";
import CollectionFilterMenu from "./components/CollectionFilterMenu/CollectionFilterMenu";

export const urlPath = "/";

const AllCollections = () => {
  const [data, setData] = useState<TProcessedData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [, setSearchParams] = useSearchParams();

  const handleDataSuccess = (processedData: TProcessedData) => {
    setData(processedData);
  };

  const handleDataFinally = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    setData(null);
  }, [currentPage]);

  useEffect(() => {
    if (isLoading) {
      getProcessedData(currentPage, handleDataSuccess, handleDataFinally);
    }
  }, [currentPage, isLoading]);

  const differenceShrinkerFactor = 20;
  const processedChartData: TBubbleChartProps["data"] =
    data?.limitedResults.map(({ ticker, name, logo, priceChange }) => ({
      radius: Math.abs(priceChange.day) + differenceShrinkerFactor,
      displayData: {
        ticker,
        name,
        logo,
        description: `${priceChange.day || 0}%`,
        color: priceChange.day > 0 ? "green" : "red",
      },
    })) || [];

  return (
    <section>
      <MovingBlobs />
      <BubbleChart
        isLoading={isLoading}
        InfoBarContent={CollectionFilterMenu}
        data={processedChartData}
        handleCollectionClick={(collectionTicker) => {
          setSearchParams({
            [searchParamHistoricData]: collectionTicker,
          });
        }}
      />

      <CollectionSearch />
      <AllCollectionsTable
        data={data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoading={isLoading}
      />
    </section>
  );
};

export default AllCollections;
