"use client"

import { useKeenSlider, KeenSliderPlugin, KeenSliderInstance } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState, useEffect, useMemo } from "react"

export function TeamCarousel() {
  const [teamMembers, setTeamMembers] = useState<any[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)

  // ✅ Fetch team data from API
  useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/team/")
        const data = await res.json()

        const formatted = data.map((member: any) => ({
          id: member.id,
          name: member.full_name,
          role: member.role,
          description: member.description,
          image: member.image || "/placeholder.svg",
          experience: `${member.experience}+ yil`,
          projects: `${member.projects_done}+`,
          skills: member.technology.map((t: any) => t.name),
        }))

        setTeamMembers(formatted)
      } catch (err) {
        console.error("Ошибка при загрузке команды:", err)
      }
    }

    fetchTeam()
  }, [])

  // ✅ Конфигурация Keen Slider через useMemo
  const sliderConfig = useMemo(() => {
    if (teamMembers.length === 0) return {} as any // 👈 добавили тип-приведение

    return {
      initial: 0,
      slides: {
        perView: 1,
        spacing: 16,
      },
      breakpoints: {
        "(min-width: 640px)": { slides: { perView: 2, spacing: 20 } },
        "(min-width: 1024px)": { slides: { perView: 3, spacing: 24 } },
        "(min-width: 1280px)": { slides: { perView: 4, spacing: 32 } },
      },
      loop: true,
      mode: "snap",
      drag: true,
      created() {
        setLoaded(true)
      },
      slideChanged(slider: KeenSliderInstance) {
        setCurrentSlide(slider.track.details.rel)
      },
    }
  }, [teamMembers])

  // ✅ Инициализация слайдера
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(sliderConfig)

  // ✅ Автопрокрутка
  const handleNext = () => {
    instanceRef.current?.next()
  }

  const handlePrev = () => {
    instanceRef.current?.prev()
  }

  return (
    <div className="relative w-full">
      {/* Стрелки */}
      <div className="absolute inset-y-0 flex items-center justify-between w-full px-4 z-10">
        <button
          onClick={handlePrev}
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <button
          onClick={handleNext}
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Слайды */}
      <div ref={sliderRef} className="keen-slider">
        {teamMembers.map((member) => (
          <div key={member.id} className="keen-slider__slide">
            <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-white overflow-hidden h-full">
              <CardContent className="p-6 text-center h-full flex flex-col">
                <div className="relative mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="w-32 h-32 rounded-full mx-auto object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">
                  {member.description}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="bg-blue-50 rounded-lg p-2">
                    <div className="font-semibold text-blue-600">{member.experience}</div>
                    <div className="text-gray-600">Tajriba</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-2">
                    <div className="font-semibold text-green-600">{member.projects}</div>
                    <div className="text-gray-600">Loyihalar</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.skills.map((s: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Пагинация */}
      {loaded && instanceRef.current && (
        <div className="flex justify-center mt-8 space-x-2">
          {teamMembers.map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`w-3 h-3 rounded-full transition-colors ${currentSlide === idx ? "bg-blue-600" : "bg-gray-300"
                }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
