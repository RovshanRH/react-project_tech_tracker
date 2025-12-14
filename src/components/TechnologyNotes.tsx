function TechnologyNotes(
  notes: string,
  onNotesChange: (techId: string, value: string) => void,
  techId: string
) {
  return (
    <div className="notes-section">
      <h4>Мои заметки:</h4>
      <textarea
        value={notes}
        onChange={(e) => onNotesChange(techId, e.target.value)}
        placeholder="Записывайте сюда важные моменты..."
        rows={3}
      />
      <div className="notes-hint">
        {notes.length > 0
          ? `Заметка сохранена (${notes.length} символов)`
          : "Добавьте заметку"}
      </div>
    </div>
  );
}

export default TechnologyNotes;