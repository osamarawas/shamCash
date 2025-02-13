import DownloadBtn from "@/app/components/DownloadBtn";
import { getTranslations } from "next-intl/server";

const Landing = async () => {
  const t = await getTranslations("");

  return (
    <div
      className="h-screen
      flex justify-center items-center lg:space-y-4 text-center mx-auto overflow-hidden bg-landing
      bg-no-repeat bg-[url(../assets/images/landing-light.png)] dark:bg-[url(../assets/images/landing-dark.png)]"
    >
      <div className="space-y-4">
        {/* المحتوى */}
        <h1 className="text-2xl lg:text-4xl font-bold leading-tight">
          <span className="text-gradiant text-transparent bg-clip-text">
            {t("landing.appName") + " "}
          </span>
          {t("landing.appAvalable")}
        </h1>
        <h2 className="text-xl font-semibold leading-9 ">
          {t("landing.downloadApp")}
        </h2>
        <p className="w-3/5 mx-auto font-medium text-lg text-gray-600 leading-relaxed">
          {t("landing.platformGoal")}
        </p>
        <div>
          <DownloadBtn />
          {/* <Button
            className="py-2 px-12 mt-8 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-lg"  >
            {t("download")}
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default Landing;
