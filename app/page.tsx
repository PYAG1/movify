"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Autoplay from "embla-carousel-autoplay";
import { fetchMovieList } from "@/api";
import { ExpandableMovieCards } from "@/components/movie-element-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Clapperboard } from "lucide-react";

interface CarouselItem {
  title: string;
  image: string;
}

interface MovieListResponse {
  data: {
    results: any[];
    total_pages: number;
  };
}

const CAROUSEL_IMAGES: CarouselItem[] = [
  {
    title: "Enjoy a wide range of movies",
    image:
      "https://images.pexels.com/photos/4009409/pexels-photo-4009409.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    title: "Stream your favorite films anytime",
    image:
      "https://images.pexels.com/photos/7991386/pexels-photo-7991386.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Experience cinematic adventures at home",
    image:
      "https://images.unsplash.com/photo-1509564324749-471bd272e1ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Discover the magic of movies in HD",
    image:
      "https://images.unsplash.com/photo-1512070679279-8988d32161be?q=80&w=1938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Sit back and enjoy!",
    image:
      "https://images.pexels.com/photos/8066671/pexels-photo-8066671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export default function Home() {
  const [currentPage, setCurrentPage] = useState(2);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const {
    data: movieList,
    isLoading,
    isError,
    error,
  } = useQuery<MovieListResponse>({
    queryKey: ["movieList", currentPage],
    queryFn: () => fetchMovieList(currentPage),
  });

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= (movieList?.data?.total_pages || 1)) {
      setCurrentPage(pageNumber);
    }
  };

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error loading movies:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

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

  return (
    <div className="w-full min-h-screen bg-background p-4 md:px-10 lg:px-28">
      <div className=" flex ">
        <span className=" text-turq text-3xl font-medium  flex items-center">
          M<Clapperboard className=" text-white" size={25} />
          vify
        </span>
      </div>
      <Carousel
        className="w-full max-w-full py-10"
        plugins={[Autoplay({ delay: 2000 })]}
      >
        <CarouselContent className="flex gap-1 bg-background">
          {CAROUSEL_IMAGES.map((item, index) => (
            <CarouselItem key={index}>
              <Card className="w-full h-[40vh] md:h-[60vh] border-none">
                <CardContent className="relative h-full w-full">
                  <Image
                    src={item.image}
                    alt={`slide ${index + 1}`}
                    fill
                    className="object-cover rounded"
                    priority={index < 2}
                  />
                  <div className="absolute inset-0 bg-black/60 z-10" />
                  <Link
                    href="#"
                    className="absolute bottom-0 left-0 text-lg md:text-4xl font-bold text-white inline-flex items-end m-3 z-20"
                  >
                    {item.title}
                  </Link>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center space-x-2 my-4">
          {CAROUSEL_IMAGES.map((_, index) => (
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

      <section>
        <h2 className="text-turq text-3xl font-semibold py-10">
          Explore
        </h2>
        {isLoading ? (
          <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, index) => (
              <Skeleton key={index} className=" w-full h-[250px] bg-zinc-900" />
            ))}
          </div>
        ) : (
          <>
            <ExpandableMovieCards movies={movieList?.data?.results || []} />
            <Pagination>
              <PaginationContent className="my-8">
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage - 1);
                    }}
                    aria-disabled={currentPage === 1}
                    className={`bg-background_light hover:bg-zinc-500/80 text-zinc-500 ${
                      currentPage === 1 ? "cursor-not-allowed" : ""
                    }`}
                  />
                </PaginationItem>

                {[...Array(movieList?.data?.total_pages)].map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(pageNumber);
                        }}
                        isActive={pageNumber === currentPage}
                        className={`${
                          pageNumber === currentPage
                            ? "bg-turq text-white border-none"
                            : "bg-background_light text-zinc-500"
                        } hover:bg-turq/80 transition-colors duration-200`}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage + 1);
                    }}
                    aria-disabled={currentPage === movieList?.data?.total_pages}
                    className={`bg-background_light hover:bg-zinc-400/80 text-zinc-500 ${
                      currentPage === movieList?.data?.total_pages
                        ? "cursor-not-allowed"
                        : ""
                    }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        )}
      </section>
    </div>
  );
}
