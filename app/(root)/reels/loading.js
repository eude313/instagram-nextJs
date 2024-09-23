import React from 'react'
import {Skeleton} from "@nextui-org/skeleton";

export default function Loading() {
  return (
    <div className='w-full md:w-[480px] relative md:flex mx-auto h-[92vh] md:h-screen' radius="lg">
      <Skeleton className="w-3/5 rounded-lg">
        <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
      </Skeleton>
      <Skeleton className="w-4/5 rounded-lg">
        <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
      </Skeleton>
      {/* <Skeleton className="w-2/5 rounded-lg">  
        <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
      </Skeleton> */}
  </div>
  )
}
