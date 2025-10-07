import { useState } from 'react';

function StudentForm({ onAddStudent }) {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onAddStudent(trimmed);
    setName('');
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h2>Novo aluno</h2>
      <label htmlFor="studentName">Nome completo</label>
      <input
        id="studentName"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Ex.: Maria Silva"
        required
      />
      <p className="helper">
        Você pode editar as notas depois de criar o registro. Utilize um nome único para facilitar a busca.
      </p>
      <button type="submit">Adicionar aluno</button>
    </form>
  );
}

export default StudentForm;
