import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  isAuthenticated?: boolean;
  isPrivate?: boolean;
  href?: string;
  onClick?: () => void;
}

const MenuItem = ({
  icon,
  title,
  isAuthenticated,
  isPrivate,
  onClick,
  href,
}: MenuItemProps) => {
  if (isPrivate && !isAuthenticated) return null;

  const renderLink = () => {
    if (href) {
      return (
        <Link href={href}>
          {icon}
          <span className="block">{title}</span>
        </Link>
      );
    }

    return (
      <>
        {icon}
        <span className="block">{title}</span>
      </>
    );
  };

  return (
    <Button
      variant="ghost"
      className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
      onClick={onClick}
      asChild={!!href}
    >
      {renderLink()}
    </Button>
  );
};

export default MenuItem;
