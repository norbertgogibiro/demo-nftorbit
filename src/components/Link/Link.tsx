import React from "react";
import {
  Link as RouterDOMLink,
  NavLink as RouterDOMNavLink,
  LinkProps,
  NavLinkProps,
  useLocation,
} from "react-router-dom";

export type TLinkData = {
  text: string;
  href: string;
};

type TProps = LinkProps & {
  to: string;
};

const Link = ({ to, children, ...props }: TProps) => {
  const { pathname } = useLocation();
  const isExternalLink = to.match(/^https?:\/\//);

  return !isExternalLink ? (
    <RouterDOMLink to={to} reloadDocument={pathname === to} {...props}>
      {children}
    </RouterDOMLink>
  ) : (
    <a href={to} target="_blank" rel="noreferrer" {...props}>
      {children}
    </a>
  );
};

export const NavLink = ({ to, ...props }: NavLinkProps) => {
  const { pathname } = useLocation();
  return (
    <RouterDOMNavLink to={to} reloadDocument={pathname === to} {...props} />
  );
};

export default Link;
