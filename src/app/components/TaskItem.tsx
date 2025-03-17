import React from 'react';
import { Task } from '../types';

interface TaskProps extends Task {
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onToggleComplete: (id: number, completed: boolean) => void;
}

const TaskItem: React.FC<TaskProps> = ({ 
  id, 
  title, 
  description, 
  completed, 
  onDelete, 
  onEdit,
  onToggleComplete 
}) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title">
            {title}
          </h5>
          <div className="form-check form-switch">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id={`complete-${id}`} 
              checked={completed}
              onChange={() => onToggleComplete(id, !completed)}
            />
            <label className="form-check-label" htmlFor={`complete-${id}`}>
              {completed ? 'Completada' : 'Pendiente'}
            </label>
          </div>
        </div>
        <p className="card-text">{description}</p>
        <div className="d-flex justify-content-end">
          <button 
            className="btn btn-primary me-2"
            onClick={() => onEdit(id)}
          >
            Editar
          </button>
          <button 
            className="btn btn-danger"
            onClick={() => onDelete(id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
