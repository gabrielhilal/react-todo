import { ChangeEvent } from 'react';
import styles from './Task.module.css';

interface TaskProps {
  id: string;
  content: string;
  isCompleted: boolean;
  onTaskToggle: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export function Task({ id, content, isCompleted, onTaskToggle, onDeleteTask }:TaskProps) {
  function handleTaskToggle(event: ChangeEvent<HTMLInputElement>) {
    onTaskToggle(id);
  }

  function handleDeleteTask() {
    onDeleteTask(id);
  }

  return (
    <div className={styles.task}>
      <input
        type='checkbox'
        checked={isCompleted}
        onChange={handleTaskToggle}
      />
      <p className={isCompleted ? styles.textDisabled : ''}>{content}</p>
      <button
        className={styles.deleteButton}
        onClick={handleDeleteTask}
      >
        X
      </button>
    </div>
  );
}
