import { useEffect, useRef } from "react";

type TUsePageScrollDisabling = (options?: { shouldActivate?: boolean }) => void;

const usePageScrollDisabling: TUsePageScrollDisabling = ({
  shouldActivate = true,
} = {}) => {
  const previousPositionData: React.MutableRefObject<{
    bodyPosition: string;
    bodyTop: string;
    scrollY: number;
  }> = useRef({
    bodyPosition: document.body.style.position,
    bodyTop: document.body.style.top,
    scrollY: window.scrollY,
  });

  useEffect(() => {
    const resetPageScroll = () => {
      document.body.style.position = previousPositionData.current.bodyPosition;
      document.body.style.top = previousPositionData.current.bodyTop;
      window.scroll({ top: previousPositionData.current.scrollY });
    };

    if (shouldActivate) {
      const { scrollY } = window;

      previousPositionData.current = {
        bodyPosition: document.body.style.position,
        bodyTop: document.body.style.top,
        scrollY,
      };

      document.body.style.top = `-${scrollY}px`;
      document.body.style.position = "fixed";
    } else {
      resetPageScroll();
    }

    return resetPageScroll;
  }, [shouldActivate]);
};

export default usePageScrollDisabling;
