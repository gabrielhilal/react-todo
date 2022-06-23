import { ChangeEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';

import styles from './Main.module.css';
import { Task } from './Task';

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

  function TaskToggle(id: string) {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }

      return task;
    }));
  }

  function deleteTask(id: string) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  const isNewTaskEmpty = newTaskText.length === 0;
  const completedCount = tasks.filter(task => task.isCompleted).length;

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
        <p>Concluídas: <span>{completedCount} de {tasks.length}</span></p>
      </div>

      <div className={styles.taskList}>
        {tasks.map(task => (
          <Task
            key={task.id}
            id={task.id}
            content={task.content}
            isCompleted={task.isCompleted}
            onTaskToggle={TaskToggle}
            onDeleteTask={deleteTask}
          />
        ))}
      </div>
    </main>
  );
}
