import React, { useEffect, useState } from "react";
import requestApiGet from "utils/functions/requestApiGet";
import {
  getProcessedData,
  periodRanges,
  TDataSeries,
} from "./SectionLineChart.utils";
import { LoadingArea } from "components/Loader/Loader";
import LineChart, { TChartData } from "components/LineChart/LineChart";
import PeriodFilters, {
  TDataset,
  TPeriodChanges,
  TPeriodName,
} from "./components/PeriodFilters/PeriodFilters";

type TProps = {
  dataset: TDataset;
  ticker: string;
  datasetPeriodChanges: TPeriodChanges;
};

const SectionLineChart = ({
  dataset,
  ticker,
  datasetPeriodChanges,
}: TProps) => {
  const [activeFilterName, setActiveFilterName] = useState<TPeriodName>("day");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chartData, setChartData] = useState<TChartData | null>(null);

  const handleChange = (e: React.ChangeEvent) => {
    setActiveFilterName((e.target as HTMLInputElement).value as TPeriodName);
  };

  useEffect(() => {
    if (isLoading) {
      const range = periodRanges[activeFilterName];

      requestApiGet({
        apiUrl: `nft-data/${ticker}/?dataset=${dataset}&range=${range}`,
        handleSuccess: (rawData: TDataSeries) => {
          setChartData(getProcessedData(rawData));
        },
        handleError: (error) => {
          console.error(
            `ERROR: Could not load historic data for "${ticker}"`,
            error,
          );
        },
        handleFinally: () => {
          setIsLoading(false);
        },
      });
    }
  }, [activeFilterName, dataset, isLoading, ticker]);

  useEffect(() => {
    setIsLoading(true);
  }, [activeFilterName]);

  return (
    <>
      <LoadingArea isLoading={isLoading}>
        <LineChart data={chartData} />
      </LoadingArea>

      <PeriodFilters
        dataset={dataset}
        disabled={!chartData || isLoading}
        datasetPeriodChanges={datasetPeriodChanges}
        activeFilterName={activeFilterName}
        handleChange={handleChange}
      />
    </>
  );
};

export default SectionLineChart;
