import React from "react";
import Button from "components/Button/Button";
import styles from "./ListYourProjectButton.module.scss";

const UpcomingCollectionsChartBar = () => (
  <Button
    className={styles.ListYourProjectButton}
    onClick={() => window.alert()}
  >
    List your project
  </Button>
);

export default UpcomingCollectionsChartBar;
