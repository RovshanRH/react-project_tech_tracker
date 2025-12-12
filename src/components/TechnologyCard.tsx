import './TechnologyCard.css'

function TechnologyCard(props: {key: number; title: string; description: string, status: string}) {

    return (
        <div className="technology-card">
            <div className="KeyId">{props.key}</div>
            <div className='technology-name'>{props.title}</div>
            <div className="description">{props.description}</div>
            <div className={`status status-${props.status}`}>{props.status}</div>          
        </div>
    )
}

export default TechnologyCard;