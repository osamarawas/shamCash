import Image from "next/image";
import React from "react";
import { Card as CardType } from "../utils/types";
interface CardProps {
  item: CardType;
}
const Card = ({ item }: CardProps) => {
  return (
    <div
      className="flex flex-col items-center justify-center h-96 w-96 p-10 space-y-6 hover:bg-hover transition  rounded-full hover:cursor-default "
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div className="flex justify-center items-center bg-primary rounded-full">
        <Image
          src={item.image}
          alt={item.title}
          className=" h-24 w-24  text-center p-5 bg-landing"
          width={96}
          height={96}
        />
      </div>
      <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
      <p className="text-muted leading-6 text-lg" dir="rtl">
        {item.description}
      </p>
    </div>
  );
};

export default Card;
