import React, { useEffect, useRef, useState } from "react";
import { focusableElementSelectors } from "utils/constants";
import useKeydownEvent from "utils/hooks/useKeydownEvent";
import useFocusChange from "utils/hooks/useFocusChange";
import useOutsideClick from "utils/hooks/useOutsideClick";
import Suggestions, {
  TSuggestionOption,
  suggestionListSettings,
} from "./components/Suggestions/Suggestions";

export type TSuggestionList = {
  heading?: string;
  handleChange: (e: React.ChangeEvent) => void;
  options?: TSuggestionOption[] | null;
  isLoading?: boolean;
  shouldSubmitOnClick?: boolean;
};

type TProps = {
  suggestionList: TSuggestionList;
  refInputWrapper: React.RefObject<HTMLElement>;
  refInput: React.RefObject<HTMLInputElement>;
  inputValue: string;
  children: React.ReactElement<HTMLLabelElement>;
};

const WithSuggestions = ({
  suggestionList,
  refInputWrapper,
  refInput,
  inputValue,
  children,
}: TProps) => {
  const [shouldShowSuggestions, setShouldShowSuggestions] = useState(false);
  const [areSuggestionsBlocked, setAreSuggestionsBlocked] = useState(false);
  const refSuggestionList: React.RefObject<HTMLMenuElement> = useRef(null);
  const hasSuggestionList: boolean = !!suggestionList;

  const triggerSubmitRequest = () => {
    const parentForm = refSuggestionList.current?.closest("form");

    if (parentForm) {
      parentForm.requestSubmit();
    }
  };

  const closeSuggestionList = () => {
    // TODO: Get rid of this timeout:
    setTimeout(() => {
      setAreSuggestionsBlocked(true);
    }, 0);
  };

  const rollUpSuggestionList = () => {
    closeSuggestionList();

    if (refSuggestionList.current?.contains(document.activeElement)) {
      const inputElement = refInput.current;
      if (inputElement) {
        inputElement.focus();
      }
    }
  };

  useEffect(() => {
    const inputElement = refInput.current;
    const handleInputKeydown = ({ key }: KeyboardEvent) => {
      if (key === "ArrowDown") {
        setAreSuggestionsBlocked(false);

        const firstFocusableElement: HTMLElement | null =
          refSuggestionList.current?.querySelector(
            focusableElementSelectors.join(", "),
          ) || null;

        if (firstFocusableElement) {
          firstFocusableElement.focus();
        }
      }
    };

    const handleInputClick = () => {
      setAreSuggestionsBlocked(false);
    };

    inputElement?.addEventListener("mousedown", handleInputClick, true);
    inputElement?.addEventListener("keydown", handleInputKeydown, true);

    return () => {
      inputElement?.removeEventListener("mousedown", handleInputClick, true);
      inputElement?.removeEventListener("keydown", handleInputKeydown, true);
    };
  }, [refInput]);

  useKeydownEvent(
    { Escape: rollUpSuggestionList, Enter: rollUpSuggestionList },
    { shouldActivate: !areSuggestionsBlocked },
  );

  useEffect(() => {
    if (suggestionList) {
      setShouldShowSuggestions(
        inputValue.length >= suggestionListSettings.minCharactersRequired,
      );
    }
  }, [suggestionList, inputValue]);

  useEffect(() => {
    setAreSuggestionsBlocked(false);
  }, [inputValue]);

  useFocusChange(
    () => {
      if (!refInputWrapper.current?.contains(document.activeElement)) {
        setAreSuggestionsBlocked(true);
      }
    },
    { shouldActivate: hasSuggestionList },
  );

  useOutsideClick(refInputWrapper, closeSuggestionList, {
    hesitationAllowed: false,
  });

  return (
    <>
      {children}

      {suggestionList && shouldShowSuggestions && !areSuggestionsBlocked && (
        <Suggestions
          ref={refSuggestionList}
          currentInputValue={inputValue}
          heading={suggestionList.heading}
          handleChange={suggestionList.handleChange}
          handleListClose={closeSuggestionList}
          options={suggestionList.options}
          isLoading={suggestionList.isLoading}
          triggerSubmitRequest={
            suggestionList.shouldSubmitOnClick
              ? triggerSubmitRequest
              : undefined
          }
        />
      )}
    </>
  );
};

export default WithSuggestions;
