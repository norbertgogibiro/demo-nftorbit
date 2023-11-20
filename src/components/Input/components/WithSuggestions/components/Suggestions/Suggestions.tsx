import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Loader from "components/Loader/Loader";
import PartiallyHighlightedText from "components/PartiallyHighlightedText/PartiallyHighlightedText";
import styles from "./Suggestions.module.scss";

export const suggestionListSettings = {
  minCharactersRequired: 3,
  keyStrokeDelayTime: 700,
};

export type TSuggestionOption = {
  value: string;
  label: string;
};

type TProps = {
  currentInputValue: string;
  handleChange: (e: React.ChangeEvent) => void;
  handleListClose: () => void;
  triggerSubmitRequest?: () => void;
  options?: TSuggestionOption[] | null;
  isLoading?: boolean;
  heading?: string;
};

const Suggestions = React.forwardRef<HTMLMenuElement, TProps>((props, ref) => {
  const id = uuidv4();

  const {
    currentInputValue,
    options = [],
    handleChange,
    handleListClose,
    triggerSubmitRequest,
    isLoading,
    heading,
  } = props;

  const [clickedLabel, setClickedLabel] = useState<string | undefined>();

  // Submit the form when a suggestion is clicked, but after
  // the current input value is updated:
  useEffect(() => {
    if (clickedLabel === currentInputValue) {
      handleListClose();

      if (triggerSubmitRequest) {
        triggerSubmitRequest();
      }
    }
  }, [clickedLabel, currentInputValue, handleListClose, triggerSubmitRequest]);

  return (
    <menu className={styles.Suggestions} ref={ref}>
      {!isLoading ? (
        <>
          {heading && <h2>{heading}</h2>}
          {options?.map(({ value, label }) => (
            <label
              key={value}
              onMouseDown={() => {
                setClickedLabel(label);
              }}
            >
              <input
                type="radio"
                name={`input-suggestion-${id}`}
                value={value}
                onChange={handleChange}
                data-description={label}
              />

              <PartiallyHighlightedText
                className={styles.suggestionText}
                fullText={label}
                highlightedPart={currentInputValue}
              />
            </label>
          ))}
        </>
      ) : (
        <Loader />
      )}
    </menu>
  );
});

export default Suggestions;
