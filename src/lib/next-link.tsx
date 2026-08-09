import React from "react";

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, className, ...props }, ref) => {
    return (
      <a ref={ref} href={href} className={className} {...props}>
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";

export default Link;
