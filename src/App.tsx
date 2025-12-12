import './App.css';
import TechnologyCard from "./components/TechnologyCard.tsx";
import ProgressHeader from "./components/ProgressHeader.tsx";

function App() {
  const technologies = [
    {
      id: 1, title: 'React Components', description: 'Изучение базовых компонентов',
      status: 'completed'
    },
    {
      id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status:
        'in-progress'
    },
    {
      id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'not-started' }
    ];
  return (

    <div className="App">
      <h1>Technology Tracker</h1>
      <ProgressHeader AllCount={technologies.length} FinishedCount={technologies.filter(tech => tech.status === 'completed').length} />
      
      {technologies.map((tech) => (
        <TechnologyCard
          key={tech.id}
          title={tech.title}
          description={tech.description}
          status={tech.status}
        />
      ))}
    </div>
  );
}
export default App;