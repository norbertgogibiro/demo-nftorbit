import React, { useEffect, useRef, useState } from "react";
import { SearchInput } from "components/Input/Input";
import {
  TSuggestionOption,
  suggestionListSettings,
} from "components/Input/components/WithSuggestions/components/Suggestions/Suggestions";
import styles from "./CollectionSearch.module.scss";

type TResultsStorage = { [x: string]: TSuggestionOption[] };

const CollectionSearch = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [resultsStorage, setResultsStorage] = useState<TResultsStorage>({});
  const [suggestions, setSuggestions] = useState<TSuggestionOption[]>([]);

  const keyStrokeTimerId: React.MutableRefObject<
    ReturnType<typeof setTimeout> | undefined
  > = useRef();

  const updateSuggestions = (newInputValue: string) => {
    if (newInputValue.length >= suggestionListSettings.minCharactersRequired) {
      const currentInputSuggestions: TSuggestionOption[] | undefined =
        resultsStorage[newInputValue];

      if (currentInputSuggestions) {
        if (keyStrokeTimerId.current) {
          clearTimeout(keyStrokeTimerId.current);
        }

        const keyStrokeDelayTime = !!suggestions.length
          ? suggestionListSettings.keyStrokeDelayTime
          : 0;

        keyStrokeTimerId.current = setTimeout(() => {
          setSuggestions(currentInputSuggestions);
        }, keyStrokeDelayTime);
      } else if (!isLoadingSuggestions) {
        setIsLoadingSuggestions(true);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent) => {
    const newInputValue = (e.target as HTMLInputElement).value.toLowerCase();
    setInputValue(newInputValue);
    updateSuggestions(newInputValue);
  };

  const handleSuggestionChange = (e: React.ChangeEvent) => {
    setInputValue(
      (e.target as HTMLInputElement)
        .getAttribute("data-description")
        ?.toLowerCase() || "",
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.alert();
  };

  // Fetch the suggestions and update suggestions store:
  useEffect(() => {
    if (isLoadingSuggestions) {
      setTimeout(() => {
        const newSuggestions = [
          { value: "Test", label: "test" },
          { value: "Tes2", label: "test2" },
          { value: "Tes3", label: "test3" },
        ];

        setSuggestions(newSuggestions);

        setResultsStorage({
          ...resultsStorage,
          [inputValue]: newSuggestions,
        });
      }, 1000);
    }
  }, [inputValue, isLoadingSuggestions, resultsStorage]);

  // Update the loading state:
  useEffect(() => {
    setIsLoadingSuggestions(false);
  }, [resultsStorage]);

  return (
    <form className={styles.CollectionSearch} onSubmit={handleSubmit}>
      <SearchInput
        value={inputValue}
        placeholder="Search collection"
        onChange={handleSearchChange}
        suggestionList={{
          options: suggestions,
          handleChange: handleSuggestionChange,
          isLoading: isLoadingSuggestions,
          heading: "heading",
          shouldSubmitOnClick: true,
        }}
      />
    </form>
  );
};

export default CollectionSearch;
