import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onToggleComplete: (id: number, completed: boolean) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onDelete, 
  onEdit, 
  onToggleComplete 
}) => {
  if (tasks.length === 0) {
    return (
      <div className="alert alert-info">
        No hay tareas disponibles. ¡Crea una nueva tarea!
      </div>
    );
  }

  return (
    <div>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          completed={task.completed}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
};

export default TaskList;