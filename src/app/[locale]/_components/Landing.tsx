import DownloadBtn from "@/app/components/DownloadBtn";
import SpanBtn from "@/app/components/SpanBtn";
import { Languages } from "@/app/utils/enums";
import { getLocale, getTranslations } from "next-intl/server";

const Landing = async () => {
  const t = await getTranslations("");
  const locale = await getLocale();

  return (
    <div
      className="h-screen
      flex justify-center items-center text-center mx-auto overflow-hidden bg-fullsize
      bg-no-repeat bg-[url(../assets/images/landing-light.png)] dark:bg-[url(../assets/images/landing-dark.png)]"
    >
      <div className="">
        <h1 className="text-2xl lg:text-4xl font-bold leading-tight">
          <span className="text-gradiant ">{t("landing.appName") + " "}</span>
          {locale === Languages.ENGLISH && t("landing.app") + " "}
          {t("landing.appAvalable")}
        </h1>
        <h2 className="text-xl font-semibold leading-9 mt-4 ">
          {t("landing.downloadApp")}
        </h2>
        <p
          className="md:w-3/5 mx-auto font-medium text-lg text-muted leading-relaxed mt-4"
          dir="auto"
        >
          {t("landing.platformGoal")}
        </p>
        <div className="flex flex-col items-center sm:flex-row flex-wrap justify-center gap-4 mt-16 w-full max-w-96 mx-auto">
          <DownloadBtn />
          <SpanBtn />
        </div>
      </div>
    </div>
  );
};

export default Landing;
