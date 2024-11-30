import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <div className="w-full h-full p-5 text-white md:max-w-2xl lg:max-w-6xl md:mx-auto">
      <div className=" py-8">
        <Skeleton className=" h-24 w-full bg-zinc-700" />
      </div>

      <div className="relative w-full min-h-full bg-black">
        <Skeleton className=" h-[50vh] w-full  bg-zinc-700" />
      </div>

      <div className=" py-10">
        <div className="mt-6">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton className=" w-full h-10 bg-zinc-700" />

            <Skeleton className=" w-full h-10 bg-zinc-700" />
          </dl>
        </div>
      </div>
    </div>
  );
}
