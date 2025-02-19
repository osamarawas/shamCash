import { badgeVariants } from "@/components/ui/badge";
import { Link } from "@/i18n/routing";
import React from "react";

interface CategoryProps {
  name: string;
  path: string;
}
const Category = ({ name, path }: CategoryProps) => {
  return (
    <Link
      className={`${badgeVariants({
        variant: "soft",
      })} min-w-[320px] lg:min-w-[500px]`}
      href={path}
    >
      {name}
    </Link>
  );
};

export default Category;
