import { useState, useEffect, useCallback } from "react";
import { defaultTechnologies } from "../data/technologiesList";
import type { Technology } from "../types/technolgies";

export function useQuerySearch() {
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    const saved = localStorage.getItem("TechTrackerQuery");

    return saved || "";
  });

  useEffect(() => {
    if (searchQuery.trim()) {
    localStorage.setItem("TechTrackerQuery", JSON.stringify(searchQuery));
    console.log("Данные поиска сохранены");
    } else {
        localStorage.removeItem("TechTrackerQuery");
    }
  }, [searchQuery]);

   const filterByNameOrDesc = useCallback((query: string): Technology[] => {
    if (!query.trim()) {
      return defaultTechnologies;
    }

    const lowerQuery = query.toLowerCase();
    return defaultTechnologies.filter(
      (tech) =>
        tech.title.toLowerCase().includes(lowerQuery) ||
        tech.description.toLowerCase().includes(lowerQuery)
    );
  }, []);

  const filteredTechnologies = filterByNameOrDesc(searchQuery);

  return {
    searchQuery,
    setSearchQuery,
    filterByNameOrDesc,
    filteredTechnologies,
  };
}
