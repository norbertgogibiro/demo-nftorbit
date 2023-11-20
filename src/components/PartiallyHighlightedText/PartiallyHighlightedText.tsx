import React from "react";
import classNames from "classnames";
import styles from "./PartiallyHighlightedText.module.scss";

type TProps = {
  fullText: string;
  highlightedPart: string;
  className?: string;
};

const PartiallyHighlightedText = ({
  fullText,
  highlightedPart,
  className,
}: TProps) => {
  const parts: string[] = fullText.split(
    new RegExp(`(${highlightedPart})`, "gi"),
  );

  return (
    <span className={classNames(styles.PartiallyHighlightedText, className)}>
      {parts.map((part) =>
        part.toLowerCase() === highlightedPart.toLowerCase() ? (
          <mark>{part}</mark>
        ) : (
          part
        ),
      )}
    </span>
  );
};

export default PartiallyHighlightedText;
