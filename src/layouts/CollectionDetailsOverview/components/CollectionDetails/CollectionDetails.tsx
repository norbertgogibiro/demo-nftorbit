import React from "react";
import styles from "./CollectionDetails.module.scss";

type TProps = {
  description: string;
  launchDateTime: string;
};

const CollectionDetails = ({ description, launchDateTime }: TProps) => {
  const parsedDateTime = new Date(launchDateTime);

  const formattedDate = parsedDateTime.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = parsedDateTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
    timeZoneName: "short",
  });

  return (
    <section className={styles.CollectionDetails}>
      <dl>
        <dt>Launching</dt>
        <dd>{formattedDate}</dd>
        <dd>{formattedTime}</dd>
      </dl>
      <p>{description}</p>
    </section>
  );
};

export default CollectionDetails;
