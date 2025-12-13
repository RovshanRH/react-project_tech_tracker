import { useState } from 'react';
import './App.css';
import TechnologyCard from "./components/TechnologyCard.tsx";
import ProgressHeader from "./components/ProgressHeader.tsx";

function App() {
  const [technologies, setTechnologies] = useState([
    {
      id: 1, 
      title: 'React Components', 
      description: 'Изучение базовых компонентов',
      status: 'completed'
    },
    {
      id: 2, 
      title: 'JSX Syntax', 
      description: 'Освоение синтаксиса JSX', 
      status: 'in-progress'
    },
    {
      id: 3, 
      title: 'State Management', 
      description: 'Работа с состоянием компонентов', 
      status: 'not-started'
    }
  ]);

  // Функция для изменения статуса технологии
  const updateTechnologyStatus = (id: number) => {
    setTechnologies(prevTechnologies => 
      prevTechnologies.map(tech => {
        if (tech.id === id) {
          // Определяем следующий статус в цикле
          const statusOrder = ['not-started', 'in-progress', 'completed'];
          const currentIndex = statusOrder.indexOf(tech.status);
          const nextIndex = (currentIndex + 1) % statusOrder.length;
          
          return {
            ...tech,
            status: statusOrder[nextIndex]
          };
        }
        return tech;
      })
    );
  };

  console.log('App component is rendering!');
  console.log('Technologies:', technologies);

  return (
    <div className="App">
      <h1>Technology Tracker</h1>
      <ProgressHeader 
        AllCount={technologies.length} 
        FinishedCount={technologies.filter(tech => tech.status === 'completed').length} 
      />
      
      {technologies.map((tech) => (
        <TechnologyCard
          key={tech.id}
          id={tech.id}
          title={tech.title}
          description={tech.description}
          status={tech.status}
          onStatusChange={() => updateTechnologyStatus(tech.id)} // Передаем функцию
        />
      ))}
    </div>
  );
}

export default App;