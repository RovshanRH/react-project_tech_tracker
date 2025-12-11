function UserCard(props: { name: string; role: string, avatarUrl: string, isOnline: boolean }) {
    return (
        <div className="user-card">
            {/* Секция с аватаром */}
            <div className="avatar-section">
                {/* Отображаем изображение аватара */}
                <img src={props.avatarUrl} alt={`Аватар ${props.name}`} />
                {/* Условный рендеринг: если isOnline === true, показываем 'online', иначе
    'offline' */}
                <p>Статус: {props.isOnline ? 'online' : 'offline'}</p>
            </div>
            {/* Секция с информацией о пользователе */}
            <div className="user-info">
                <h3>{props.name}</h3>
                <p>{props.role}</p>
            </div>
        </div>
    );
}
export default UserCard;
