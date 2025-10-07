import { useMemo, useState } from 'react';
import StudentForm from './components/StudentForm.jsx';
import StudentPanel from './components/StudentPanel.jsx';

const ACTIVITY_GROUPS = [
  {
    id: 'atividade1',
    title: 'Nota de Atividades 1',
    helper: 'Adicione quantas atividades forem necessárias para compor a primeira nota.',
  },
  {
    id: 'atividade2',
    title: 'Nota de Atividades 2',
    helper: 'Cadastre tarefas, provas ou trabalhos que compõem a segunda nota.',
  },
  {
    id: 'atividade3',
    title: 'Nota de Atividades 3',
    helper: 'Utilize para avaliações finais, projetos ou desafios extras.',
  },
];

const BEHAVIOR_LABELS = [
  {
    id: 'participacao',
    title: 'Participação',
    helper: 'Avalie o quanto o aluno contribui nas aulas e atividades coletivas.',
  },
  {
    id: 'disciplina',
    title: 'Disciplina',
    helper: 'Pontualidade, cumprimento de prazos e respeito às regras.',
  },
  {
    id: 'colaboracao',
    title: 'Colaboração',
    helper: 'Capacidade de trabalhar em equipe e ajudar colegas.',
  },
];

function App() {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState('');

  const filteredStudents = useMemo(() => {
    const term = filter.trim().toLowerCase();
    if (!term) return students;
    return students.filter((student) => student.name.toLowerCase().includes(term));
  }, [filter, students]);

  const addStudent = (name) => {
    setStudents((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        name,
        activityGroups: ACTIVITY_GROUPS.map(() => []),
        behaviorScores: BEHAVIOR_LABELS.map(() => ''),
      },
    ]);
  };

  const removeStudent = (id) => {
    setStudents((current) => current.filter((student) => student.id !== id));
  };

  const updateActivity = (id, groupIndex, activityIndex, value) => {
    setStudents((current) =>
      current.map((student) => {
        if (student.id !== id) return student;
        const nextGroups = student.activityGroups.map((group, index) => {
          if (index !== groupIndex) return group;
          const updatedGroup = [...group];
          updatedGroup[activityIndex] = value;
          return updatedGroup;
        });
        return { ...student, activityGroups: nextGroups };
      }),
    );
  };

  const addActivity = (id, groupIndex) => {
    setStudents((current) =>
      current.map((student) => {
        if (student.id !== id) return student;
        const nextGroups = student.activityGroups.map((group, index) =>
          index === groupIndex ? [...group, ''] : group,
        );
        return { ...student, activityGroups: nextGroups };
      }),
    );
  };

  const removeActivity = (id, groupIndex, activityIndex) => {
    setStudents((current) =>
      current.map((student) => {
        if (student.id !== id) return student;
        const nextGroups = student.activityGroups.map((group, index) => {
          if (index !== groupIndex) return group;
          return group.filter((_, idx) => idx !== activityIndex);
        });
        return { ...student, activityGroups: nextGroups };
      }),
    );
  };

  const updateBehavior = (id, behaviorIndex, value) => {
    setStudents((current) =>
      current.map((student) => {
        if (student.id !== id) return student;
        const nextBehavior = student.behaviorScores.map((score, index) =>
          index === behaviorIndex ? value : score,
        );
        return { ...student, behaviorScores: nextBehavior };
      }),
    );
  };

  return (
    <div className="app-shell">
      <header>
        <h1>Avaliação do Curso Técnico em Desenvolvimento Web</h1>
        <p>
          Cadastre estudantes, gerencie notas de atividades compostas por múltiplas entregas e acompanhe
          indicadores comportamentais para construir uma avaliação completa.
        </p>
      </header>

      <section className="actions">
        <StudentForm onAddStudent={addStudent} />
        <div className="filter">
          <label htmlFor="filter">Filtrar alunos</label>
          <input
            id="filter"
            type="search"
            placeholder="Digite um nome para filtrar"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          />
        </div>
      </section>

      <main>
        {filteredStudents.length === 0 ? (
          <div className="empty-state">
            <h2>Nenhum aluno cadastrado</h2>
            <p>Adicione estudantes para começar a acompanhar a evolução da turma.</p>
          </div>
        ) : (
          <div className="student-grid">
            {filteredStudents.map((student) => (
              <StudentPanel
                key={student.id}
                student={student}
                activitiesMeta={ACTIVITY_GROUPS}
                behaviorMeta={BEHAVIOR_LABELS}
                onRemove={() => removeStudent(student.id)}
                onAddActivity={(groupIndex) => addActivity(student.id, groupIndex)}
                onRemoveActivity={(groupIndex, activityIndex) =>
                  removeActivity(student.id, groupIndex, activityIndex)
                }
                onUpdateActivity={(groupIndex, activityIndex, value) =>
                  updateActivity(student.id, groupIndex, activityIndex, value)
                }
                onUpdateBehavior={(behaviorIndex, value) =>
                  updateBehavior(student.id, behaviorIndex, value)
                }
              />
            ))}
          </div>
        )}
      </main>

      <footer>
        <small>
          Dica: utilize escalas consistentes (0-10, 0-100, percentual) para facilitar a comparação entre as
          avaliações acadêmicas e comportamentais.
        </small>
      </footer>
    </div>
  );
}

export default App;
