"use client"

import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

const testimonials = [
  {
    id: 1,
    name: "Hamid Safarov",
    role: "MUHANDIS",
    company: "TechCorp",
    text: "Juda yaxshi jamoa, ishonchli hamyonbop, va asosiysi o'z vaqtida bajarishadi! Loyihamiz kutilganidan ham yaxshi chiqdi.",
    rating: 5,
    image: "/placeholder.svg?height=384&width=320&text=Hamid",
  },
  {
    id: 2,
    name: "Hamida Safarova",
    role: "Dizayner",
    company: "Creative Studio",
    text: "Professional yondashuv va zamonaviy yechimlar. Jamoaning har bir a'zosi o'z ishini mukammal bajaradi.",
    rating: 5,
    image: "/placeholder.svg?height=384&width=320&text=Hamida",
  },
  {
    id: 3,
    name: "Alisher Karimov",
    role: "CEO",
    company: "StartupUZ",
    text: "ArdentSoft bilan ishlash - bu haqiqiy zavq! Ular bizning g'oyalarimizni hayotga tatbiq etishda yordam berishdi.",
    rating: 5,
    image: "/placeholder.svg?height=384&width=320&text=Alisher",
  },
  {
    id: 4,
    name: "Malika Tosheva",
    role: "Marketing Director",
    company: "Digital Agency",
    text: "Eng yaxshi IT kompaniya! Tez, sifatli va professional. Barcha loyihalarimizni ularga ishonib topshiramiz.",
    rating: 5,
    image: "/placeholder.svg?height=384&width=320&text=Malika",
  },
  {
    id: 5,
    name: "Bobur Rahimov",
    role: "CTO",
    company: "InnovateTech",
    text: "Texnik jihatdan juda kuchli jamoa. Murakkab masalalarni oson hal qilishadi va har doim yangi yechimlar taklif qilishadi.",
    rating: 5,
    image: "/placeholder.svg?height=384&width=320&text=Bobur",
  },
  {
    id: 6,
    name: "Nilufar Abdullayeva",
    role: "Product Manager",
    company: "E-commerce Plus",
    text: "Mijozlarga bo'lgan munosabat va ishning sifati juda yuqori darajada. Tavsiya qilaman!",
    rating: 5,
    image: "/placeholder.svg?height=384&width=320&text=Nilufar",
  },
]

export function TestimonialsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 1024px)": {
        slides: {
          perView: 1,
          spacing: 24,
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
    }, 5000)

    return () => clearInterval(interval)
  }, [instanceRef])

  return (
    <div className="relative w-full">
      {/* Navigation Arrows */}
      {loaded && instanceRef.current && (
        <>
          <button
            onClick={() => instanceRef.current?.prev()}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </>
      )}

      <div ref={sliderRef} className="keen-slider">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="keen-slider__slide">
            <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-8 px-8">
              {/* Testimonial Image */}
              <div className="w-64 h-80 sm:w-80 sm:h-96 rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={320}
                  height={384}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Testimonial Card */}
              <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl w-full max-w-md lg:max-w-lg flex-shrink-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                    ))}
                  </div>

                  <p className="text-white mb-6 leading-relaxed text-lg italic">"{testimonial.text}"</p>

                  <div className="border-t border-blue-400 pt-6">
                    <h3 className="text-xl font-bold mb-1">{testimonial.name}</h3>
                    <p className="text-blue-100 text-sm mb-1 uppercase tracking-wide">{testimonial.role}</p>
                    <p className="text-blue-200 text-sm">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      {loaded && instanceRef.current && (
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === idx ? "bg-blue-600" : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
