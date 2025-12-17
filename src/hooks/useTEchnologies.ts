// useState, useEffect с LocalStorage, updateTechSttaus, checkAl, eraseAll, eandomCHoice и тд.

import { useEffect, useState } from "react";
import type { Technology } from "../types/technolgies";
import { defaultTechnologies } from "../data/technologiesList";

export function useTechnologies() {
  

  const [technologies, setTechnologies] = useState<Technology[]>(() => {
    const saved = localStorage.getItem("techTrackerData");

    if (saved) {
      try {
        return JSON.parse(saved) as Technology[];
      } catch {
        return defaultTechnologies;
      }
    }

    return defaultTechnologies;
  }); // загрузка 1 раз

  useEffect(() => {
    localStorage.setItem("techTrackerData", JSON.stringify(technologies));
    console.log("Данные сохранены в localStorage");
  }, [technologies]); // после рендера сохраняем данные в локалсторэдж

  const updateTechnologyStatus = (id: number) => {
    setTechnologies((prevTechnologies) =>
      prevTechnologies.map((tech) => {
        if (tech.id === id) {
          // Определяем следующий статус в цикле
          const statusOrder = [
            "not-started",
            "in-progress",
            "completed",
          ] as const;
          const currentIndex = statusOrder.indexOf(tech.status);
          const nextIndex = (currentIndex + 1) % statusOrder.length;

          return {
            ...tech,
            status: statusOrder[nextIndex],
          }; // возвращаем новый объект но с изменённым статусом
        }
        return tech;
      })
    );
  };

  const checkAll = () =>
    setTechnologies((prev) => prev.map((t) => ({ ...t, status: "completed" })));

  const eraseAll = () =>
    setTechnologies((prev) =>
      prev.map((t) => ({ ...t, status: "not-started" }))
    );

  const randomChoice = () => {
    const candidates = technologies.filter((t) => t.status === "not-started");
    if (!candidates.length) return;

    const random = candidates[Math.floor(Math.random() * candidates.length)];

    updateTechnologyStatus(random.id);
  };

  return {
    technologies,
    setTechnologies,
    updateTechnologyStatus,
    checkAll,
    eraseAll,
    randomChoice,
  }; //передал список технологий, функцию обновления и дальнейший функционал по заданиям
}
