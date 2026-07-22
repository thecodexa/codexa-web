import React from 'react';

const UserAvatar = ({ user, size = 'md' }) => {
  // Size classes
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  // Get first letter of name
  const getInitial = () => {
    if (user?.first_name) {
      return user.first_name.charAt(0).toUpperCase();
    } else if (user?.user_name) {
      return user.user_name.charAt(0).toUpperCase();
    }
    return 'U';
  };

  // Generate a consistent color based on username hash
  const getColorClass = () => {
    const colors = [
      'bg-red-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-cyan-500',
    ];
    const hash = (user?.user_name || 'user').charCodeAt(0);
    return colors[hash % colors.length];
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full flex items-center justify-center overflow-hidden flex-shrink-0`}>
      {user?.profile_picture ? (
        // Show Google profile picture
        <img
          src={user.profile_picture}
          alt={user.first_name || user.user_name}
          className="w-full h-full object-cover"
        />
      ) : (
        // Show first letter avatar
        <div className={`${getColorClass()} w-full h-full flex items-center justify-center text-white font-bold`}>
          {getInitial()}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;