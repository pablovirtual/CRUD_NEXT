export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface TaskInput {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
}
