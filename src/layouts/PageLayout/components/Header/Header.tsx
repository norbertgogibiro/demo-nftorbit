import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import classNames from "classnames";
import useOutsideClick from "utils/hooks/useOutsideClick";
import { urlPath as allCollectionsPath } from "pages/AllCollections/AllCollections";
import { urlPath as upcomingCollectionsPath } from "pages/UpcomingCollections/UpcomingCollections";
import { urlPath as contactUsPath } from "pages/ContactUs/ContactUs";
import Button from "components/Button/Button";
import Link, { NavLink } from "components/Link/Link";
import HeaderFilters from "./components/HeaderFilters/HeaderFilters";
import HighlightedCollections from "./components/HighlightedCollections/HighlightedCollections";
import LogoHeader from "./assets/logoHeader.svg";
import IconBurgerMenu from "./assets/burgerMenu.svg";
import styles from "./Header.module.scss";

const commonInnerClassNames = {
  icon: styles.filterIcon,
};

const getNavLinkClassName = ({ isActive }: { isActive: boolean }) => {
  if (isActive) {
    return styles.active;
  }
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const refMobileMenu: React.RefObject<HTMLElement> = useRef(null);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(closeMobileMenu, [pathname]);
  useOutsideClick(refMobileMenu, closeMobileMenu, {
    shouldActivate: isMobileMenuOpen,
  });

  return (
    <header className={styles.Header}>
      <Link
        className={styles.logoWrapper}
        to={allCollectionsPath}
        title="Go to the home page"
      >
        <img src={LogoHeader} alt="NFT Orbit header logo" />
      </Link>

      <HeaderFilters
        className={styles.headerFilters}
        innerClassNames={commonInnerClassNames}
      />

      <section className={styles.mainSection}>
        <HighlightedCollections innerClassNames={commonInnerClassNames} />

        <Button
          className={styles.mobileOnly}
          onClick={() => {
            setIsMobileMenuOpen(true);
          }}
        >
          <img src={IconBurgerMenu} alt="&equiv;" />
        </Button>

        <div
          className={classNames(styles.navigationWrapper, {
            [styles.isMobileMenuOpen]: isMobileMenuOpen,
          })}
        >
          <nav className={styles.navigation} ref={refMobileMenu}>
            <Link
              className={(styles.logoWrapper, styles.mobileOnly)}
              to={allCollectionsPath}
            >
              <img src={LogoHeader} alt="NFT Orbit header logo" />
            </Link>

            <NavLink
              className={getNavLinkClassName}
              to={upcomingCollectionsPath}
            >
              Upcoming collections
            </NavLink>

            <NavLink className={getNavLinkClassName} to={contactUsPath}>
              Contact us
            </NavLink>
          </nav>
        </div>
      </section>
    </header>
  );
};

export default Header;
