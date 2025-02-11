import { Languages } from "@/app/utils/enums";
import { faqWithCategories } from "@/app/utils/siteData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqPageProps {
  params: { cate: string; locale: string };
}

const FaqPage = async ({ params }: FaqPageProps) => {
  const categoryId = params.cate;
  const faqWithCategorieArray = await faqWithCategories();
  const faqWithCategorie = faqWithCategorieArray.find(
    (category) => category.categoryId === categoryId
  );
  function setDirction() {
    return params.locale === Languages.ARABIC ? "rtl" : "ltr";
  }
  console.log(setDirction());

  return (
    <div className="container flex flex-col items-center gap-5 mx-auto my-8 lg:my-14">
      <h2 className="text-primary text-center text-3xl font-bold mb-14 underLine relative mx-auto">
        {faqWithCategorie?.categoryName}
      </h2>

      {/* ضبط العرض بحيث يكون في المنتصف مع سؤالين في كل سطر */}
      <div
        className=" grid grid-cols-1 lg:grid-cols-2 gap-10  "
        dir={setDirction()}
      >
        {faqWithCategorie?.questions.map((aq, index) => (
          <div key={index} className="w-full">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger>{aq.question}</AccordionTrigger>
                <AccordionContent>{aq.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqPage;
