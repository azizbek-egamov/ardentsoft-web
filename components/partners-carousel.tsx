"use client"

import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { useState, useEffect } from "react"

const partners = [
  {
    id: 1,
    name: "Carrefour",
    logo: (
      <div className="flex items-center space-x-1">
        <div className="w-4 h-6 bg-red-500 transform -skew-x-12"></div>
        <div className="w-4 h-6 bg-blue-600 transform skew-x-12"></div>
      </div>
    ),
    textLogo: "Carrefour",
    color: "text-blue-600",
  },
  {
    id: 2,
    name: "IKEA",
    logo: (
      <div className="w-20 h-12 bg-blue-600 rounded-full flex items-center justify-center">
        <span className="text-yellow-400 font-bold text-lg">IKEA</span>
      </div>
    ),
    textLogo: "",
    color: "",
  },
  {
    id: 3,
    name: "Sundance Institute",
    logo: (
      <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-black font-bold text-sm">sundance</div>
          <div className="text-black text-xs">institute</div>
        </div>
      </div>
    ),
    textLogo: "",
    color: "",
  },
  {
    id: 4,
    name: "Envato",
    logo: (
      <div className="flex items-center space-x-1">
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-gray-800 font-bold text-xl">envato</span>
      </div>
    ),
    textLogo: "",
    color: "",
  },
  {
    id: 5,
    name: "Airbnb",
    logo: (
      <div className="w-12 h-12 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-red-400 rounded-full relative">
          <div className="absolute top-1 left-1 w-2 h-2 bg-red-400 rounded-full"></div>
        </div>
      </div>
    ),
    textLogo: "airbnb",
    color: "text-red-400",
  },
  {
    id: 6,
    name: "Microsoft",
    logo: (
      <div className="grid grid-cols-2 gap-1 w-8 h-8">
        <div className="bg-red-500 rounded-sm"></div>
        <div className="bg-green-500 rounded-sm"></div>
        <div className="bg-blue-500 rounded-sm"></div>
        <div className="bg-yellow-500 rounded-sm"></div>
      </div>
    ),
    textLogo: "Microsoft",
    color: "text-gray-800",
  },
  {
    id: 7,
    name: "Google",
    logo: (
      <div className="text-2xl font-bold">
        <span className="text-blue-500">G</span>
        <span className="text-red-500">o</span>
        <span className="text-yellow-500">o</span>
        <span className="text-blue-500">g</span>
        <span className="text-green-500">l</span>
        <span className="text-red-500">e</span>
      </div>
    ),
    textLogo: "",
    color: "",
  },
  {
    id: 8,
    name: "Apple",
    logo: (
      <div className="w-8 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
        <div className="w-6 h-7 bg-white rounded-lg relative">
          <div className="absolute top-0 right-1 w-2 h-2 bg-gray-800 rounded-full"></div>
        </div>
      </div>
    ),
    textLogo: "Apple",
    color: "text-gray-800",
  },
]

export function PartnersCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slides: {
      perView: 2,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: {
          perView: 3,
          spacing: 20,
        },
      },
      "(min-width: 768px)": {
        slides: {
          perView: 4,
          spacing: 24,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 5,
          spacing: 32,
        },
      },
    },
    loop: true,
    mode: "snap",
    drag: true,
    created() {
      setLoaded(true)
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
  })

  // Auto-play functionality
  useEffect(() => {
    if (!instanceRef.current) return

    const interval = setInterval(() => {
      instanceRef.current?.next()
    }, 3000)

    return () => clearInterval(interval)
  }, [instanceRef])

  return (
    <div className="relative w-full">
      <div ref={sliderRef} className="keen-slider">
        {partners.map((partner) => (
          <div key={partner.id} className="keen-slider__slide">
            <div className="flex flex-col items-center space-y-3 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-center h-16">{partner.logo}</div>
              {partner.textLogo && <span className={`font-bold text-lg ${partner.color}`}>{partner.textLogo}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      {loaded && instanceRef.current && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(partners.length / 5) }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx * 5)}
              className={`w-3 h-3 rounded-full transition-colors ${
                Math.floor(currentSlide / 5) === idx ? "bg-blue-600" : "bg-gray-300"
              }`}
              aria-label={`Go to partner group ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
