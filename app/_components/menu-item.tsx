import React from "react";
import { Button } from "./ui/button";

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  isAuthenticated?: boolean;
  isPrivate?: boolean;
  onClick?: () => void;
}

const MenuItem = ({
  icon,
  title,
  isAuthenticated,
  isPrivate,
  onClick,
}: MenuItemProps) => {
  if (isPrivate && !isAuthenticated) return null;

  return (
    <Button
      variant="ghost"
      className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
      onClick={onClick}
    >
      {icon}
      <span className="block">{title}</span>
    </Button>
  );
};

export default MenuItem;
