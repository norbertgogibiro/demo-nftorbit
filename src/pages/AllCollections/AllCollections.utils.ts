import requestApiGet from "utils/functions/requestApiGet";

type Data = {
  name: string;
  ticker: string;
  imgUrl: string;
  price: {
    dayFloorPrice: number;
    dayFloorPriceChange: number;
    weekFloorPriceChange: number;
    monthFloorPriceChange: number;
  };
  volume: {
    dayVolume: number;
    dayVolumeChange: number;
    weekVolumeChange: number;
    monthVolumeChange: number;
  };
};

type TChanges = {
  // year: number;
  month: number;
  week: number;
  day: number;
};

export type TProcessedData = {
  numberOfAllResults: number;
  limitedResults: {
    ticker: string;
    name: string;
    logo: string;
    lastPrice: number;
    lastVolume: number;
    priceChange: TChanges;
    volumeChange: TChanges;
    isHighlighted?: boolean;
  }[];
};

const maxResultsPerPage = 5;

export const getProcessedData = (
  currentPage: number,
  handleSuccess: (processedData: TProcessedData) => void,
  handleFinally: () => void,
) => {
  requestApiGet({
    apiUrl: `/rank/week/Volume/false/?page=${currentPage}&limit=${maxResultsPerPage}`,
    handleSuccess: (fetchedData: Data[]) => {
      const processedData = {
        numberOfAllResults: 500, // TODO: This should come from the backend
        limitedResults: fetchedData.map((data: Data) => ({
          name: data.name,
          ticker: data.ticker,
          logo: data.imgUrl,
          lastPrice: data.price.dayFloorPrice,
          lastVolume: data.volume.dayVolume,
          priceChange: {
            // year: 0,
            month: data.price.monthFloorPriceChange,
            week: data.price.weekFloorPriceChange,
            day: data.price.dayFloorPriceChange,
          },
          volumeChange: {
            // year: 0,
            month: data.volume.monthVolumeChange,
            week: data.volume.weekVolumeChange,
            day: data.volume.dayVolumeChange,
          },
        })),
      };

      handleSuccess(processedData);
    },
    handleError: (error) => {
      console.error("ERROR: Could not load data for AllCollections", error);
    },
    handleFinally,
  });
};
