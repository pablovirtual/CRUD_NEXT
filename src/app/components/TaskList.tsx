import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../types';

/**
 * Props para el componente TaskList
 * @property {Task[]} tasks - Array de tareas a mostrar
 * @property {Function} onDelete - Función para eliminar una tarea
 * @property {Function} onEdit - Función para editar una tarea
 * @property {Function} onToggleComplete - Función para cambiar el estado de completado de una tarea
 */
interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onToggleComplete: (id: number, completed: boolean) => void;
}

/**
 * Componente que muestra una lista de tareas
 * 
 * Renderiza una colección de componentes TaskItem o muestra un mensaje
 * cuando no hay tareas disponibles.
 * 
 * @param {TaskListProps} props - Propiedades del componente
 * @returns {JSX.Element} Lista de tareas o mensaje informativo
 */
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