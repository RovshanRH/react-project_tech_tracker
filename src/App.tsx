import { useEffect, useState } from "react";
import "./App.css";
import TechnologyCard from "./components/TechnologyCard.tsx";
import ProgressHeader from "./components/ProgressHeader.tsx";
import QuickActions from "./components/QuickActions.tsx";
// import { jsx } from "react/jsx-runtime";

function App() {
  type Technology = {
    id: number;
    title: string;
    description: string;
    status: "completed" | "in-progress" | "not-started";
    category: string;
    notes: string;
  };
  const [technologies, setTechnologies] = useState<Technology[]>(() => {
    const saved = localStorage.getItem("techTrackerData");
    if (saved) {
      console.log("Данные загружены из localStorage");
      return JSON.parse(saved);
    }
    // Демо-данные только если в localStorage ничего нет
    return [
      {
        id: 1,
        title: "React Components",
        description: "Изучение базовых компонентов",
        status: "completed",
        category: "frontend",
        notes: "",
      },
      {
        id: 2,
        title: "JSX Syntax",
        description: "Освоение синтаксиса JSX",
        status: "in-progress",
        category: "React",
        notes: "",
      },
      {
        id: 3,
        title: "State Management",
        description: "Работа с состоянием компонентов",
        status: "not-started",
        category: "React",
        notes: "",
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("techTrackerData", JSON.stringify(technologies));
    console.log("Данные сохранены в localStorage");
  }, [technologies]);

  // Функция для изменения статуса технологии
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
        counts[item.category] = (counts[item.category] ?? 0) + 1;
      }
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

  function checkAll() {
    technologies.map((tech) => {
      setTechnologies((prevTechnologies) =>
        prevTechnologies.map((tech) => {
          return {
            ...tech,
            status: "completed",
          };
        })
      );
      return tech;
    });
  }
  function eraseAll() {
    technologies.map((tech) => {
      setTechnologies((prevTechnologies) =>
        prevTechnologies.map((tech) => {
          return {
            ...tech,
            status: "not-started",
          };
        })
      );
      return tech;
    });
  }
  function randomChoice() {
    const notStartedTechs = technologies.filter(
      (tech) => tech.status === "not-started"
    );
    if (notStartedTechs.length === 0) {
      alert("Невозможно выбрать технологию  для изучения");
      return;
    }
    let TechId: number;

    if (notStartedTechs.length === 1) {
      // Если всего одна технология, берем ее ID
      TechId = notStartedTechs[0].id;
    } else {
      // Генерируем случайный индекс от 0 до длины массива-1
      const randomIndex = Math.floor(Math.random() * notStartedTechs.length);
      // Получаем ID случайно выбранной технологии
      TechId = notStartedTechs[randomIndex].id;
    }

    // 4. Обновляем статус выбранной технологии
    setTechnologies((prevTechnologies) =>
      prevTechnologies.map((tech) =>
        tech.id === TechId ? { ...tech, status: "in-progress" } : tech
      )
    );
  }
  // Вариант 1: Используем CSS классы для скрытия
  function filter(choice: string) {
    const allCards = document.querySelectorAll(".technology-card");

    switch (choice) {
      case "all":
        // Показать все карточки
        allCards.forEach((card) => {
          card.classList.remove("hidden"); // Убираем класс скрытия
        });
        break;

      case "not-started": {
        // Скрыть все, потом показать только "not-started"
        allCards.forEach((card) => {
          card.classList.add("hidden"); // Сначала скрываем все
        });

        // Находим и показываем карточки со статусом "not-started"
        const notStartedCards = document.querySelectorAll(
          ".technology-card--not-started"
        );
        notStartedCards.forEach((card) => {
          card.classList.remove("hidden");
        });
        break;
      }

      case "in-progress":
        allCards.forEach((card) => card.classList.add("hidden"));
        document
          .querySelectorAll(".technology-card--in-progress")
          .forEach((card) => card.classList.remove("hidden"));
        break;

      case "completed":
        allCards.forEach((card) => card.classList.add("hidden"));
        document
          .querySelectorAll(".technology-card--completed")
          .forEach((card) => card.classList.remove("hidden"));
        break;
    }
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
      <QuickActions
        onCheckAll={checkAll}
        onEraseAll={eraseAll}
        onRandomChoice={randomChoice}
        onFilterChange={filter}
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
