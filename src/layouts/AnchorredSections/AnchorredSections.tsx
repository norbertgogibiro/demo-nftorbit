import React from "react";
import classNames from "classnames";
import SectionLinks, {
  getSectionId,
  TSection,
} from "./components/SectionLinks/SectionLinks";

type TProps = {
  className?: string;
  sections: TSection[];
};

const AnchorredSections = ({ className, sections }: TProps) => (
  <div className={classNames(className)}>
    {sections.map((section) => (
      <section id={getSectionId(section)}>
        <SectionLinks sections={sections} currentSection={section} />
        {section.content}
      </section>
    ))}
  </div>
);

export default AnchorredSections;
