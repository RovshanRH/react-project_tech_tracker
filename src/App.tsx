import './App.css';
import Greeting from './Greeting';
import UserCard from './UserCard';
import TaskList from './TaskList';

function App() {
  return (
    <div className="App">
      <Greeting />
      <UserCard 
        name='ROVIAN'
        role='Frontend Developer'
        avatarUrl='https://avatars.githubusercontent.com/u/9919?s=280&v=4'
        isOnline={true}
      />
      <TaskList />
    </div>
  );
}
export default App;