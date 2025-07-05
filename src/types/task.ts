
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  sharedWith: string[];
  tags: string[];
  status: 'todo' | 'in-progress' | 'completed';
}

export interface TaskFilter {
  status?: 'all' | 'active' | 'completed' | 'overdue';
  priority?: 'all' | 'low' | 'medium' | 'high';
  shared?: boolean;
  search?: string;
}
