import { useEffect, useRef } from "react";
import { focusableElementSelectors } from "utils/constants";

type TOptions = {
  isActive?: boolean;
  shouldFocusFirstChild?: boolean;
};

type TUseFocusTrap = (
  refFocusTrapElement: React.RefObject<HTMLElement>,
  options?: TOptions,
) => void;

const useFocusTrap: TUseFocusTrap = (refFocusTrapElement, options = {}) => {
  const tabIndexAttr = "tabindex";
  const originalTabIndexDataAttr = "data-tabindex-original-focustrap";
  const { isActive = true, shouldFocusFirstChild } = options;
  const refFocusedElementBeforeTrap: React.MutableRefObject<HTMLElement | null> =
    useRef(null);

  useEffect(() => {
    const currentlyFocusedElement = document.activeElement as HTMLElement;
    const focusTrapElement = refFocusTrapElement.current;
    const firstTrappedFocusableElement: HTMLElement | null =
      focusTrapElement?.querySelector(focusableElementSelectors.join(", ")) ||
      null;

    const unsetFocusTrap = () => {
      // Set back the original tab index of all focusable elements:
      document
        .querySelectorAll(focusableElementSelectors.join(", "))
        .forEach((focusableElement) => {
          const originalTabIndex = focusableElement.getAttribute(
            originalTabIndexDataAttr,
          );

          if (originalTabIndex) {
            focusableElement.setAttribute(tabIndexAttr, originalTabIndex);
            focusableElement.removeAttribute(originalTabIndexDataAttr);
          } else {
            focusableElement.removeAttribute(tabIndexAttr);
          }
        });

      // Focusing the element that was focused before the trap:
      const previouslyFocusedElement = refFocusedElementBeforeTrap.current;
      if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
      }
    };

    if (focusTrapElement) {
      if (isActive) {
        // Remove focus from the natural focus flow:
        refFocusedElementBeforeTrap.current = currentlyFocusedElement;
        currentlyFocusedElement.blur();

        // Focusing the first focusable element:
        if (firstTrappedFocusableElement) {
          if (shouldFocusFirstChild) {
            firstTrappedFocusableElement.focus();
          } else {
            firstTrappedFocusableElement.blur();
          }
        }

        // Disable all focusable elements behind the focus trap:
        document
          .querySelectorAll(focusableElementSelectors.join(", "))
          .forEach((focusableElement) => {
            // When activating the focus trap within a wrapper element:
            if (!focusTrapElement.contains(focusableElement)) {
              const originalTabIndex =
                focusableElement.getAttribute(tabIndexAttr);

              // Remove focusability:
              focusableElement.setAttribute(tabIndexAttr, "-1");

              // Store the original tab index value if previously set:
              if (originalTabIndex) {
                focusableElement.setAttribute(
                  originalTabIndexDataAttr,
                  originalTabIndex,
                );
              }
            }
          });
      } else {
        unsetFocusTrap();
      }
    }

    return () => {
      unsetFocusTrap();
    };
  }, [isActive, refFocusTrapElement, shouldFocusFirstChild]);
};

export default useFocusTrap;
