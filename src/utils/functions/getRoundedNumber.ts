type TGetRoundedNumber = (floatNumber: number) => number;
const getRoundedNumber: TGetRoundedNumber = (floatNumber) => {
  return +floatNumber.toFixed(2);
};

export default getRoundedNumber;
