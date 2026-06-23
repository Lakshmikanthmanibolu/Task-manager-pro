import { IoCheckmarkSharp, IoCalendarOutline, IoCreateOutline, IoTrashOutline } from 'react-icons/io5';

const TaskCard = ({ task, onToggle, onEdit, onDelete }) => {
  const priorityClass = `priority-${task.priority.toLowerCase()}`;
  const isOverdue =
    task.dueDate && !task.completed && new Date(task.dueDate) < new Date();

  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const now = new Date();
    const diffDays = Math.ceil((d - now) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays < -1) return `${Math.abs(diffDays)} days ago`;
    if (diffDays <= 7) return `In ${diffDays} days`;

    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  };

  return (
    <div className={`task-card ${priorityClass} ${task.completed ? 'completed' : ''}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          id={`task-${task._id}`}
          checked={task.completed}
          onChange={() => onToggle(task._id)}
        />
        <label htmlFor={`task-${task._id}`}>
          {task.completed && <IoCheckmarkSharp />}
        </label>
      </div>

      <div className="task-body">
        <div className="task-title">{task.title}</div>
        {task.description && (
          <div className="task-description">{task.description}</div>
        )}
        <div className="task-meta">
          <span className={`badge badge-${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
          {task.completed && (
            <span className="badge badge-completed">Completed</span>
          )}
          {!task.completed && (
            <span className="badge badge-pending">Pending</span>
          )}
          {task.dueDate && (
            <span className={`task-due ${isOverdue ? 'overdue' : ''}`}>
              <IoCalendarOutline />
              {formatDate(task.dueDate)}
            </span>
          )}
        </div>
      </div>

      <div className="task-actions">
        <button
          className="task-action-btn"
          onClick={() => onEdit(task)}
          title="Edit task"
        >
          <IoCreateOutline />
        </button>
        <button
          className="task-action-btn delete"
          onClick={() => onDelete(task)}
          title="Delete task"
        >
          <IoTrashOutline />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
