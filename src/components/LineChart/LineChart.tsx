import React from "react";
import Chart from "react-apexcharts";
import outdent from "outdent";
import { ApexOptions } from "apexcharts";
import colors from "utils/styles/_colors.scss";
import borders from "utils/styles/_borders.scss";
import timeDurations from "utils/styles/_timeDurations.scss";
import styles from "./LineChart.module.scss";
import "./apexcharts-override.css";

export type TChartData = { x: Date; y: number }[];

type TProps = {
  data: TChartData | null;
};

const markerRadius: number = 7;
const defaultData = [{ x: new Date(), y: 0 }];

const options = {
  tooltip: {}, // to be defined after initialization
  stroke: {
    curve: "smooth",
    width: parseInt(borders.widthNormal),
  },
  grid: {
    yaxis: {
      lines: {
        show: false,
      },
    },
    padding: {
      top: markerRadius,
      bottom: markerRadius,
      left: 0,
      right: 0,
    },
  },
  xaxis: {
    labels: { show: false },
    tooltip: { enabled: false },
    crosshairs: { show: false },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    labels: { show: false },
    min: 0, // to be defined after initialization
    max: 0, // to be defined after initialization
  },
  legend: { show: false },
  chart: {
    background: "none",
    toolbar: { show: false },
    zoom: { enabled: false },
    sparkline: { enabled: true },
    animations: {
      easing: "easeinout",
      speed: timeDurations.transitionSlowest,
    },
  },
  markers: {
    strokeWidth: 0,
    discrete: [], // to be defined after initialization
    hover: {
      size: markerRadius,
    },
  },
  annotations: {
    yaxis: [
      {
        y: 80,
        borderColor: colors.gray400,
        strokeDashArray: 8,
        label: {
          borderColor: "white",
          style: {
            color: "red",
            background: "green",
          },
        },
      },
    ],
  },
};

const LineChart = ({ data }: TProps) => {
  if (data) {
    const firstDatePrice = data[0].y;

    // Aligning the baseline with the first value:
    /* If you define the options in the component, or by calling a
     * setter function, the tooltip access disappear for some reason */
    options.annotations.yaxis[0].y = firstDatePrice;

    // Coloring the markers depending on their value's polarity
    // compared to the baseline:
    options.markers.discrete = data.map(({ y }, index) => {
      const fillColor = y < firstDatePrice ? colors.red : colors.green;
      return {
        seriesIndex: 0,
        dataPointIndex: index,
        fillColor: fillColor,
        size: 0.1, // needed because 0 would not show the marker when hovered
      };
    }) as any;

    // Setting min and max values:
    const dataExtremes = data.reduce(
      (results, { y }) => {
        if (y >= results.max) {
          results.max = y;
        }

        if (y <= results.min) {
          results.min = y;
        }

        return results;
      },
      {
        min: Number.POSITIVE_INFINITY,
        max: Number.NEGATIVE_INFINITY,
      },
    );

    options.yaxis.min = dataExtremes.min;
    options.yaxis.max = dataExtremes.max;
    options.tooltip = {
      custom: ({ dataPointIndex }: { dataPointIndex: number }) => {
        const { x: currentDateTime, y: currentValue } = data[dataPointIndex];
        const textColor =
          currentValue < firstDatePrice ? colors.red : colors.green;

        const formattedDate = currentDateTime.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });

        const formattedTime = currentDateTime.toLocaleTimeString("en-GB", {
          hour: "numeric",
          minute: "numeric",
          timeZone: "UTC",
          timeZoneName: "short",
        });

        return outdent`
        <dl class="${styles.tooltip}">
          <dt>${formattedDate} ${formattedTime}</dt>
          <dd style="color: ${textColor}">
            ${currentValue} EGLD
          </dd>
        </dl>
      `;
      },
    } as any;
  }

  return (
    <Chart
      key={JSON.stringify(data)}
      className={styles.LineChart}
      options={options as ApexOptions}
      series={[
        {
          name: "value",
          color: colors.purplePortage,
          data: data || defaultData,
        },
      ]}
      type="line"
      height={112}
    />
  );
};

export default LineChart;
