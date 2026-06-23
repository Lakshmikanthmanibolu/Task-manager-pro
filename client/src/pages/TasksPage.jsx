import { useEffect, useState } from 'react';
import { useTask } from '../context/TaskContext';
import TaskList from '../components/Tasks/TaskList';
import TaskFilters from '../components/Tasks/TaskFilters';
import TaskModal from '../components/Tasks/TaskModal';
import ConfirmDialog from '../components/UI/ConfirmDialog';
import Loader from '../components/UI/Loader';
import { IoAddOutline, IoTrashOutline } from 'react-icons/io5';

const TasksPage = () => {
  const {
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
  } = useTask();

  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, [filter, sort]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSearchChange = (newSearch) => {
    setSearch(newSearch);
    fetchTasks({ search: newSearch });
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
  };

  const handleCreateTask = async (data) => {
    await createTask(data);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleUpdateTask = async (data) => {
    await updateTask(editingTask._id, data);
    setEditingTask(null);
  };

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (taskToDelete) {
      await deleteTask(taskToDelete._id);
      setTaskToDelete(null);
      setShowDeleteConfirm(false);
    }
  };

  const handleClearCompleted = async () => {
    await deleteCompletedTasks();
    setShowClearConfirm(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div>
      <div className="tasks-header">
        <h1>My Tasks</h1>
        <button className="add-task-btn" onClick={() => setShowModal(true)}>
          <IoAddOutline style={{ fontSize: '1.125rem' }} />
          Add Task
        </button>
      </div>

      <TaskFilters
        filter={filter}
        search={search}
        sort={sort}
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
      />

      {completedCount > 0 && (
        <div className="bulk-actions">
          <span className="bulk-actions-text">
            <strong>{completedCount}</strong> completed task{completedCount !== 1 ? 's' : ''}
          </span>
          <button
            className="btn btn-ghost btn-sm"
            style={{ color: 'var(--danger-dark)' }}
            onClick={() => setShowClearConfirm(true)}
          >
            <IoTrashOutline /> Clear Completed
          </button>
        </div>
      )}

      {loading ? (
        <Loader />
      ) : (
        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
          onEdit={handleEditTask}
          onDelete={handleDeleteClick}
        />
      )}

      <TaskModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        task={editingTask}
      />

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete Task"
        message={`Are you sure you want to delete "${taskToDelete?.title}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setShowDeleteConfirm(false);
          setTaskToDelete(null);
        }}
      />

      <ConfirmDialog
        isOpen={showClearConfirm}
        title="Clear Completed Tasks"
        message={`This will permanently delete ${completedCount} completed task${completedCount !== 1 ? 's' : ''}. Are you sure?`}
        onConfirm={handleClearCompleted}
        onCancel={() => setShowClearConfirm(false)}
        confirmText="Clear All"
      />
    </div>
  );
};

export default TasksPage;
