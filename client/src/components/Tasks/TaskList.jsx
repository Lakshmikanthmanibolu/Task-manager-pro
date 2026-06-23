import TaskCard from './TaskCard';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';

const TaskList = ({ tasks, onToggle, onEdit, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <HiOutlineClipboardDocumentList />
        </div>
        <h3>No tasks found</h3>
        <p>Create your first task to get started, or try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <div key={task._id} style={{ animationDelay: `${index * 50}ms` }}>
          <TaskCard
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
