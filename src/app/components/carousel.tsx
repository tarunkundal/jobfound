'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const images = [
    '/google.svg',
    '/google.svg',
    '/google.svg',
];

const slides = [
    ['/google.svg'],
    ['/apple.svg'],
];

export default function Carousel() {
    const [current, setCurrent] = useState(0);

    // Auto-slide every 3s
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-[50%] mx-auto overflow-hidden rounded-lg">
            <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${current * 100}%)` }}>
                {slides.map((slide, i) => (
                    <div key={i} className="w-full flex justify-around flex-shrink-0">
                        {slide.map((src, j) => (
                            <Image key={j} src={src} alt={`logo-${j}`} width={100} height={100} />
                        ))}
                    </div>
                ))}
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        className={`w-3 h-3 rounded-full ${i === current ? 'bg-white' : 'bg-gray-400'
                            }`}
                        onClick={() => setCurrent(i)}
                    ></button>
                ))}
            </div>
        </div>
    );
}
