import React, { useEffect, useState } from "react";
import { LoadingArea } from "components/Loader/Loader";
import CollectionSummary from "./components/CollectionSummary/CollectionSummary";
import CollectionDetails from "./components/CollectionDetails/CollectionDetails";
import CollectionLinks from "./components/CollectionLinks/CollectionLinks";
import styles from "./CollectionDetailsOverview.module.scss";

type TOverviewData = {
  description: string;
  launchDateTime: string;
  links: {
    general: string;
    twitter: string;
    facebook: string;
    instagram: string;
  };
};

const newData = {
  name: "Elrond Apes",
  chain: "EGLD",
  supply: 10000,
  price: 1,
  description: `Introducing Strik9 Labs, a groundbreaking NFT project powered by the collective wisdom and creativity of its community. Strik9 puts the power in the hands of its NFT holders, allowing them to directly influence and shape the project's future. Season 1 — 5555 genetically enhanced, biped dogs were abducted by the enigmatic "Commissioner" and given the powerful ‘K9 Serum’. — The Commissioner had previously scoured the galaxy in search of the ultimate sporting league.`,
  launchDateTime: "2023-12-12",
  links: {
    general: "https://instagram.com",
    twitter: "https://instagram.com",
    facebook: "https://instagram.com",
    instagram: "https://instagram.com",
  },
};

const CollectionDetailsOverview = () => {
  const [data, setData] = useState<TOverviewData | null>(null);

  useEffect(() => {
    if (!data) {
      setTimeout(() => {
        setData(newData as any);
      }, 500);
    }
  }, [data]);

  return (
    <LoadingArea isLoading={!data}>
      {data && (
        <section className={styles.CollectionDetailsOverview}>
          <div className={styles.mainContent}>
            <CollectionSummary />
            <CollectionDetails
              description={data.description}
              launchDateTime={data.launchDateTime}
            />
          </div>
          <CollectionLinks links={data.links} />
        </section>
      )}
    </LoadingArea>
  );
};

export default CollectionDetailsOverview;
