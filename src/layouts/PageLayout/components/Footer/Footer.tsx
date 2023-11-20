import React from "react";
import { urlPath as allCollectionsPath } from "pages/AllCollections/AllCollections";
import { urlPath as upcomingCollectionsPath } from "pages/UpcomingCollections/UpcomingCollections";
import { urlPath as contactUsPath } from "pages/ContactUs/ContactUs";
import { urlPath as privacyAndTermsPath } from "pages/PrivacyAndTerms/PrivacyAndTerms";
import Link, { TLinkData } from "components/Link/Link";
import LogoFooter from "./assets/logoFooter.svg";
import styles from "./Footer.module.scss";

const linkRows: [TLinkData[], TLinkData[]] = [
  [
    {
      text: "Privacy & terms",
      href: privacyAndTermsPath,
    },
    {
      text: "Upcoming collections",
      href: upcomingCollectionsPath,
    },
    {
      text: "Contact us",
      href: contactUsPath,
    },
  ],
  [
    {
      text: "Twitter",
      href: "https://twitter.com/",
    },
    {
      text: "Telegram",
      href: "https://eu.telegram.com/",
    },
    {
      text: "Discord",
      href: "https://discord.com/",
    },
  ],
];

const Footer = () => (
  <footer className={styles.Footer}>
    <nav>
      {linkRows.map((linkRow) => (
        <ul>
          {linkRow.map(({ text, href }) => (
            <li key={text}>
              <Link to={href}>{text}</Link>
            </li>
          ))}
        </ul>
      ))}
    </nav>

    <Link to={allCollectionsPath} title="Go to the home page">
      <img
        className={styles.logo}
        src={LogoFooter}
        alt="NFT Orbit footer logo"
      />
    </Link>
  </footer>
);

export default Footer;
