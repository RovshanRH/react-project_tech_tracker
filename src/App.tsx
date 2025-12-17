import {useState, useMemo} from 'react'
import "./App.css";
import TechnologyCard from "./components/TechnologyCard.tsx";
import ProgressHeader from "./components/ProgressHeader.tsx";
import QuickActions from "./components/QuickActions.tsx";
import { QuerySearch } from './components/QuerySearch.tsx';
import type { Technology } from "./types/technolgies.ts";
import { useTechnologies } from "./hooks/useTechnologies.ts";

// import { jsx } from "react/jsx-runtime";

function App() {
  
  const {
    technologies,
    updateTechnologyStatus,
    checkAll,
    eraseAll,
    randomChoice,
  } = useTechnologies();

  type FilterStatus = "all" | "not-started" | "in-progress" | "completed";

  const [FilterStatus, setFilterStatus] = useState<FilterStatus>("all");


  const handleFilterChange = (filter: string) => {
    setFilterStatus(filter as FilterStatus)
  }
  
  const filteredTechnologies = useMemo(() => {
    if (FilterStatus === "all") return technologies;
    
    return technologies.filter(
      (tech) => tech.status === FilterStatus
    );
  }, [technologies, FilterStatus]);
  
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


  // const HandleNotesChange = () => {

  // }

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
      <QuerySearch />
      <QuickActions
        onCheckAll={checkAll}
        onEraseAll={eraseAll}
        onRandomChoice={randomChoice}
        onFilterChange={handleFilterChange}
      />
      {filteredTechnologies.map((tech) => (
        <TechnologyCard
          key={tech.id}
          id={tech.id}
          title={tech.title}
          description={tech.description}
          status={tech.status}
          category={tech.category}
          notes={tech.notes}
          onStatusChange={() => updateTechnologyStatus(tech.id)}
        />
      ))}
    </div>
  );
}

export default App;
