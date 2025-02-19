import { aboutCards } from "@/app/utils/siteData";
import Card from "../../components/card";
import { getTranslations } from "next-intl/server";

const About = async () => {
  const aboutCardsArray = await aboutCards();
  const t = await getTranslations("");
  return (
    <div className="flex items-center justify-center container flex-col gap-5 mx-auto my-8 lg:my-14">
      <h2
        className="text-primary text-center text-3xl font-bold mb-14 underLine relative mx-auto  "
        data-aos="zoom-out"
        dir="auto"
      >
        {t("about.title")}
      </h2>
      <p
        data-aos="fade-up"
        data-aos-duration="800"
        className="text-center justify-center w-8/12 mx-auto mb-8 text-lg text-muted"
        dir="auto"
      >
        {t("about.description")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 text-center ">
        {Array.isArray(aboutCardsArray) && aboutCardsArray.length > 0 ? (
          aboutCardsArray.map((about, index) => (
            <Card item={about} key={index} />
          ))
        ) : (
          <p>No links available</p>
        )}
      </div>
    </div>
  );
};

export default About;
