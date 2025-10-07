function formatNumber(value) {
  if (value === null || Number.isNaN(value)) return '—';
  return Number.parseFloat(value).toFixed(2).replace('.', ',');
}

function ActivityGroup({
  title,
  helper,
  scores,
  onAdd,
  onRemove,
  onChange,
}) {
  const average = scores.length
    ? scores
        .map((score) => Number.parseFloat(score))
        .filter((score) => Number.isFinite(score))
        .reduce((acc, score) => acc + score, 0) / scores.length
    : null;

  return (
    <div className="activity-group">
      <header>
        <h4>{title}</h4>
        <span className="badge">Média: {formatNumber(average)}</span>
      </header>
      <p className="helper">{helper}</p>
      <ul>
        {scores.length === 0 ? (
          <li className="empty">Nenhuma atividade cadastrada.</li>
        ) : (
          scores.map((value, index) => (
            <li key={index}>
              <label>
                Atividade {index + 1}
                <input
                  type="number"
                  inputMode="decimal"
                  step="0.1"
                  min="0"
                  max="100"
                  value={value}
                  onChange={(event) => onChange(index, event.target.value)}
                />
              </label>
              <button type="button" className="ghost" onClick={() => onRemove(index)}>
                Remover
              </button>
            </li>
          ))
        )}
      </ul>
      <button type="button" onClick={onAdd}>
        Adicionar atividade
      </button>
    </div>
  );
}

export default ActivityGroup;
