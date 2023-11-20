type TGetParsedCssSize = (cssSizeString: string) => number;
const getParsedCssSize: TGetParsedCssSize = (cssSizeString) => {
  return parseInt(cssSizeString.replace("px", ""));
};

export default getParsedCssSize;
