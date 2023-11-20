import React from "react";
import MultipleColumns from "layouts/MultipleColumns/MultipleColumns";
import BulletList from "components/BulletList/BulletList";

const Disclaimer = () => (
  <div>
    <h2>NFT Orbit disclaimer and risk acknowledgement</h2>

    <section>
      <h3>Disclaimer</h3>
      <p>
        The information provided through NFT Orbit's platform is not intended
        as, nor should it be understood or used as, financial, trading, or any
        other type of professional advice. We're all about helping you discover
        and engage with the exciting world of NFTs, but it's essential that you
        make your decisions independently.
      </p>
    </section>

    <section>
      <h3>Risk Acknowledgment</h3>

      <MultipleColumns>
        <div>
          <p style={{ marginBottom: "1.5em" }}>
            As much as we love the world of blockchain technology and
            crypto-assets, we can't ignore that it does carry substantial risks,
            including the potential complete loss of value in crypto-assets. The
            European Supervisory Authorities (EBA, ESMA, and EIOPA, also known
            as ESAs) want all users to understand the following realities:
          </p>

          <BulletList>
            <li>
              There's a real possibility of losing all the money you invest in
              crypto-assets.
            </li>
            <li>
              Be alert to potentially misleading advertisements, including those
              pushed via social media or by influencers.
            </li>
            <li>
              Remain cautious about promises of swift or high returns,
              especially if they sound too good to be true.
            </li>
          </BulletList>
        </div>

        <div>
          <p>
            The risks involved in crypto-assets are amplified due to the novelty
            of the technology, regulatory uncertainty, the potential for
            hacking, extreme volatility, and information asymmetry in the crypto
            market. We urge you not to invest money that you can't afford to
            lose in crypto-assets. Moreover, we strongly recommend seeking legal
            and financial advice before engaging with crypto-assets or using our
            services.
          </p>

          <p>
            Here at NFT Orbit, we're dedicated to simplifying your NFT journey.
            But remember, it's essential to keep these risks in mind and make
            informed decisions at all times.
          </p>
        </div>
      </MultipleColumns>
    </section>
  </div>
);

export default Disclaimer;
