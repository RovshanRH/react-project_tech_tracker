import './TechnologyCard.css';
import WriteIcon from '../assets/svg/write.svg'

interface TechnologyCardProps {
  id: number;
  title: string;
  description: string;
  status: string;
  category: string;
  notes: string;
  onStatusChange: () => void;
  onNotesChange: () => void;
}

function TechnologyCard({ 
  id, 
  title, 
  description, 
  status,
  category,
  // notes,
  onStatusChange,
  onNotesChange
}: TechnologyCardProps) {


  return (
    <div className={`technology-card technology-card--${status}`}>
      <div className="KeyId">ID: {id}</div>
      <div className='technology-name'>{title}</div>
      <div className="description">{description}</div>
      <div className="category"><span style={{fontWeight: 'bold'}}>Category</span>: {category}</div>
      <div 
        className={`btn status status-${status}`} 
        onClick={onStatusChange}
      >
        {status}
      </div>    
      <div className="btn-notes" title='Take Notes' onClick={onNotesChange}>
          <img src={WriteIcon} alt="Notes" width={25} height={25}/>
      </div>      
    </div>
  );
}

export default TechnologyCard;