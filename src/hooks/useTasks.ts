
import { useState, useEffect } from 'react';
import { Task, TaskFilter } from '@/types/task';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/hooks/use-toast';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user]);

  const loadTasks = () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      // Initialize with demo tasks
      const demoTasks: Task[] = [
        {
          id: '1',
          title: 'Welcome to Smart Share Todo!',
          description: 'This is your first task. Click to edit or mark as complete.',
          completed: false,
          priority: 'high',
          dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userId: user?.id || '',
          sharedWith: [],
          tags: ['welcome', 'demo'],
          status: 'todo'
        },
        {
          id: '2',
          title: 'Explore collaboration features',
          description: 'Try sharing tasks with team members for better productivity.',
          completed: false,
          priority: 'medium',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userId: user?.id || '',
          sharedWith: [],
          tags: ['collaboration'],
          status: 'todo'
        }
      ];
      setTasks(demoTasks);
      localStorage.setItem('tasks', JSON.stringify(demoTasks));
    }
    setLoading(false);
  };

  const saveTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: user?.id || '',
    };
    
    const updatedTasks = [newTask, ...tasks];
    saveTasks(updatedTasks);
    
    toast({
      title: "Task created successfully!",
      description: `"${newTask.title}" has been added to your list.`,
    });
    
    return newTask;
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    const updatedTasks = tasks.map(task =>
      task.id === id
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    );
    saveTasks(updatedTasks);
    
    toast({
      title: "Task updated successfully!",
      description: "Your changes have been saved.",
    });
  };

  const deleteTask = (id: string) => {
    const taskToDelete = tasks.find(task => task.id === id);
    const updatedTasks = tasks.filter(task => task.id !== id);
    saveTasks(updatedTasks);
    
    toast({
      title: "Task deleted",
      description: `"${taskToDelete?.title}" has been removed.`,
    });
  };

  const toggleComplete = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      updateTask(id, { 
        completed: !task.completed,
        status: !task.completed ? 'completed' : 'todo'
      });
    }
  };

  const filterTasks = (filter: TaskFilter): Task[] => {
    return tasks.filter(task => {
      if (filter.status === 'active' && task.completed) return false;
      if (filter.status === 'completed' && !task.completed) return false;
      if (filter.status === 'overdue' && (!task.dueDate || new Date(task.dueDate) >= new Date())) return false;
      if (filter.priority !== 'all' && task.priority !== filter.priority) return false;
      if (filter.search && !task.title.toLowerCase().includes(filter.search.toLowerCase())) return false;
      return true;
    });
  };

  return {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    filterTasks,
    refresh: loadTasks
  };
};
