import { ChangeEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';

import styles from './Main.module.css';

export function Main() {
  interface taskProps {
    id: string;
    content: string;
    isCompleted: boolean;
  }

  const [newTaskText, setNewTaskText] = useState('');
  const [tasks, setTasks] = useState<taskProps[]>([]);

  function handleNewTaskTextChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value);
}

  function handleCreateNewTask(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    setNewTaskText('');
    setTasks([
      ...tasks,
      {
        id: uuid(),
        content: newTaskText,
        isCompleted: false,
      }
    ]);
  }

  const isNewTaskEmpty = newTaskText.length === 0;

  return (
    <main>
      <form onSubmit={handleCreateNewTask} className={styles.taskForm}>
        <input
          placeholder="Adicione uma nova tarefa"
          onChange={handleNewTaskTextChange}
          value={newTaskText}
          name="task"
        />

        <button
          type="submit"
          disabled={isNewTaskEmpty}
        >
          Criar
        </button>
      </form>

      <div className={styles.tasksSummary}>
        <p>Tarefas criadas: <span>{tasks.length}</span></p>
        <p>Concluídas: <span>? de {tasks.length}</span></p>
      </div>

      {tasks.map(task => (
        <p key={task.id}>{task.content}</p>
      ))}
    </main>
  );
}
