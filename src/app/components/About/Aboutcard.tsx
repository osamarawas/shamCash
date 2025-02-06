"use client";
import { AboutCards } from "@/app/utils/types";
import Image from "next/image";

interface AboutCardProps {
  aboutCard: AboutCards;
}
const AboutCard = ({ aboutCard }: AboutCardProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 text-center">
      {Array.isArray(aboutCard) && aboutCard.length > 0 ? (
        aboutCard.map((about, index) => (
          <div
            data-aos="fade-up"
            data-aos-duration="800"
            key={index}
            className="flex flex-col items-center  justify-center h-80 w-80 p-12   space-y-3 hover:bg-hover transition  rounded-full hover:cursor-default "
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
