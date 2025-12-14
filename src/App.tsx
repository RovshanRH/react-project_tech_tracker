import { useState } from "react";
import "./App.css";
import TechnologyCard from "./components/TechnologyCard.tsx";
import ProgressHeader from "./components/ProgressHeader.tsx";

function App() {

  type Technology = {
    id: number;
    title: string;
    description: string;
    status: "completed" | "in-progress" | "not-started";
    category: string;
  }

  const [technologies, setTechnologies] = useState<Technology[]>([
    {
      id: 1,
      title: "React Components",
      description: "Изучение базовых компонентов",
      status: "completed",
      category: "frontend",
    },
    {
      id: 2,
      title: "JSX Syntax",
      description: "Освоение синтаксиса JSX",
      status: "in-progress",
      category: "React",
    },
    {
      id: 3,
      title: "State Management",
      description: "Работа с состоянием компонентов",
      status: "not-started",
      category: "React",
    },
  ]);

  // Функция для изменения статуса технологии
  const updateTechnologyStatus = (id: number) => {
    setTechnologies((prevTechnologies) =>
      prevTechnologies.map((tech) => {
        if (tech.id === id) {
          // Определяем следующий статус в цикле
          const statusOrder = ["not-started", "in-progress", "completed"] as const;
          const currentIndex = statusOrder.indexOf(tech.status);
          const nextIndex = (currentIndex + 1) % statusOrder.length;

          return {
            ...tech,
            status: statusOrder[nextIndex],
          };
        }
        return tech;
      })
    );
  };

  console.log("App component is rendering!");
  console.log("Technologies:", technologies);

  function findMaxPopularCategory(tech: Technology[] | null | undefined) {
    if (tech == null) return undefined;
    
    const counts: Record<string, number> = {};
    
    for (const item of tech) {
      if (item.status === "completed") {
        counts[item.category] = (counts[item.category] ?? 0) + 1
      };
    }
    let maxCategory: string | undefined;
    let maxCount = -Infinity;

    for (const [category, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxCount = count;
        maxCategory = category;
      }
    }
    return maxCategory;
    
  }

  return (
    <div className="App">
      <h1>Technology Tracker</h1>
      <ProgressHeader
        AllCount={technologies.length}
        NotStarted={
          technologies.filter((tech) => tech.status === "not-started").length
        }
        FinishedCount={
          technologies.filter((tech) => tech.status === "completed").length
        }
        InProgress={
          technologies.filter((tech) => tech.status === "in-progress").length
        }
        PopularCategory={findMaxPopularCategory(technologies) ?? ""}
      />

      {technologies.map((tech) => (
        <TechnologyCard
          key={tech.id}
          id={tech.id}
          title={tech.title}
          description={tech.description}
          status={tech.status}
          category={tech.category}
          onStatusChange={() => updateTechnologyStatus(tech.id)} // Передаем функцию
        />
      ))}
    </div>
  );
}

export default App;
