/**
 * Interfaz que representa una tarea completa con todos sus atributos.
 * @property {number} id - Identificador único de la tarea
 * @property {string} title - Título de la tarea
 * @property {string} description - Descripción detallada de la tarea
 * @property {boolean} completed - Estado de la tarea (completada o pendiente)
 */
export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

/**
 * Interfaz utilizada para la creación o actualización de tareas.
 * El id es opcional para permitir la creación de nuevas tareas.
 * @property {number} [id] - Identificador único de la tarea (opcional)
 * @property {string} title - Título de la tarea
 * @property {string} description - Descripción detallada de la tarea
 * @property {boolean} completed - Estado de la tarea (completada o pendiente)
 */
export interface TaskInput {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
}
