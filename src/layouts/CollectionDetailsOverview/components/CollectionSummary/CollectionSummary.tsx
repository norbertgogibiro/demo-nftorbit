import React from "react";
import CurrencyIcon from "components/CurrencyIcon/CurrencyIcon";
import TempImage from "./assets/temp/image.png";
import styles from "./CollectionSummary.module.scss";

const CollectionSummary = () => (
  <header className={styles.CollectionSummary}>
    <img
      src={TempImage}
      alt="Elrond Apes logo" // TODO: This
    />

    <section>
      <h2>Elrond Apes</h2>

      <dl>
        <div className={styles.definitionGroup}>
          <dt>Chain</dt>
          <dd>
            <CurrencyIcon currency="EGLD" />
          </dd>
        </div>
        <div className={styles.definitionGroup}>
          <dt>Supply</dt>
          <dd>1000000</dd>
        </div>
        <div className={styles.definitionGroup}>
          <dt>Price</dt>
          <dd>1 EGLD</dd>
        </div>
      </dl>
    </section>
  </header>
);

export default CollectionSummary;
