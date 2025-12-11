function Greeting() {
  const userName = "Rovshan";

  const currentHour = new Date().getHours();
  const timeOfDay =
    currentHour < 12
      ? "Доброе утро"
      : currentHour < 18
      ? "Добрый день"
      : "Добрый вечер";
  return (
    <div className="greeting">
      <h1>
        {timeOfDay}, {userName}!
      </h1>
      <p>Рады видеть вас в нашем приложении.</p>
    </div>
  );
}
export default Greeting;
