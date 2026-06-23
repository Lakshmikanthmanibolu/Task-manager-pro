import { NavLink } from 'react-router-dom';
import { useTask } from '../../context/TaskContext';
import { IoGridOutline, IoCheckboxOutline, IoStatsChartOutline } from 'react-icons/io5';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';

const Sidebar = ({ isOpen, onClose }) => {
  const { stats } = useTask();

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <IoCheckboxOutline />
          </div>
          <div className="sidebar-logo-text">
            Task<span>Pro</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <span className="sidebar-section-title">Menu</span>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <IoGridOutline />
            Dashboard
          </NavLink>
          <NavLink
            to="/tasks"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <HiOutlineClipboardDocumentList />
            My Tasks
          </NavLink>
        </nav>

        <div className="sidebar-stats">
          <span className="sidebar-section-title">Overview</span>
          <div className="sidebar-stat-item">
            <span>Total Tasks</span>
            <span className="sidebar-stat-value">{stats.total}</span>
          </div>
          <div className="sidebar-stat-item">
            <span>Completed</span>
            <span className="sidebar-stat-value">{stats.completed}</span>
          </div>
          <div className="sidebar-stat-item">
            <span>Pending</span>
            <span className="sidebar-stat-value">{stats.pending}</span>
          </div>
          <div className="sidebar-stat-item">
            <span>Overdue</span>
            <span className="sidebar-stat-value">{stats.overdue}</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
