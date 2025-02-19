import { Languages } from "@/app/utils/enums";
import { faqWithCategories } from "@/app/utils/siteData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PathCete from "../[cate]/PathCete";
import { faqsWithCategorie } from "@/app/utils/types";
import { setDirction, setTextDirection } from "@/app/utils/helperServer";
import { getTranslations } from "next-intl/server";

interface FaqPageProps {
  params: Promise<{ cate: string; locale: Languages }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchParams: any;
}
const searchFaqs = (faqs: faqsWithCategorie[], searchTerm: string) => {
  return faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);
};

const SearchPage = async ({ params, searchParams }: FaqPageProps) => {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const searchTerm = await searchParams.q;
  const faqWithCategoriesArray = await faqWithCategories();
  const resultSearch = searchFaqs(
    faqWithCategoriesArray,
    searchTerm
  ) as faqsWithCategorie[];
  const t = await getTranslations("");
  return (
    <div className="container mx-auto pt-5">
      <PathCete locale={locale} categoryName={t("searchResults")} />
      <div className="container flex flex-col items-center gap-5 mx-auto my-6 lg:my-10">
        <h2 className="text-primary text-center text-3xl font-bold mb-10 underLine relative mx-auto">
          {t("searchResults")}
        </h2>

        {Array.isArray(resultSearch) && resultSearch.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-11/12">
            {resultSearch.map((category) =>
              category.questions.map((AnswerQuestion, questionIndex) => (
                <div key={`${category.categoryId}-${questionIndex}`}>
                  <Accordion type="single" collapsible>
                    <AccordionItem
                      value={`item-${category.categoryId}-${questionIndex}`}
                      dir={setDirction(locale)}
                    >
                      <AccordionTrigger className={setTextDirection(locale)}>
                        {AnswerQuestion.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        {AnswerQuestion.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              ))
            )}
          </div>
        ) : (
          <div>
            <p className="text-center text-red-500 font-semibold text-xl  lg:text-2xl">
              {t("noresults")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
