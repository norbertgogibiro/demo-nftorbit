import { TChartData } from "components/LineChart/LineChart";
import { TPeriodName } from "./components/PeriodFilters/PeriodFilters";

type TPeriodRanges = { [x in TPeriodName]: number };
export const periodRanges: TPeriodRanges = {
  day: 24,
  week: 7,
  month: 30,
};

/* -------------------------------------------------------------
 * Getting the period name from the length of the data:
 * -------------------------------------------------------------
 * Period usually includes the range (length of series) + now,
 * therefore we may assume (yes, assume - ask Sam on backend why)
 * the range param number is linked to the received lenght of data
 * instead of receiving back any certain info like labels or so.
 * Therefore data length of 25 should match the "day" period (as
 * its range value is 24), 8 should match the "week" period (as its
 * range value is 7), and so on.
 */
type TGetDateTimesForPeriod = (numberOfDataPoints: number) => Date[];
const getDateTimesForPeriod: TGetDateTimesForPeriod = (numberOfDataPoints) => {
  const arrayForLabels = new Array(numberOfDataPoints).fill("");
  const periodName = Object.keys(periodRanges).find((key) => {
    return periodRanges[key as TPeriodName] === numberOfDataPoints - 1;
  });

  switch (periodName) {
    case "day":
      return arrayForLabels.map((_, index) => {
        const date = new Date(new Date());
        return new Date(
          Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours() - index,
          ),
        );
      });

    case "week":
    case "month":
      return arrayForLabels.map((_, index) => {
        const date = new Date(new Date());
        return new Date(
          Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - index),
        );
      });

    default:
      throw new Error(
        [
          "ERROR: No period name found based on the number of data points",
          `"${numberOfDataPoints}". The number of data points are usually`,
          "the range of a period + 1 (to include the latest sample such as",
          'values for "today" or "now").',
        ].join(" "),
      );
  }
};

/* -------------------------------------------------------------
 * Processing the raw data series into consumable data shape:
 * -------------------------------------------------------------
 * 1. We need to assign labels manually to the single array series
 *    as the current endpoint does not return them. This could easily
 *    be out of sync, so I will not be surprised if you read this
 *    now because traces of a hard-to-find bug lead you here - currently
 *    there is no better way to do it as of 2023-10-31.
 *
 * 2. We need to reverse the received series because the first value
 *    is the latest sample, and the last value is the oldest, but
 *    in the UI we want to read the graph from left to right. This should
 *    be done after the labels are assigned, as they are also generated
 *    backwards from today/now. The output should match the data structure
 *    expected in the LineChart component.
 */
export type TDataSeries = number[];
type TGetProcessedData = (rawData: TDataSeries) => TChartData;
export const getProcessedData: TGetProcessedData = (rawData) => {
  const dataPointLabels = getDateTimesForPeriod(rawData.length);
  const processedData = rawData.map((value, dataPointIndex) => {
    const dateTime = dataPointLabels[dataPointIndex];

    if (!dateTime) {
      throw new Error(
        `ERROR: No dateTime defined for datapoint "${dataPointIndex}" with value "${value}"`,
      );
    }

    return {
      x: dateTime,
      y: value,
    };
  });

  return processedData.reverse();
};
