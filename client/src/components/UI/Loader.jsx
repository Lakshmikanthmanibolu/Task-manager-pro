const Loader = ({ size = 'md', text = '' }) => {
  if (text) {
    return (
      <div className="loader-inline">
        <div className={`loader loader-${size === 'sm' ? 'sm' : ''}`}></div>
        <span>{text}</span>
      </div>
    );
  }

  return (
    <div className="loader-container">
      <div className={`loader ${size === 'sm' ? 'loader-sm' : ''}`}></div>
    </div>
  );
};

export default Loader;
