import { Languages } from "@/app/utils/enums";
import { faqWithCategories } from "@/app/utils/siteData";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
import PathCete from "../[cate]/PathCete";

interface FaqPageProps {
  params: Promise<{ cate: string; locale: Languages }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchParams: any;
}

const SearchPage = async ({ params, searchParams }: FaqPageProps) => {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const searchTerm = await searchParams.q;
  const faqWithCategoriesArray = await faqWithCategories();
  const ResultSearch = faqWithCategoriesArray.map((category) => {
    console.log(category.questions);
    category.questions.filter((questions) => {
      console.log(questions.question.includes("Are there"));
      return questions.question.includes("Are there");
    });
  });
  console.log(ResultSearch);
  return (
    <div className="container mx-auto pt-5">
      <PathCete locale={locale} categoryName={"نتائج البحث"} />
      <div className="container flex flex-col items-center gap-5 mx-auto my-6 lg:my-10">
        <h2 className="text-primary text-center text-3xl font-bold mb-10 underLine relative mx-auto">
          نتائج البحث
        </h2>

        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6 w-11/12">
          {/* {faqWithCategorie?.questions.map((aq, index) => (
            <div key={index}>
              <Accordion type="single" collapsible>
                <AccordionItem
                  value={`item-${index}`}
                  dir={setDirction(locale)}
                >
                  <AccordionTrigger className={setTextDirection(locale)}>
                    {aq.question}
                  </AccordionTrigger>
                  <AccordionContent>{aq.answer}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
