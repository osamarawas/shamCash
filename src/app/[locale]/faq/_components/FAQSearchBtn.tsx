"use client";
import { Languages } from "@/app/utils/enums";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
interface FAQSearchBtnProps {
  locale: Languages;
  diraction: "rtl" | "ltr";
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FAQSearchBtn = ({ locale, diraction }: FAQSearchBtnProps) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const t = useTranslations("");
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`faq/search?q=${encodeURIComponent(query)}`);
    }
  };
  return (
    <form onSubmit={handleSearch}>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium  sr-only "
      >
        {t("search")}
      </label>
      <div className="relative" dir={diraction}>
        <div
          className="absolute inset-y-0 start-0 flex items-center ps-3  cursor-pointer"
          onClick={() =>
            query.trim() &&
            router.push(`faq/search?q=${encodeURIComponent(query)}`)
          }
        >
          <Search size={20} className="text-muted " />
        </div>

        <Input
          type="search"
          id="default-search"
          placeholder={t("search")}
          className=" block p-4 ps-10 "
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </form>
  );
};

export default FAQSearchBtn;
