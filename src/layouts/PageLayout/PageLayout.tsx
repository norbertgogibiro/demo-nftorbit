import React, { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  searchParamCollectionDetails,
  searchParamHistoricData,
} from "utils/constants";
import HistoricDataOverview from "layouts/HistoricDataOverview/HistoricDataOverview";
import CollectionDetailsOverview from "layouts/CollectionDetailsOverview/CollectionDetailsOverview";
import Modal from "components/Modal/Modal";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import styles from "./PageLayout.module.scss";

type TPageLayout = {
  children: React.ReactNode;
};

const searchParamModalContents: { [x: string]: React.ElementType } = {
  [searchParamHistoricData]: HistoricDataOverview,
  [searchParamCollectionDetails]: CollectionDetailsOverview,
};

const PageLayout = ({ children }: TPageLayout) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetSectionId = hash.replace("#", "");
      document.getElementById(targetSectionId)?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
        });
      }, 100);
    }
  }, [pathname, hash]);

  const displayedModalContents: React.ElementType[] = [
    ...searchParams.keys(),
  ].map((searchParamKey) => searchParamModalContents[searchParamKey]);

  return (
    <>
      <div className={styles.PageLayout}>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>

      {displayedModalContents.map((ModalContentComponent) => (
        <Modal onClose={() => setSearchParams()}>
          <ModalContentComponent />
        </Modal>
      ))}
    </>
  );
};

export default PageLayout;
