import getParsedCssSize from "./getParsedCssSize";
import pageLayoutStyles from "layouts/PageLayout/_PageLayout.scss";

const scrollUpToRefElement = (refElement: React.RefObject<HTMLElement>) => {
  const element = refElement.current;
  const yOffset = getParsedCssSize(pageLayoutStyles.sizeHeaderHeight) * -1;

  const nextScrollTopPosition =
    element && element.getBoundingClientRect().top + window.scrollY + yOffset;

  if (
    nextScrollTopPosition !== null &&
    nextScrollTopPosition < document.documentElement.scrollTop
  ) {
    window.scrollTo({ top: nextScrollTopPosition, behavior: "smooth" });
  }
};

export default scrollUpToRefElement;
