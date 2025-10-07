function BehaviorScores({ scores, meta, onChange }) {
  return (
    <div className="behavior-scores">
      <h3>Notas comportamentais</h3>
      <p className="helper">
        Utilize as notas comportamentais para registrar aspectos socioemocionais importantes para o
        desenvolvimento profissional.
      </p>
      <ul>
        {meta.map((item, index) => (
          <li key={item.id}>
            <label>
              {item.title}
              <input
                type="number"
                inputMode="decimal"
                step="0.1"
                min="0"
                max="100"
                value={scores[index]}
                onChange={(event) => onChange(index, event.target.value)}
              />
            </label>
            <span className="helper small">{item.helper}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BehaviorScores;
