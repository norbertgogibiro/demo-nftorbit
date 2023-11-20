import React from "react";
import EGLD from "assets/images/icons/blockchain/egld.svg";
import styles from "./CurrencyIcon.module.scss";

const currencyIcons: { [x: string]: string } = { EGLD: EGLD }; // TODO: Temp
const acceptedCurrencies = [...Object.keys(currencyIcons)] as const;

type TCurrency = (typeof acceptedCurrencies)[number];
type TProps = {
  currency: TCurrency;
};

const CurrencyIcon = ({ currency }: TProps) => (
  <img
    className={styles.CurrencyIcon}
    src={currencyIcons[currency]}
    alt={currency}
  />
);

export default CurrencyIcon;
