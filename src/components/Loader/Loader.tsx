import React from "react";
import classNames from "classnames";
import styles from "./Loader.module.scss";

const Loader = () => (
  <div className={styles.Loader}>
    <div />
  </div>
);

type TLoadingAreaProps = {
  isLoading?: boolean;
  isLoaderBackgroundHidden?: boolean;
  children: React.ReactNode;
};

export const LoadingArea = ({
  isLoading,
  isLoaderBackgroundHidden,
  children,
}: TLoadingAreaProps) => (
  <div
    className={classNames(styles.LoadingArea, {
      [styles.isLoading]: isLoading,
      [styles.isLoaderBackgroundHidden]: isLoaderBackgroundHidden,
    })}
  >
    <div className={styles.contentWrapper}>{children}</div>

    {isLoading && (
      <div className={styles.loaderWrapper}>
        <Loader />
      </div>
    )}
  </div>
);

export default Loader;
