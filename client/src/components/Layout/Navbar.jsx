import { useAuth } from '../../context/AuthContext';
import { useTask } from '../../context/TaskContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoGridOutline, IoCheckboxOutline, IoLogOutOutline } from 'react-icons/io5';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';

const Navbar = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-toggle" onClick={onMenuToggle}>
          <HiOutlineClipboardDocumentList />
        </button>
        <span className="navbar-title">
          {useLocation().pathname === '/dashboard' ? 'Dashboard' : 'My Tasks'}
        </span>
      </div>
      <div className="navbar-right">
        <div className="navbar-user">
          <div className="navbar-avatar">{user ? getInitials(user.name) : 'U'}</div>
          <span className="navbar-username">{user?.name}</span>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <IoLogOutOutline />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
