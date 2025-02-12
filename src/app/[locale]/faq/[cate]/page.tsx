import { Languages } from "@/app/utils/enums";
import { setDirction, setTextDirection } from "@/app/utils/helperServer";
import { faqWithCategories } from "@/app/utils/siteData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PathCete from "./PathCete";

interface FaqPageProps {
  params: { cate: string; locale: Languages };
}

const FaqPage = async ({ params }: FaqPageProps) => {
  const { locale } = await params;
  const categoryId = params.cate;
  const faqWithCategorieArray = await faqWithCategories();
  const faqWithCategorie = faqWithCategorieArray.find(
    (category) => category.categoryId === categoryId
  );

  return (
    <div className="container mx-auto pt-5">
      <PathCete
        locale={locale}
        categoryName={faqWithCategorie?.categoryName || ""}
      />
      <div className="container flex flex-col items-center gap-5 mx-auto my-6 lg:my-10">
        <h2 className="text-primary text-center text-3xl font-bold mb-10 underLine relative mx-auto">
          {faqWithCategorie?.categoryName}
        </h2>

        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6 w-11/12">
          {faqWithCategorie?.questions.map((aq, index) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
