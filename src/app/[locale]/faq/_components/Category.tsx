import { badgeVariants } from "@/components/ui/badge";
import { Link } from "@/i18n/routing";
import React from "react";

interface CategoryProps {
  name: string;
  href: string;
}
const Category = ({ name, href }: CategoryProps) => {
  return (
    <Link
      className={badgeVariants({
        variant: "soft",
      })}
      href={href}
    >
      {name}
    </Link>
  );
};

export default Category;
