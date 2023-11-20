import { useEffect } from "react";

type TUseFocusChange = (
  callback: () => void,
  options?: { shouldActivate?: boolean },
) => void;

const useFocusChange: TUseFocusChange = (callback, options = {}) => {
  const { shouldActivate = true } = options;

  useEffect(() => {
    const removeFocusListener = () => {
      window.removeEventListener("focus", callback, true);
    };

    if (shouldActivate) {
      window.addEventListener("focus", callback, true);
    } else {
    }

    return removeFocusListener;
  }, [callback, shouldActivate]);
};

export default useFocusChange;
