import { useState, useEffect } from "react";
import type {ChangeEvent, FormEvent} from 'react';
import { useQuerySearch } from "../hooks/useQuerySearch";

export function QuerySearch() {
  const {
    searchQuery,
    setSearchQuery,
    filteredTechnologies, // Хотя не используется здесь, оставил для демонстрации
  } = useQuerySearch();

  // Локальное состояние для input, чтобы избежать лагов при печати
  const [inputValue, setInputValue] = useState(searchQuery);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSearchQuery(inputValue.trim());
  }

  function handleClear() {
    setInputValue("");
    setSearchQuery("");
  }

  // Обновляем локальное состояние при изменении searchQuery извне
  // (например, если query очищается из другого компонента)
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <input 
            type="text" 
            placeholder="Поиск технологии по названию или описанию..."
            value={inputValue}
            onChange={handleInputChange}
            className="search-input"
          />
          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="clear-button"
              aria-label="Очистить поиск"
            >
              ×
            </button>
          )}
        </div>
        <button type="submit" className="search-button">
          Найти
        </button>
      </form>
      
      {filteredTechnologies && (
        <div className="search-results-info">
          Найдено: {filteredTechnologies.length} технологий
        </div>
      )}
    </div>
  );
}