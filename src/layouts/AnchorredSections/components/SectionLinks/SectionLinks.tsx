import React from "react";
import Link from "components/Link/Link";
import styles from "./SectionLinks.module.scss";

export type TSection = {
  linkText: string;
  content: React.ReactNode;
};

type TProps = {
  sections: TSection[];
  currentSection: TSection;
};

type TGetSectionId = (section: TSection) => string;

export const getSectionId: TGetSectionId = (section) => {
  return section.linkText.replaceAll(" ", "-");
};

const SectionLinks = ({ sections, currentSection }: TProps) => (
  <nav className={styles.SectionLinks}>
    {sections.map((section) => (
      <li>
        <Link
          to={`#${getSectionId(section)}`}
          className={
            getSectionId(currentSection) === getSectionId(section)
              ? styles.isCurrent
              : undefined
          }
        >
          {section.linkText}
        </Link>
      </li>
    ))}
  </nav>
);

export default SectionLinks;
