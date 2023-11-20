import { useEffect } from "react";

type TUseEscapeKeydown = (
  keyHandlers: { [x: string]: () => void },
  options?: { shouldActivate?: boolean },
) => void;

const useKeydownEvent: TUseEscapeKeydown = (keyHandlers, options = {}) => {
  const { shouldActivate = true } = options;

  useEffect(() => {
    const handleKeyDown = ({ key }: KeyboardEvent) => {
      const specificKeyCallback = keyHandlers[key];
      if (specificKeyCallback) {
        specificKeyCallback();
      }
    };

    const removeEventListener = () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };

    if (shouldActivate) {
      document.addEventListener("keydown", handleKeyDown, true);
    } else {
      removeEventListener();
    }

    // TODO: Make sure this gets cleanup when you use react portals!
    return removeEventListener;
  }, [keyHandlers, shouldActivate]);
};

export default useKeydownEvent;
