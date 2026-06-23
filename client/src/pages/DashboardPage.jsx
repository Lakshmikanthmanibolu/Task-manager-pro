import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTask } from '../context/TaskContext';
import StatsCard from '../components/Dashboard/StatsCard';
import TaskCard from '../components/Tasks/TaskCard';
import TaskModal from '../components/Tasks/TaskModal';
import Loader from '../components/UI/Loader';
import { IoAddOutline, IoArrowForwardOutline } from 'react-icons/io5';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';

const DashboardPage = () => {
  const { user } = useAuth();
  const { tasks, stats, loading, fetchTasks, fetchStats, createTask, toggleTask, updateTask, deleteTask } = useTask();
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks({ sort: 'newest' });
    fetchStats();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleCreateTask = async (data) => {
    await createTask(data);
    setShowModal(false);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleUpdateTask = async (data) => {
    await updateTask(editingTask._id, data);
    setEditingTask(null);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  const recentTasks = tasks.slice(0, 5);

  return (
    <div>
      <div className="dashboard-header">
        <p className="dashboard-greeting">{getGreeting()},</p>
        <h1 className="dashboard-title">{user?.name || 'User'} 👋</h1>
      </div>

      <div className="stats-grid">
        <StatsCard type="total" value={stats.total} label="Total Tasks" />
        <StatsCard type="completed" value={stats.completed} label="Completed" />
        <StatsCard type="pending" value={stats.pending} label="Pending" />
        <StatsCard type="overdue" value={stats.overdue} label="Overdue" />
      </div>

      <div className="recent-section">
        <div className="recent-header">
          <h2>Recent Tasks</h2>
          <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
            <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
              <IoAddOutline /> New Task
            </button>
            <button className="view-all-link" onClick={() => navigate('/tasks')}>
              View All <IoArrowForwardOutline style={{ verticalAlign: 'middle' }} />
            </button>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : recentTasks.length > 0 ? (
          <div className="task-list">
            {recentTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onToggle={toggleTask}
                onEdit={handleEditTask}
                onDelete={async (t) => await deleteTask(t._id)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">
              <HiOutlineClipboardDocumentList />
            </div>
            <h3>No tasks yet</h3>
            <p>Create your first task to start being productive!</p>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              <IoAddOutline /> Create Your First Task
            </button>
          </div>
        )}
      </div>

      <TaskModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        task={editingTask}
      />
    </div>
  );
};

export default DashboardPage;
