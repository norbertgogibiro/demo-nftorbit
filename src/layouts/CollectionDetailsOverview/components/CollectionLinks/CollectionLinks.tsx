import React from "react";
import IconLink from "assets/images/icons/social/link.svg";
import IconFacebook from "assets/images/icons/social/facebook.svg";
import IconInstagram from "assets/images/icons/social/instagram.svg";
import IconTwitter from "assets/images/icons/social/twitter.svg";
import Link from "components/Link/Link";
import styles from "./CollectionLinks.module.scss";

type TProps = {
  links: {
    general: string;
    instagram: string;
    twitter: string;
    facebook: string;
  };
};

const socialIcons: { [x: string]: string } = {
  general: IconLink,
  instagram: IconInstagram,
  twitter: IconTwitter,
  facebook: IconFacebook,
};

const CollectionLinks = ({ links }: TProps) => (
  <footer className={styles.CollectionLinks}>
    {Object.entries(links).map(([label, url]) => (
      <Link to={url}>
        <img src={socialIcons[label]} alt={label} />
      </Link>
    ))}
  </footer>
);

export default CollectionLinks;
