import { useEffect } from "react";

type TUseOutsideClick = (
  refDomElement: React.RefObject<HTMLElement>,
  callback: (e: MouseEvent) => void,
  options?: {
    shouldActivate?: boolean;
    hesitationAllowed?: boolean;
  },
) => void;

const useOutsideClick: TUseOutsideClick = (
  refDomElement,
  callback,
  options = {},
) => {
  const { shouldActivate = true, hesitationAllowed = true } = options;
  const eventName = hesitationAllowed ? "mouseup" : "mousedown";

  useEffect(() => {
    const domElement = refDomElement.current;
    const handleOutsideClick = (e: MouseEvent) => {
      if (domElement && !domElement?.contains(e.target as HTMLElement)) {
        callback(e);
      }
    };

    const removeEventListener = () => {
      document.removeEventListener(eventName, handleOutsideClick, true);
    };

    if (shouldActivate) {
      if (domElement) {
        document.addEventListener(eventName, handleOutsideClick, true);
      } else {
        removeEventListener();
      }

      // TODO: Make sure this gets cleanup when you use react portals!
      return removeEventListener;
    } else {
      removeEventListener();
    }
  }, [callback, shouldActivate, refDomElement, eventName]);
};

export default useOutsideClick;
