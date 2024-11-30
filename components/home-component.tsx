"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";

export default function HomeComponent(movies:any) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const carouselArray = [
    "https://via.placeholder.com/800x400?text=Slide+1",
    "https://via.placeholder.com/800x400?text=Slide+2",
    "https://via.placeholder.com/800x400?text=Slide+3",
    "https://via.placeholder.com/800x400?text=Slide+4",
    "https://via.placeholder.com/800x400?text=Slide+5",
  ];

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  console.log("movies",movies)
  return (
    <div className="w-full h-screen bg-background p-4">
      <Carousel
        className="w-full max-w-full py-10"
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent className="flex gap-1 bg-background">
          {carouselArray.map((imageUrl, index) => (
            <CarouselItem key={index}>
              <div className="h-[40vh] md:h-[80vh] w-full relative">
                <Card className="w-full h-full border-none">
                  <CardContent className="relative flex h-full w-full rounded">
                    <Image
                      src={imageUrl}
                      alt={`slide ${index + 1}`}
                      layout="fill"
                      className="object-cover rounded bg-red-800"
                    />
                    <Link
                      href="#"
                      className="relative text-lg md:text-4xl font-bold text-white inline-flex items-end m-3"
                    >
                      How to get started with Dimba as an event organiser
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center space-x-2 my-4">
          {carouselArray.map((_, index) => (
            <div
              key={index}
              className={`w-full h-2 border-2 rounded ${
                current === index
                  ? "bg-teal-500 border-teal-500"
                  : "bg-gray-600 border-gray-600"
              }`}
            />
          ))}
        </div>
      </Carousel>
      <div>

 
      </div>
    </div>
  );
}
