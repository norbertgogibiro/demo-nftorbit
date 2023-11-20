export type TFilterOption = { text: string; value: string };
type TRangeFilterLabel = "top";
type TDatasetFilterLabel = "price" | "volume";
export type TFilterLabel = TRangeFilterLabel | TDatasetFilterLabel;

type TDisplayed100EndOptions = TFilterOption[];
export const displayed100EndOptions: TDisplayed100EndOptions = [
  { text: "top 100", value: "top-100" },
  { text: "top 200", value: "top-200" },
  { text: "top 300", value: "top-300" },
  { text: "top 400", value: "top-400" },
  { text: "top 500", value: "top-500" },
];

type TDatasetPeriodOptions = { [x in TDatasetFilterLabel]: TFilterOption[] };
export const datasetPeriodOptions: TDatasetPeriodOptions = {
  price: [
    { text: "1 day", value: "price-day" },
    { text: "1 week", value: "price-week" },
    { text: "1 month", value: "price-month" },
    { text: "1 year", value: "price-year" },
  ],
  volume: [
    { text: "1 day", value: "volume-day" },
    { text: "1 week", value: "volume-week" },
    { text: "1 month", value: "volume-month" },
    { text: "1 year", value: "volume-year" },
  ],
};

export const defaultDisplayed100End: string = displayed100EndOptions[0].value;
export const defaultDatasetPeriod: string = datasetPeriodOptions.price[0].value;
