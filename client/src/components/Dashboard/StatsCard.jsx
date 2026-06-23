import { IoLayersOutline, IoCheckmarkCircleOutline, IoTimeOutline, IoAlertCircleOutline } from 'react-icons/io5';

const iconMap = {
  total: IoLayersOutline,
  completed: IoCheckmarkCircleOutline,
  pending: IoTimeOutline,
  overdue: IoAlertCircleOutline,
};

const StatsCard = ({ type, value, label }) => {
  const Icon = iconMap[type] || IoLayersOutline;

  return (
    <div className="stat-card">
      <div className={`stat-icon ${type}`}>
        <Icon />
      </div>
      <div className="stat-info">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
};

export default StatsCard;
