const cssTimeInSecondsRegex = /^\d*(\.(\d+))?s$/;
type TGetParsedCssTime = (cssTimeString: string) => number;
const getParsedCssTime: TGetParsedCssTime = (cssTimeString) => {
  const isTimeInSeconds = cssTimeInSecondsRegex.test(cssTimeString);
  return parseFloat(cssTimeString) * (isTimeInSeconds ? 1000 : 1);
};

export default getParsedCssTime;
