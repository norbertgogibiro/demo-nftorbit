import React from "react";
import classNames from "classnames";
import styles from "./Button.module.scss";

type TProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ type = "button", children, className, ...props }: TProps) => (
  <button
    className={classNames(styles.Button, className)}
    type={type}
    {...props}
  >
    {children}
  </button>
);

export default Button;
