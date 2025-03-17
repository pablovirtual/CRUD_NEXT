import React, { useState, useEffect } from 'react';
import { Task, TaskInput } from '../types';

interface TaskFormProps {
  onSubmit: (task: TaskInput) => void;
  initialTask?: Task;
  isEditing: boolean;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ 
  onSubmit, 
  initialTask, 
  isEditing,
  onCancel 
}) => {
  const [task, setTask] = useState<TaskInput>({
    title: '',
    description: '',
    completed: false
  });

  useEffect(() => {
    if (initialTask) {
      setTask(initialTask);
    }
  }, [initialTask]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setTask(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(task);
    if (!isEditing) {
      setTask({
        title: '',
        description: '',
        completed: false
      });
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{isEditing ? 'Editar Tarea' : 'Crear Nueva Tarea'}</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Título</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={task.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Descripción</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={task.description}
              onChange={handleChange}
              required
            />
          </div>
          {isEditing && (
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="completed"
                name="completed"
                checked={task.completed}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="completed">Completada</label>
            </div>
          )}
          <div className="d-flex justify-content-end">
            {isEditing && (
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={onCancel}
              >
                Cancelar
              </button>
            )}
            <button type="submit" className="btn btn-primary">
              {isEditing ? 'Guardar Cambios' : 'Crear Tarea'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;