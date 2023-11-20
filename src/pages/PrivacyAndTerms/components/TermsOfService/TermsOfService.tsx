import React from "react";
import MultipleColumns from "layouts/MultipleColumns/MultipleColumns";

const TermsOfService = () => {
  return (
    <div>
      <h2>NFT Orbit terms of service</h2>

      <MultipleColumns addOrdinalNumbersToInnerHeadings>
        <section>
          <h3>Introduction</h3>
          <p>
            These Terms of Service govern your use of the NFT Orbit platform. By
            using our services, you agree to these terms.
          </p>
        </section>

        <section>
          <h3>Services</h3>
          <p>
            NFT Orbit provides a platform to browse, discover, and redirect
            users to various NFT marketplaces. We do not sell, auction, or offer
            for sale any NFTs directly.
          </p>
        </section>

        <section>
          <h3>User responsibilities</h3>
          <p>
            Users are responsible for all activities on their accounts and for
            ensuring their account information is kept confidential.
          </p>
        </section>

        <section>
          <h3>Intellectual property</h3>
          <p>
            All content and services provided by NFT Orbit are owned by us or
            our partners. Users may not copy, modify, or distribute such content
            without our express permission.
          </p>
        </section>

        <section>
          <h3>Limitation of liability</h3>
          <p>
            NFT Orbit is not liable for any damages or losses related to your
            use of the services. We do not guarantee the accuracy or reliability
            of any information provided on our platform.
          </p>
        </section>

        <section>
          <h3>Changes to these terms</h3>
          <p>
            We reserve the right to modify these Terms of Service at any time.
            Continued use of our services after changes constitute your
            acceptance of such changes.
          </p>
        </section>
      </MultipleColumns>
    </div>
  );
};

export default TermsOfService;
