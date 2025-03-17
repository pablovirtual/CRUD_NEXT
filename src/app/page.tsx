'use client';

/**
 * Aplicación CRUD de gestión de tareas
 * Este componente es la página principal que gestiona el estado y las operaciones
 * de la aplicación de tareas, incluyendo crear, leer, actualizar y eliminar tareas.
 */

import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { Task, TaskInput } from './types';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  /**
   * Obtiene todas las tareas del servidor
   */
  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/tasks');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las tareas. Por favor, intenta de nuevo más tarde.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  /**
   * Crea una nueva tarea
   * @param newTask - Datos de la nueva tarea a crear
   */
  const handleCreateTask = async (newTask: TaskInput) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      const createdTask = await response.json();
      setTasks(prev => [...prev, createdTask]);
    } catch (err) {
      setError('Error al crear la tarea. Por favor, intenta de nuevo.');
      console.error(err);
    }
  };

  /**
   * Actualiza una tarea existente
   * @param updatedTask - Tarea con los datos actualizados
   */
  const handleUpdateTask = async (updatedTask: Task) => {
    try {
      const response = await fetch(`/api/tasks/${updatedTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const result = await response.json();
      setTasks(prev => prev.map(task => 
        task.id === result.id ? result : task
      ));
      setEditingTask(null);
    } catch (err) {
      setError('Error al actualizar la tarea. Por favor, intenta de nuevo.');
      console.error(err);
    }
  };

  /**
   * Elimina una tarea
   * @param id - Identificador de la tarea a eliminar
   */
  const handleDeleteTask = async (id: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      setError('Error al eliminar la tarea. Por favor, intenta de nuevo.');
      console.error(err);
    }
  };

  /**
   * Cambia el estado de completado de una tarea
   * @param id - Identificador de la tarea
   * @param completed - Nuevo estado de completado
   */
  const handleToggleComplete = async (id: number, completed: boolean) => {
    const taskToUpdate = tasks.find(task => task.id === id);
    if (!taskToUpdate) return;

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...taskToUpdate,
          completed,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const result = await response.json();
      setTasks(prev => prev.map(task => 
        task.id === result.id ? result : task
      ));
    } catch (err) {
      setError('Error al actualizar el estado de la tarea. Por favor, intenta de nuevo.');
      console.error(err);
    }
  };

  /**
   * Prepara una tarea para edición
   * @param id - Identificador de la tarea a editar
   */
  const handleEditClick = (id: number) => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setEditingTask(taskToEdit);
    }
  };

  /**
   * Cancela la edición de una tarea
   */
  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  /**
   * Gestiona el envío del formulario, determinando si es una creación o actualización
   * @param task - Datos de la tarea a crear o actualizar
   */
  const handleSubmit = (task: TaskInput) => {
    if (editingTask) {
      handleUpdateTask(task as Task);
    } else {
      handleCreateTask(task);
    }
  };

  return (
    <main className="container py-5">
      <h1 className="mb-4 text-center">Gestión de Tareas</h1>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
          <button 
            type="button" 
            className="btn-close float-end" 
            onClick={() => setError(null)}
            aria-label="Close"
          ></button>
        </div>
      )}
      
      <TaskForm 
        onSubmit={handleSubmit} 
        initialTask={editingTask || undefined}
        isEditing={!!editingTask}
        onCancel={handleCancelEdit}
      />
      
      <h2 className="mb-3">Mis Tareas</h2>
      
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <TaskList 
          tasks={tasks} 
          onDelete={handleDeleteTask} 
          onEdit={handleEditClick}
          onToggleComplete={handleToggleComplete}
        />
      )}
    </main>
  );
}