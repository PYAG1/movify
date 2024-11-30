import { Movie } from "@/types";
import { buttonVariants } from "@/components/ui/button";
import { format } from "date-fns";
import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ movieid: string }>;
}) {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${(await params).movieid}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      },
    }
  );
  const movieData: Movie = await data.json();

  return (
    <div className="w-full min-h-screen p-5 text-white md:max-w-2xl lg:max-w-6xl md:mx-auto">
      <Link href={"/"} className={buttonVariants({ variant: "default" })}>
        <Home size={30} className=" text-white" />
      </Link>
      <div className=" py-8">
        <p className="text-2xl font-semibold text-orange ">
          {movieData?.title} ({format(movieData?.release_date, "yyyy")})
        </p>
        <p className="text-zinc-500">
          {movieData?.genres?.map((item, index) => (
            <span key={item.id}>
              {item.name}
              {index < movieData.genres.length - 1 && ", "}
            </span>
          ))}
        </p>
      </div>

      <div className="relative w-full h-full bg-black">
        <Image
          priority
          width={500}
          height={500}
          src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}
          alt={movieData.title}
          className="w-full min-h-[50vh] lg:h-[60vh] sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
        />

        <div className="absolute inset-0 w-full h-full  bg-black/70 flex items-center justify-center">
          <div className="absolute left-5 z-40">
            <Image
              width={500}
              height={750}
              src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
              alt={movieData.title}
              className="h-full w-44 rounded-lg object-contain object-top"
            />
            <div>
              <p className=" text-white text-8xl">{movieData.adult}</p>
            </div>
          </div>
        </div>
      </div>

      <div className=" py-10">
        <div className="mt-6">
          <dl className="grid grid-cols-1 sm:grid-cols-2">
            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
              <dt className="text-lg   text-zinc-500  font-semibold">
                Overview
              </dt>
              <dd className="mt-1 text-sm/6 text-white sm:mt-2">
                {movieData?.overview}
              </dd>
            </div>
            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
              <dt className="text-lg   text-zinc-500  font-semibold">
                Release Date
              </dt>
              <dd className="mt-1 text-sm/6 text-white sm:mt-2">
                {format(movieData?.release_date, "yyyy-MM-dd")}
              </dd>
            </div>

            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
              <dt className="text-lg   text-zinc-500  font-semibold">
                Tag Line
              </dt>
              <dd className="mt-1 text-sm/6 text-white sm:mt-2">
                {movieData?.tagline}
              </dd>
            </div>

            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
              <dt className="text-lg   text-zinc-500  font-semibold">Status</dt>
              <dd className="mt-1 text-sm/6 text-white sm:mt-2">
                {movieData?.status === "Released" ? (
                  <span className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20">
                    {movieData?.status}
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20">
                    {movieData?.status}
                  </span>
                )}
              </dd>
            </div>
            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
              <dt className="text-lg   text-zinc-500  font-semibold">
                Language
              </dt>
              <dd className="mt-1 text-sm/6 text-white  sm:mt-2">
                <p className="text-white">
                  {movieData?.spoken_languages?.map((item, index) => (
                    <span key={item.english_name}>
                      {item.english_name}
                      {index < movieData?.spoken_languages?.length - 1 && ", "}
                    </span>
                  ))}
                </p>
              </dd>
            </div>
            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
              <dt className="text-lg   text-zinc-500  font-semibold">
                Revenue Generated
              </dt>
              <dd className="mt-1 text-sm/6 text-white sm:mt-2">
                ${movieData?.revenue?.toLocaleString()}.00
              </dd>
            </div>
            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
              <dt className="text-lg   text-zinc-500  font-semibold">
                HomePage
              </dt>
              <dd className="mt-1 text-sm/6 text-turq underline  sm:mt-2">
                {movieData?.homepage}
              </dd>
            </div>

            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
              <dt className="text-lg   text-zinc-500  font-semibold">
                Production Companies
              </dt>

              <dd className="mt-1 text-sm/6 text-white sm:mt-2">
                {movieData?.production_companies?.map((company, index) => (
                  <span key={company.name}>
                    {company.name} ({company.origin_country})
                    {index < movieData?.production_companies?.length - 1 &&
                      " , "}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
