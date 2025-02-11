import React from "react";
import { getTranslations } from "next-intl/server";
import { term } from "@/app/utils/siteData";


const TermsCard = async () => {
  const t = await getTranslations("");
  const aTerm=await term();
  return (
    <div className="relative terms-card dark:terms-card-dark w-3/4 mx-auto py-12 px-12 rounded-3xl my-10">
      <ol dir="auto" className="text-lg mb-12 list-decimal space-y-4">
        {Array.isArray(aTerm) && aTerm.length > 0 ? (
          aTerm.map((term, index) => <li key={index}>{term.li}</li>)
        ) : (
          <p>No Terms available</p>
        )}
      </ol>

      <p dir="auto" className="text-lg font-bold mb-12">
        {t("terms.desc2")}
      </p>
      <p dir="auto" className="text-center text-lg mb-12">
        {t("terms.desc3")}
      </p>
      <p dir="auto" className="text-center text-lg text-primary font-bold">
        {t("terms.allert")}
      </p>
    </div>
  );
};

export default TermsCard;
