import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchParamCollectionDetails } from "utils/constants";
import LogoFacebook from "assets/images/icons/social/facebook.svg";
import LogoInstagram from "assets/images/icons/social/instagram.svg";
import LogoTwitter from "assets/images/icons/social/twitter.svg";
import Button from "components/Button/Button";
import MovingBlobs from "components/MovingBlobs/MovingBlobs";
import Table, { TSetRowClickHandlerData } from "components/Table/Table";
import BubbleChart, {
  TBubbleChartProps,
} from "components/BubbleChart/BubbleChart";
import UpcomingCollectionsChartBar from "./components/ListYourProjectButton/ListYourProjectButton";
import styles from "./UpcomingCollections.module.scss";

export const urlPath = "/upcoming";

type TChartData = {
  ticker: string;
  name: string;
  hoursLeft: number;
  logo: string;
  isHighlighted: boolean;
};

const UpcomingCollections = () => {
  const [data, setData] = useState<TChartData[] | null>(null);
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchCollectionsSummary = () => {
      fetch("https://proxy-api.xoxno.com/getCollectionsSummary/WeekVolume/0/12")
        .then((response) => response.json())
        .then(({ data }) => {
          setData(
            data.map(
              (
                { Name: name, Profile: logo }: { [x: string]: unknown },
                index: number,
              ) => ({
                name,
                hoursLeft: index + 1, // TODO: Remove this when we can depend on real due dates
                logo,
              }),
            ),
          );
        });
    };

    fetchCollectionsSummary();
  }, []);

  if (!data) {
    return null;
  }

  const setRowClickHandlerData: TSetRowClickHandlerData = (args) => {
    const { name } = args?.cells || {};
    const passedNameType = typeof name;

    if (passedNameType !== "string") {
      throw new Error(
        `ERROR: Unexpected name type (not string but ${passedNameType})`,
      );
    }

    return {
      title: `Read more about ${name}`,
      callback: () => {
        setSearchParams({
          [searchParamCollectionDetails]: name?.toString() || "",
        });
      },
    };
  };

  const maxHoursLeft = data.reduce(
    (output, { hoursLeft }) => (output < hoursLeft ? hoursLeft : output),
    Number.NEGATIVE_INFINITY, // Initial max
  );

  const differenceShrinkerFactor = 2;
  const processedChartData: TBubbleChartProps["data"] = data.map(
    ({ ticker, name, logo, hoursLeft }) => ({
      // prettier-ignore
      radius: (maxHoursLeft - hoursLeft) + differenceShrinkerFactor,
      displayData: {
        ticker,
        name,
        logo,
        description: `${hoursLeft} hours left!`,
        color: hoursLeft < 5 ? "green" : "red",
      },
    }),
  );

  return (
    <section className={styles.UpcomingCollections}>
      <MovingBlobs />

      <BubbleChart
        data={processedChartData}
        InfoBarContent={UpcomingCollectionsChartBar}
        handleCollectionClick={(collectionTicker) => {
          setSearchParams({
            [searchParamCollectionDetails]: collectionTicker,
          });
        }}
      />

      <Table
        setRowClickHandlerData={setRowClickHandlerData}
        isLoading={false}
        data={[
          {
            groupTitleContent: "Launching June 21th",
            rows: [
              {
                "#": 1,
                name: "Crypto kitties",
                links: (
                  <>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.alert("test");
                      }}
                    >
                      <img
                        className={styles.socialIcon}
                        src={LogoTwitter}
                        alt="twitter"
                      />
                    </Button>
                    <img
                      className={styles.socialIcon}
                      src={LogoInstagram}
                      alt="instagram"
                    />
                    <img
                      className={styles.socialIcon}
                      src={LogoFacebook}
                      alt="facebook"
                    />
                  </>
                ),
                time: "19.00 PM UTC",
                count: "10.000",
                price: "1EGLD",
              },
              {
                "#": 2,
                name: "Crypto kitties",
                links: (
                  <>
                    <img
                      className={styles.socialIcon}
                      src={LogoTwitter}
                      alt="twitter"
                    />
                    <img
                      className={styles.socialIcon}
                      src={LogoInstagram}
                      alt="instagram"
                    />
                    <img
                      className={styles.socialIcon}
                      src={LogoFacebook}
                      alt="facebook"
                    />
                  </>
                ),
                time: "19.00 PM UTC",
                count: "10.000",
                price: "1EGLD",
              },
              {
                "#": 3,
                name: "Crypto kitties",
                links: (
                  <>
                    <img
                      className={styles.socialIcon}
                      src={LogoTwitter}
                      alt="twitter"
                    />
                    <img
                      className={styles.socialIcon}
                      src={LogoInstagram}
                      alt="instagram"
                    />
                    <img
                      className={styles.socialIcon}
                      src={LogoFacebook}
                      alt="facebook"
                    />
                  </>
                ),
                time: "19.00 PM UTC",
                count: "10.000",
                price: "1EGLD",
              },
            ],
          },
          {
            groupTitleContent: "Launching June 22nd",
            rows: [
              {
                "#": null,
                name: "Crypto kitties",
                links: (
                  <>
                    <img
                      className={styles.socialIcon}
                      src={LogoTwitter}
                      alt="twitter"
                    />
                    <img
                      className={styles.socialIcon}
                      src={LogoInstagram}
                      alt="instagram"
                    />
                    <img
                      className={styles.socialIcon}
                      src={LogoFacebook}
                      alt="facebook"
                    />
                  </>
                ),
                time: "19.00 PM UTC",
                count: "10.000",
                price: "1EGLD",
              },
            ],
          },
          {
            groupTitleContent: "Launching June 23rd",
            rows: [
              {
                "#": null,
                name: "Crypto kitties",
                links: (
                  <>
                    <img
                      className={styles.socialIcon}
                      src={LogoTwitter}
                      alt="twitter"
                    />
                    <img
                      className={styles.socialIcon}
                      src={LogoInstagram}
                      alt="instagram"
                    />
                    <img
                      className={styles.socialIcon}
                      src={LogoFacebook}
                      alt="facebook"
                    />
                  </>
                ),
                time: "19.00 PM UTC",
                count: "10.000",
                price: "1EGLD",
              },
              {
                "#": null,
                name: "Crypto kitties",
                links: (
                  <>
                    <img
                      className={styles.socialIcon}
                      src={LogoTwitter}
                      alt="twitter"
                    />
                    <img
                      className={styles.socialIcon}
                      src={LogoInstagram}
                      alt="instagram"
                    />
                    <img
                      className={styles.socialIcon}
                      src={LogoFacebook}
                      alt="facebook"
                    />
                  </>
                ),
                time: "19.00 PM UTC",
                count: "10.000",
                price: "1EGLD",
              },
              {
                "#": null,
                name: "Crypto kitties",
                links: (
                  <>
                    <img
                      className={styles.socialIcon}
                      src={LogoTwitter}
                      alt="twitter"
                    />
                    <img
                      className={styles.socialIcon}
                      src={LogoInstagram}
                      alt="instagram"
                    />
                    <img
                      className={styles.socialIcon}
                      src={LogoFacebook}
                      alt="facebook"
                    />
                  </>
                ),
                time: "19.00 PM UTC",
                count: "10.000",
                price: "1EGLD",
              },
              {
                "#": null,
                name: "Crypto kitties",
                links: (
                  <>
                    <img
                      className={styles.socialIcon}
                      src={LogoTwitter}
                      alt="twitter"
                    />
                    <img
                      className={styles.socialIcon}
                      src={LogoInstagram}
                      alt="instagram"
                    />
                    <img
                      className={styles.socialIcon}
                      src={LogoFacebook}
                      alt="facebook"
                    />
                  </>
                ),
                time: "19.00 PM UTC",
                count: "10.000",
                price: "1EGLD",
              },
              {
                "#": null,
                name: "Crypto kitties",
                links: (
                  <>
                    <img
                      className={styles.socialIcon}
                      src={LogoTwitter}
                      alt="twitter"
                    />
                    <img
                      className={styles.socialIcon}
                      src={LogoInstagram}
                      alt="instagram"
                    />
                    <img
                      className={styles.socialIcon}
                      src={LogoFacebook}
                      alt="facebook"
                    />
                  </>
                ),
                time: "19.00 PM UTC",
                count: "10.000",
                price: "1EGLD",
              },
            ],
          },
        ]}
      />
    </section>
  );
};

export default UpcomingCollections;
