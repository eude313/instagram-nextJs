import React, { Suspense } from 'react'
import { useRouter } from 'next/router';
import { Button, Image } from '@nextui-org/react'


export default function AudioPage() {
    const router = useRouter();
    const { audioId } = router.query;  
    
    if (!router.isReady || !audioId) {
      return <div>Loading...</div>;
    }
    return(
        <div className='h-screen w-full overflow-y-auto'>
            <div className='h-auto px-[12px]'>
                <h2 className='text-base font-semibold'>Audio</h2>
                <div className='flex flex-row'>
                    <div className=''>
                        <Image
                            src="https://placekitten.com/400/400" 
                            radius='md'
                            classNames='h-40 w-40'
                        />
                    </div>
                    <div className=''>
                        <h3 className='text-base'>{audioId}</h3>
                        <h3 className='text-base'>Audio count</h3>
                       <Button>
                            save audio
                       </Button>
                    </div>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-3 gap-1 md:gap-2">
                    {Array(7).fill(0).map((_, idx) => (
                        <div key={idx} className='h-full w-full border rounded-md'></div>
                    ))}
                </div>
            </div>
        </div>
    )
}
