import React, { useState, useRef, useEffect } from 'react';
import './QuickActions.css';
import checkAllIcon from "../assets/svg/check-all.svg";
import EraseAllIcon from "../assets/svg/erase-all.svg";
import FilterIcon from "../assets/svg/filter.svg";
import RandomIcon from "../assets/svg/random.svg";

// Типы для пропсов, если будут передаваться извне
interface QuickActionsProps {
  onCheckAll?: () => void;
  onEraseAll?: () => void;
  onRandomChoice?: () => void;
  onFilterChange?: (filter: string) => void;
}

// Варианты фильтрации
const filterOptions = [
  { id: 'all', label: 'All technologies' },
  { id: 'not-started', label: 'Only not started' },
  { id: 'in-progress', label: 'Only in proccess' },
  { id: 'completed', label: 'Only completed' },
];

function QuickActions({ 
  onCheckAll, 
  onEraseAll, 
  onRandomChoice, 
  onFilterChange 
}: QuickActionsProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Обработчик клика вне dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Функции-обработчики
  const handleCheckAll = () => {
    console.log('Check all as finished clicked');
    onCheckAll?.();
  };

  const handleEraseAll = () => {
    console.log('Erase all statuses clicked');
    onEraseAll?.();
  };

  const handleRandomChoice = () => {
    console.log('Random tech choice clicked');
    onRandomChoice?.();
  };

  const handleFilterSelect = (filterId: string) => {
    console.log('Filter selected:', filterId);
    setSelectedFilter(filterId);
    setIsDropdownOpen(false);
    onFilterChange?.(filterId);
  };

  // Получаем текущую метку фильтра
  const getCurrentFilterLabel = () => {
    const currentFilter = filterOptions.find(option => option.id === selectedFilter);
    return currentFilter?.label || 'Filter';
  };

  return (
    <div className="btn-panel">
      {/* Кнопка Check All */}
      <div 
        className="btn-checkAll" 
        onClick={handleCheckAll}
        title="Check all as finished"
      >
        <div className="svg-container">
          <img src={checkAllIcon} alt="Check all" />
        </div>
      </div>

      {/* Кнопка Erase All */}
      <div 
        className="btn-eraseAll" 
        onClick={handleEraseAll}
        title="Erase all statuses"
      >
        <div className="svg-container">
          <img src={EraseAllIcon} alt="Erase all statuses" />
        </div>
      </div>

      {/* Кнопка Random Choice */}
      <div 
        className="btn-randomTech" 
        onClick={handleRandomChoice}
        title="Random technology choice"
      >
        <div className="svg-container">
          <img src={RandomIcon} alt="Random choice" />
        </div>
      </div>

      {/* Dropdown для фильтрации */}
      <div className="btn-dropdown" ref={dropdownRef}>
        <button 
          className='dropdown-toggle'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          aria-expanded={isDropdownOpen}
          title={getCurrentFilterLabel()}
        >
          <div className="svg-container">
            <img src={FilterIcon} alt="Filter" />
          </div>
          {/* Добавим индикатор текущего фильтра, если нужно */}
          <span className="filter-label">{getCurrentFilterLabel()}</span>
        </button>
        
        {isDropdownOpen && (
          <ul className='dropdown-menu' role="listbox">
            {filterOptions.map((option) => (
              <li 
                key={option.id}
                className={`dropdown-item ${selectedFilter === option.id ? 'selected' : ''}`}
                onClick={() => handleFilterSelect(option.id)}
                role="option"
                aria-selected={selectedFilter === option.id}
              >
                {option.label}
                {selectedFilter === option.id && (
                  <span className="checkmark">✓</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default QuickActions;