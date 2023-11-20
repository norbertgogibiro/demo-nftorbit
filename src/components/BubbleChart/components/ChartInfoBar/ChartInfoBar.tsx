import React, { useEffect, useState } from "react";
import classNames from "classnames";
import scrollUpToRefElement from "utils/functions/scrollUpToRefElement";
import Button from "components/Button/Button";
import styles from "./ChartInfoBar.module.scss";

export type TInfoBarContentProps = {
  isTopPositioned?: boolean;
};

type TProps = {
  refParentBubbleChart: React.RefObject<HTMLElement>;
  renderContent: (props?: TInfoBarContentProps) => React.ReactNode;
};

const ChartInfoBar = ({ refParentBubbleChart, renderContent }: TProps) => {
  const [isTopPositioned, setIsTopPositioned] = useState<boolean>(false);

  const handleTopPositionToggling = () => {
    setIsTopPositioned(!isTopPositioned);
  };

  useEffect(() => {
    if (isTopPositioned) {
      scrollUpToRefElement(refParentBubbleChart);
    }
  }, [isTopPositioned, refParentBubbleChart]);

  return (
    <div
      className={classNames(styles.ChartInfoBar, {
        [styles.isTopPositioned]: isTopPositioned,
      })}
    >
      <div className={styles.infoBarContent}>
        <Button
          className={styles.btnToggleMenuTopPosition}
          onClick={handleTopPositionToggling}
          title="Change info bar position"
        >
          ▴
        </Button>

        {renderContent({ isTopPositioned })}
      </div>
    </div>
  );
};

export default ChartInfoBar;
