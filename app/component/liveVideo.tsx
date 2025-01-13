import React from 'react'

export default function Live(){
    return(
        <div className='flex justify-center items-center bg-gray-100 py-6'>
            <div className='w-full max-w-4xl border border-gray-300 rounded-lg shadow-lg overflow-hidden'>
                <div className='bg-gray-800 text-white text-center py-2 text-lg font-semibold'>
                Live
                </div>

                {/* Video */}
                <div className='aspect-w-16 aspect-h-9 bg-black'>
                    <video
                    autoPlay
                    loop
                    controls
                    className='w-full h-full'
                    src='/* url live feed */'/>
                </div>
            </div>
        </div>
    )
}
