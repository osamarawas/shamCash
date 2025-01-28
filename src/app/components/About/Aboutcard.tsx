import { AboutCarts } from "@/app/utils/types";
import Image from "next/image";

interface AboutCardProps {
  aboutCart: AboutCarts;
}
const AboutCard = ({ aboutCart }: AboutCardProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 text-center ">
      {Array.isArray(aboutCart) && aboutCart.length > 0 ? (
        aboutCart.map((about, index) => (
          <div
            key={index}
            className="flex flex-col items-center  justify-center h-80 w-80 p-12   space-y-3 hover:bg-blue-100 rounded-full hover:cursor-default "
          >
            <Image
              src={about.image}
              alt={about.title}
              className="bg-primary h-24 w-24 rounded-full text-center p-4"
              width={96}
              height={96}
            />
            <h1 className="text-xl font-bold">{about.title}</h1>
            <p className="text-muted" dir="rtl">
              {about.description}
            </p>
          </div>
        ))
      ) : (
        <p>No links available</p>
      )}
    </div>
  );
};

export default AboutCard;
