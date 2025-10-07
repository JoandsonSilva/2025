import ActivityGroup from './ActivityGroup.jsx';
import BehaviorScores from './BehaviorScores.jsx';

function parseScore(value) {
  if (value === '' || value === null || value === undefined) return null;
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function average(values) {
  if (!values.length) return null;
  const total = values.reduce((acc, value) => acc + value, 0);
  return total / values.length;
}

function formatNumber(value) {
  if (value === null || Number.isNaN(value)) return '—';
  return value.toFixed(2).replace('.', ',');
}

function StudentPanel({
  student,
  activitiesMeta,
  behaviorMeta,
  onRemove,
  onAddActivity,
  onRemoveActivity,
  onUpdateActivity,
  onUpdateBehavior,
}) {
  const activityAverages = student.activityGroups.map((group) => {
    const numericValues = group
      .map(parseScore)
      .filter((value) => value !== null);
    return average(numericValues);
  });

  const behaviorValues = student.behaviorScores.map(parseScore);

  const finalComponents = [
    ...activityAverages.filter((value) => value !== null),
    ...behaviorValues.filter((value) => value !== null),
  ];

  const finalAverage = average(finalComponents);

  return (
    <article className="student-panel">
      <header className="panel-header">
        <div>
          <h2>{student.name}</h2>
          <p className="helper">Gerencie as notas individuais de atividades e o acompanhamento comportamental.</p>
        </div>
        <div className="summary">
          <span>
            Média final:
            <strong>{formatNumber(finalAverage)}</strong>
          </span>
          <button type="button" className="danger" onClick={onRemove}>
            Remover aluno
          </button>
        </div>
      </header>

      <section className="activities">
        <h3>Notas de atividades (média composta)</h3>
        <div className="activity-columns">
          {activitiesMeta.map((meta, index) => (
            <ActivityGroup
              key={meta.id}
              title={meta.title}
              helper={meta.helper}
              scores={student.activityGroups[index]}
              onAdd={() => onAddActivity(index)}
              onRemove={(activityIndex) => onRemoveActivity(index, activityIndex)}
              onChange={(activityIndex, value) => onUpdateActivity(index, activityIndex, value)}
            />
          ))}
        </div>
      </section>

      <BehaviorScores
        scores={student.behaviorScores}
        meta={behaviorMeta}
        onChange={(behaviorIndex, value) => onUpdateBehavior(behaviorIndex, value)}
      />
    </article>
  );
}

export default StudentPanel;
