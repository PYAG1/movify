"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { format } from "date-fns"; 
import Link from "next/link";
import { ExpandableCardProps, Movie } from "@/@types";


export const ExpandableMovieCards: React.FC<ExpandableCardProps> = ({
  movies,
}) => {
  const [active, setActive] = useState<Movie | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="absolute top-2 right-2 lg:hidden flex items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] md:p-5 bg-background_light h-full md:h-fit md:max-h-[90%] flex flex-col   sm:rounded-2xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.id}-${id}`}>
                <Image
                  priority
                  width={500}
                  height={500}
                  src={`https://image.tmdb.org/t/p/original${active.poster_path}`}
                  alt={active.title}
                  className="w-full h-96 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover md:object-contain object-top"
                />
              </motion.div>

              <div>
                <div className="flex flex-col items-start px-4 py-5">
                  <motion.h3
                    layoutId={`title-${active.id}-${id}`}
                    className="font-medium text-orange py-2 dark:text-neutral-200 text-lg"
                  >
                    {active.title}
                  </motion.h3>
                  <motion.p className="text-neutral-300 hidden md:block dark:text-neutral-400 text-base text-justify">
                  
                    {active.overview.length > 270 
            ? `${active.overview.slice(0, 270)}...` 
            : active.overview}
                  </motion.p>
                  <motion.p className="text-neutral-300 md:hidden dark:text-neutral-400 text-base text-justify">
                  
                  {active.overview}
                </motion.p>
                  <div>
                  <Link href={`/details/${active.id}`} className=" underline text-[#f6c299] hover:text-orange "> view more</Link>
                </div>
                </div>
              
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <ul className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 items-start gap-4">
  {movies.map((movie, index) => (
    <motion.div
      layoutId={`card-${movie.id}-${id}`}
      key={`card-${movie.id}-${id}-${index}`}
      onClick={() => setActive(movie)}
      className="p-3 flex flex-col rounded-xl cursor-pointer"
    >
      <div className="flex gap-4 flex-col w-full">
        <motion.div layoutId={`image-${movie.id}-${id}`} className="relative">
          <Image
            width={500}
            height={750}
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
            className="h-60 w-full rounded-lg object-cover object-top"
          />
      
          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-end p-2"/>
          <div className="bg-background_light absolute top-2 right-2 text-white text-md font-semibold p-2 rounded-full">
            {movie.vote_average.toFixed(1)}
            </div>
        
        </motion.div>
        <div className="flex flex-col">
          <motion.h3
            layoutId={`title-${movie.id}-${id}`}
            className="font-semibold text-neutral-200 text-base"
          >
            {movie?.title}
          </motion.h3>
          <p
                
            className="font-semibold text-zinc-500 text-xs"
          >
{format(movie?.release_date,"yyyy-MM-dd")}
          </p>
        </div>
      </div>
    </motion.div>
  ))}
</ul>
    </>
  );
};

export const CloseIcon = () => (
  <motion.svg
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.05 } }}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 text-black"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </motion.svg>
);
