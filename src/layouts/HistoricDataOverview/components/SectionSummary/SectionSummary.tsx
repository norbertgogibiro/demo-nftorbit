import React from "react";
import getRoundedNumber from "utils/functions/getRoundedNumber";
import CollectButton from "components/CollectButton/CollectButton";
import styles from "./SectionSummary.module.scss";

type TProps = {
  ticker: string;
  name: string;
  logo: string;
  supply: number;
  holders: number;
  currency: string;
  floorPrice: number;
  totalVolume: number;
  dayVolume: number;
};

const SectionSummary = ({
  ticker,
  name,
  logo,
  supply,
  holders,
  currency,
  floorPrice,
  totalVolume,
  dayVolume,
}: TProps) => (
  <header className={styles.SectionSummary}>
    <section className={styles.index}>
      <img
        src={logo}
        alt={`${name} logo`} // TODO: This
      />

      <CollectButton className={styles.btnCollect} collectionTicker={ticker}>
        Collect
      </CollectButton>
    </section>

    <section>
      <h2>{name}</h2>

      <dl>
        <div className={styles.definitionGroup}>
          <dt>Floor</dt>
          <dd>
            {getRoundedNumber(floorPrice)} {currency}
          </dd>
        </div>
        <div className={styles.definitionGroup}>
          <dt>Supply</dt>
          <dd>{supply}</dd>
        </div>
        <div className={styles.definitionGroup}>
          <dt>Holders</dt>
          <dd>{holders}</dd>
        </div>
        <div className={styles.definitionGroup}>
          <dt>Total volume</dt>
          <dd>
            {getRoundedNumber(totalVolume)} {currency}
          </dd>
        </div>
        <div className={styles.definitionGroup}>
          <dt>Volume 24H</dt>
          <dd>
            {getRoundedNumber(dayVolume)} {currency}
          </dd>
        </div>
      </dl>
    </section>
  </header>
);

export default SectionSummary;
