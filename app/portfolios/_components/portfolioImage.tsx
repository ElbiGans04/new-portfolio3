'use client';
import NextImage from 'next/image';
import { useEffect, useState } from 'react';

export default function PortfolioImage({ val }: { val: { plain_text: string } }) {
    const [show, setShow] = useState(false);

    // Overflow Body
    useEffect(() => {
        document.body.style.overflow = show ? 'hidden' : 'auto';
    }, [show])

    return (
        <div>
            {/* Modal */}
            <div className={show ? 'flex flex-col items-center justify-center bg-[rgba(0,0,0,0.8)] fixed px-6 lg:px-28 py-6 top-0 right-0 left-0 bottom-0 overflow-hidden z-[999]' : ''}>
                {show && <button className='justify-self-start font-bold text-white text-right underline hover:no-underline mb-[16px] cursor-pointer text-sm lg:text-md' onClick={() => setShow(false)}>Close Modal Image</button>}
                <div className="relative">
                    <NextImage placeholder='blur' blurDataURL={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPc/x8AAoMBwP8UKJsAAAAASUVORK5CYII='} title='Click To Zoom In' src={val.plain_text} onClick={() => setShow(true)} className={`transition-transform ${!show ? 'hover:scale-[1.05]' : ''} shadow-xl/30 object-contain cursor-pointer w-full lg:min-h-[250px] max-h-[500px] h-full`} sizes="100vw" alt="portfolio-image" width={0} height={0} />
                </div>
            </div>
            <p className="italic text-xs lg:text-sm text-center mt-2">(Click To Zoom In)</p>
        </div>
    )
}