import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchParamHistoricData } from "utils/constants";
import requestApiGet from "utils/functions/requestApiGet";
import { LoadingArea } from "components/Loader/Loader";
import SectionSummary from "./components/SectionSummary/SectionSummary";
import SectionLineChart from "./components/SectionLineChart/SectionLineChart";
import styles from "./HistoricDataOverview.module.scss";

type TData = {
  name: string;
  ticker: string;
  imgUrl: string;
  supply: number;
  holders: number;
  floorPrice: number;
  tokenTicker: string;
  volume: {
    dayVolume: number;
    totalVolume: number;
    dayVolumeChange: number;
    weekVolumeChange: number;
    monthVolumeChange: number;
  };
  price: {
    dayFloorPriceChange: number;
    weekFloorPriceChange: number;
    monthFloorPriceChange: number;
  };
};

const initialData: TData = {
  name: "",
  ticker: "",
  imgUrl: "",
  supply: 0,
  holders: 0,
  floorPrice: 0,
  tokenTicker: "",
  price: {
    dayFloorPriceChange: 0,
    weekFloorPriceChange: 0,
    monthFloorPriceChange: 0,
  },
  volume: {
    dayVolume: 0,
    totalVolume: 0,
    dayVolumeChange: 0,
    weekVolumeChange: 0,
    monthVolumeChange: 0,
  },
};

const HistoricDataOverview = () => {
  const [data, setData] = useState<TData>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const ticker = searchParams.get(searchParamHistoricData);

  useEffect(() => {
    setIsLoading(true);
  }, [setIsLoading]);

  useEffect(() => {
    if (isLoading) {
      requestApiGet({
        apiUrl: `historical/${ticker}`,
        handleSuccess: (data: TData) => {
          console.log("data", data);
          setData(data);
        },
        handleError: (error) => {
          console.error(
            "ERROR: Could not load historic data for AllCollections",
            error,
          );
        },
        handleFinally: () => {
          setIsLoading(false);
        },
      });
    }
  }, [isLoading, setIsLoading, ticker]);

  return !ticker ? null : (
    <LoadingArea isLoaderBackgroundHidden isLoading={isLoading}>
      <section className={styles.HistoricDataOverview}>
        <SectionSummary
          ticker={ticker}
          name={data.name}
          logo={data.imgUrl}
          supply={data.supply}
          holders={data.holders}
          currency={data.tokenTicker}
          floorPrice={data.floorPrice}
          totalVolume={data.volume.totalVolume}
          dayVolume={data.volume.dayVolume}
        />

        <SectionLineChart
          dataset="floorPrice"
          ticker={ticker}
          datasetPeriodChanges={{
            volume: {
              day: data.volume.dayVolumeChange,
              week: data.volume.weekVolumeChange,
              month: data.volume.monthVolumeChange,
            },
            floorPrice: {
              day: data.price.dayFloorPriceChange,
              week: data.price.weekFloorPriceChange,
              month: data.price.monthFloorPriceChange,
            },
          }}
        />
      </section>
    </LoadingArea>
  );
};

export default HistoricDataOverview;
