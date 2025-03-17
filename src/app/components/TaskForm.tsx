import React, { useState, useEffect } from 'react';
import { Task, TaskInput } from '../types';

/**
 * Props para el componente TaskForm
 * @property {Function} onSubmit - Función que maneja el envío del formulario
 * @property {Task} [initialTask] - Tarea inicial para edición (opcional)
 * @property {boolean} isEditing - Indica si se está editando una tarea existente
 * @property {Function} onCancel - Función que maneja la cancelación de la edición
 */
interface TaskFormProps {
  onSubmit: (task: TaskInput) => void;
  initialTask?: Task;
  isEditing: boolean;
  onCancel: () => void;
}

/**
 * Componente de formulario para crear y editar tareas
 * 
 * Este componente proporciona un formulario que permite al usuario:
 * - Crear nuevas tareas
 * - Editar tareas existentes
 * - Cancelar la edición de una tarea
 * 
 * Se adapta automáticamente según si se está creando o editando una tarea.
 * 
 * @param {TaskFormProps} props - Propiedades del componente
 * @returns {JSX.Element} Formulario para crear o editar tareas
 */
const TaskForm: React.FC<TaskFormProps> = ({ 
  onSubmit, 
  initialTask, 
  isEditing,
  onCancel 
}) => {
  /**
   * Estado del formulario que contiene los datos de la tarea
   */
  const [task, setTask] = useState<TaskInput>({
    title: '',
    description: '',
    completed: false
  });

  /**
   * Efecto que actualiza el estado del formulario cuando se proporciona una tarea inicial
   */
  useEffect(() => {
    if (initialTask) {
      setTask(initialTask);
    }
  }, [initialTask]);

  /**
   * Maneja los cambios en los campos de texto
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - Evento de cambio
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Maneja los cambios en el campo de checkbox
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de cambio del checkbox
   */
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setTask(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  /**
   * Maneja el envío del formulario
   * @param {React.FormEvent} e - Evento de envío del formulario
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(task);
    if (!isEditing) {
      // Reiniciar el formulario solo si estamos creando una nueva tarea
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