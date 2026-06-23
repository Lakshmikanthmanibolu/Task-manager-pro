import { createContext, useContext, useState, useCallback } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';

const TaskContext = createContext(null);

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, overdue: 0 });
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');

  const fetchTasks = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      const currentFilter = params.status || filter;
      const currentSearch = params.search !== undefined ? params.search : search;
      const currentSort = params.sort || sort;

      if (currentFilter !== 'all') queryParams.append('status', currentFilter);
      if (currentSearch) queryParams.append('search', currentSearch);
      if (currentSort) queryParams.append('sort', currentSort);

      const res = await API.get(`/tasks?${queryParams.toString()}`);
      setTasks(res.data.tasks);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [filter, search, sort]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await API.get('/tasks/stats');
      setStats(res.data.stats);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  }, []);

  const createTask = async (taskData) => {
    try {
      const res = await API.post('/tasks', taskData);
      toast.success('Task created successfully!');
      await fetchTasks();
      await fetchStats();
      return res.data.task;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
      throw error;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const res = await API.put(`/tasks/${id}`, taskData);
      toast.success('Task updated successfully!');
      await fetchTasks();
      await fetchStats();
      return res.data.task;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task');
      throw error;
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      toast.success('Task deleted successfully!');
      await fetchTasks();
      await fetchStats();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete task');
      throw error;
    }
  };

  const toggleTask = async (id) => {
    try {
      const res = await API.patch(`/tasks/${id}/toggle`);
      toast.success(res.data.message);
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? res.data.task : t))
      );
      await fetchStats();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to toggle task');
      throw error;
    }
  };

  const deleteCompletedTasks = async () => {
    try {
      const res = await API.delete('/tasks/completed');
      toast.success(res.data.message);
      await fetchTasks();
      await fetchStats();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete completed tasks');
      throw error;
    }
  };

  const value = {
    tasks,
    stats,
    loading,
    filter,
    search,
    sort,
    setFilter,
    setSearch,
    setSort,
    fetchTasks,
    fetchStats,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
    deleteCompletedTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TaskContext;
