import React from "react";
import MultipleColumns from "layouts/MultipleColumns/MultipleColumns";
import Link, { TLinkData } from "components/Link/Link";
import styles from "./ContactUs.module.scss";

export const urlPath = "/contact";

const links: TLinkData[] = [
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
];

const ContactUs = () => (
  <section className={styles.ContactUs}>
    <h2>
      Connect <span>with NFT Orbit</span>
    </h2>

    <MultipleColumns>
      <section>
        <p>
          Got a question, feedback, or just want to say hi? Whether you're an
          NFT creator, collector, or just curious about the blockchain world,
          our team is ready to assist. To get in touch, simply click the button
          below. It will take you to our Typeform where you can leave your
          message. We'll get back to you faster than a blockchain transaction!
        </p>

        <Link className={styles.linkToForm} to="#">
          Access form HERE
        </Link>
      </section>

      <section>
        <p>
          Stay connected with us on social media for the latest updates, NFT
          trends, and exciting promotions. At NFTOrbit, we're all about making
          the NFT universe accessible and exciting. So don't hesitate to reach
          out - let's explore this digital frontier together!
        </p>
      </section>

      <section>
        <ul>
          {links.map(({ text, href }) => (
            <li>
              <Link to={href}>{text}</Link>
            </li>
          ))}
        </ul>
      </section>
    </MultipleColumns>
  </section>
);

export default ContactUs;
