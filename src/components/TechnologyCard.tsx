import './TechnologyCard.css';

interface TechnologyCardProps {
  id: number;
  title: string;
  description: string;
  status: string;
  onStatusChange: () => void; // Добавляем проп для функции изменения статуса
}

function TechnologyCard({ 
  id, 
  title, 
  description, 
  status,
  onStatusChange 
}: TechnologyCardProps) {


  return (
    <div className={`technology-card technology-card--${status}`}>
      <div className="KeyId">ID: {id}</div>
      <div className='technology-name'>{title}</div>
      <div className="description">{description}</div>
      <div 
        className={`btn status status-${status}`} 
        onClick={onStatusChange}
      >
        {status}
      </div>          
    </div>
  );
}

export default TechnologyCard;