import Image from "next/image";
import { Suspense } from "react";

import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import Cabin from "@/app/_components/Cabin";

import { getCabin } from "@/app/_lib/data-service";

export async function generateMetadata({params}){
  const {name} = await getCabin(params.cabinId);
  return{
    title: `Cabin ${name}`
  }
}

// export async function generateStaticParams(){
//   const cabins = await getCabins();

//   const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

//   return ids;
// }

export default async function Page({params}) {
  const cabin = await getCabin(params.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <div className="relative scale-[1.15] -translate-x-3">
          <Image src={cabin.image} fill alt={`Cabin ${cabin.name}`} />
        </div>

        <Cabin cabin ={cabin}/>
      </div>

      <div>
        <h2 className="text-5xl font-semibold text-center mb-8 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
      </div>
      <Suspense fallback={<Spinner />}>
      <Reservation cabin={cabin}/>
      </Suspense>
    </div>
  );
}
