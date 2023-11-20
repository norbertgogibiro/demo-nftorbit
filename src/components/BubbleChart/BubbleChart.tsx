import React, { useRef } from "react";
import { LoadingArea } from "components/Loader/Loader";
import BouncingBubbles, {
  TBouncingBubblesProps,
} from "./components/BouncingBubbles/BouncingBubbles";
import ChartInfoBar, {
  TInfoBarContentProps,
} from "./components/ChartInfoBar/ChartInfoBar";
import styles from "./BubbleChart.module.scss";

type TBubbleChartMouseEvent =
  | "handleBubbleMouseEnter"
  | "handleBubbleMouseLeave"
  | "handleBubbleClick";

export type TBubbleChartProps = Omit<
  TBouncingBubblesProps,
  TBubbleChartMouseEvent
> & {
  isLoading?: boolean;
  InfoBarContent: React.ComponentType<TInfoBarContentProps>;
  handleCollectionClick: (collectionTicker: string) => void;
};

const BubbleChart = ({
  data,
  isLoading,
  className,
  InfoBarContent,
  handleCollectionClick,
}: TBubbleChartProps) => {
  const refBubbleChart: React.RefObject<HTMLDivElement> = useRef(null);

  return (
    <LoadingArea isLoading={isLoading}>
      <div ref={refBubbleChart} className={styles.BubbleChart}>
        <BouncingBubbles
          key={JSON.stringify(data)}
          data={!isLoading ? data : []}
          className={className}
          handleBubbleClick={handleCollectionClick}
        />

        {!isLoading && (
          <ChartInfoBar
            refParentBubbleChart={refBubbleChart}
            renderContent={(props) => <InfoBarContent {...props} />}
          />
        )}
      </div>
    </LoadingArea>
  );
};

export default BubbleChart;
