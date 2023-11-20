import React from "react";
import AnchorredSections from "layouts/AnchorredSections/AnchorredSections";
import MovingBlobs from "components/MovingBlobs/MovingBlobs";
import Disclaimer from "./components/Disclaimer/Disclaimer";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService/TermsOfService";
import styles from "./PrivacyAndTerms.module.scss";

export const urlPath = "/privacy-and-terms";

const PrivacyAndTerms = () => (
  <section className={styles.PrivacyAndTerms}>
    <MovingBlobs />
    <AnchorredSections
      className={styles.anchorredSections}
      sections={[
        {
          linkText: "NFT Orbit Disclaimer",
          content: <Disclaimer />,
        },
        {
          linkText: "Privacy Policy",
          content: <PrivacyPolicy />,
        },
        {
          linkText: "Terms of Service",
          content: <TermsOfService />,
        },
      ]}
    />
  </section>
);

export default PrivacyAndTerms;
