import React, { useRef } from "react";
import Button from "components/Button/Button";
import WithSuggestions, {
  TSuggestionList,
} from "./components/WithSuggestions/WithSuggestions";
import IconMagnifier from "./assets/magnifier.svg";
import styles from "./Input.module.scss";

const inputAppearanceButtons = {
  search: {
    onClick: () => {},
    icon: { src: IconMagnifier, alt: "magnifier icon" },
  },
};

type TInputAppearance = "search";

type TProps = React.InputHTMLAttributes<HTMLInputElement> & {
  appearance: TInputAppearance;
  value: string;
  suggestionList?: TSuggestionList;
};

const Input = ({
  appearance,
  suggestionList,
  onChange,
  value,
  ...attributes
}: TProps) => {
  const refInputWrapper: React.RefObject<HTMLInputElement> = useRef(null);
  const refInput: React.RefObject<HTMLInputElement> = useRef(null);
  const inputButton = inputAppearanceButtons[appearance];
  const inputWrapper = (
    <label className={styles.inputWrapper}>
      <input
        ref={refInput}
        className={styles.input}
        onChange={onChange}
        value={value}
        {...attributes}
      />
    </label>
  );

  return (
    <div ref={refInputWrapper} className={styles.Input}>
      {suggestionList ? (
        <WithSuggestions
          suggestionList={suggestionList}
          refInputWrapper={refInputWrapper}
          refInput={refInput}
          inputValue={value}
        >
          {inputWrapper}
        </WithSuggestions>
      ) : (
        inputWrapper
      )}

      {inputButton && (
        <Button className={styles.button} onClick={inputButton.onClick}>
          <img src={inputButton.icon.src} alt={inputButton.icon.alt} />
        </Button>
      )}
    </div>
  );
};

export default Input;

export const SearchInput = (props: Omit<TProps, "appearance">) => (
  <Input appearance="search" {...props} />
);
