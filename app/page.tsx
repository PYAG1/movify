"use client";

import React, { useEffect, useState } from "react";
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
import { fetchMovieList } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { ExpandableCardDemo } from "@/components/movie-element-card";


export default function Home() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [movieList, setMovieList] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    isLoading,
    isError,
    error,
    data: MovieList,
  } = useQuery({
    queryFn: () => fetchMovieList(currentPage),
    queryKey: ["movieList", currentPage],
    refetchOnWindowFocus: false,
  });
  const carouselArray = [
    "https://via.placeholder.com/800x400?text=Slide+1",
    "https://via.placeholder.com/800x400?text=Slide+2",
    "https://via.placeholder.com/800x400?text=Slide+3",
    "https://via.placeholder.com/800x400?text=Slide+4",
    "https://via.placeholder.com/800x400?text=Slide+5",
  ];

  const carouselImageArray = [
    {
      title: "Enjoy a wide range of movies",
      image: "https://images.pexels.com/photos/4009409/pexels-photo-4009409.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Stream your favorite films anytime",
      image: "https://images.pexels.com/photos/7991386/pexels-photo-7991386.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      title: "Experience cinematic adventures at home",
      image: "https://images.unsplash.com/photo-1509564324749-471bd272e1ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Discover the magic of movies in HD",
      image: "https://images.unsplash.com/photo-1512070679279-8988d32161be?q=80&w=1938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Sit back and enjoy!",
      image: "https://images.pexels.com/photos/8066671/pexels-photo-8066671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];
  
  useEffect(() => {
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
  useEffect(() => {
    if (MovieList?.data?.results) {
      setMovieList((prev) => [...prev, ...MovieList.data.results]);
    }
  }, [MovieList]);

  if(error)return <div>oops</div>
  return (
    <div className="w-full h-screen bg-background p-4 md:px-10 lg:px-28 px-">
      <p className=" text-turq text-4xl font-semibold">Movify</p>
      <Carousel
        className="w-full max-w-full py-10 "
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
   <CarouselContent className="flex gap-1 bg-background">
  {carouselImageArray.map((item, index) => (
    <CarouselItem key={index}>
      <div className="h-[40vh] md:h-[80vh] w-full relative">
        <Card className="w-full h-full border-none">
          <CardContent className="relative flex h-full w-full rounded">
        
            <Image
              src={item.image}
              alt={`slide ${index + 1}`}
              layout="fill"
              className="object-cover rounded  "
            />
            
           
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            
            <Link
              href="#"
              className="absolute bottom-0 left-0 text-lg md:text-4xl font-bold text-white inline-flex items-end m-3 z-20"
            >
              {item.title}
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
        <p className=" text-turq text-3xl font-semibold py-10">Explore all events</p>
        <ExpandableCardDemo movies={movieList}/>
        
      </div>
    </div>
  );
}
