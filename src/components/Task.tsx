import { ChangeEvent } from 'react';
import styles from './Task.module.css';

interface TaskProps {
  id: string;
  content: string;
  isCompleted: boolean;
  onTaskToggle: (id: string) => void;
}

export function Task({ id, content, isCompleted, onTaskToggle }:TaskProps) {
  function handleTaskToggle(event: ChangeEvent<HTMLInputElement>) {
    onTaskToggle(id);
  }

  return (
    <div className={styles.task}>
      <input
        type='checkbox'
        checked={isCompleted}
        onChange={handleTaskToggle}
      />
      <p className={isCompleted ? styles.textDisabled : ''}>{content}</p>
    </div>
  );
}
