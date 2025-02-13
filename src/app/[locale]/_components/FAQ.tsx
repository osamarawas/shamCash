import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fAnswerQuestion } from "../../utils/siteData";
import { getTranslations } from "next-intl/server";
import { setDirction, setTextDirection } from "@/app/utils/helperServer";


const FAQ = async ({locale}) => {
  const t = await getTranslations(""); //  استخدام `useTranslations` بدلاً من `getTranslations`
  const faqArray = await fAnswerQuestion();
  console.log(faqArray)
  return (
    <div className="flex items-center justify-center container flex-col gap-5 mx-auto my-8 lg:my-14">
      <h3 className="text-primary font-bold text-2xl underLine relative">
        {t("fAnswerQuestions.title")}
      </h3>
      <p
        className="w-[68%] text-center text-xl text-muted leading-9 mt-10 font-medium"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        {t("fAnswerQuestions.desc")}
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-4/5">
        {faqArray.map((faq,index) => (
          <div key={index} data-aos="fade-up" data-aos-duration="800">
            <Accordion type="single" collapsible>
              <AccordionItem value={`item-${index}`}  dir={setDirction(locale)}>
                <AccordionTrigger className={setTextDirection(locale)}>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
