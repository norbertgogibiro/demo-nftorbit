import React from "react";
import styles from "./BulletList.module.scss";

type TProps = {
  children: React.ReactNode;
};

const BulletList = ({ children }: TProps) => (
  <ul className={styles.BulletList}>{children}</ul>
);

export default BulletList;
