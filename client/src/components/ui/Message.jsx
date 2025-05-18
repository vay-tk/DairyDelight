const Message = ({ variant = 'info', children }) => {
  const getBgColor = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'danger':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className={`p-4 mb-4 rounded-md ${getBgColor()}`}>
      {children}
    </div>
  );
};

export default Message;