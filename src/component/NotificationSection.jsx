import React, { useRef } from "react";

const NotificationSection = ({ notifications, addNotification }) => {
  const notificationEndRef = useRef(null);

  // Scroll to the bottom of the notifications list when a new notification is added
  const scrollToBottom = () => {
    notificationEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Add notification and scroll to bottom
  const handleAddNotification = () => {
    addNotification();
    setTimeout(scrollToBottom, 100); // Ensure scrolling happens after state update
  };

  return (
    <div
      className="col-span-1 bg-white dark:bg-gray-800 rounded-md shadow-md p-4 overflow-auto"
      style={{ height: "500px" }}
    >
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      <button
        onClick={handleAddNotification}
        className="mb-4 px-4 py-2 bg-green-500 dark:bg-green-700 text-white rounded-md shadow-md"
      >
        Add Notification
      </button>
      <ul className="space-y-2">
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className="bg-blue-100 dark:bg-blue-900 p-2 rounded-md shadow-sm"
          >
            <p>{notification.text}</p>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {notification.date.toLocaleString()}
            </span>
          </li>
        ))}
        {/* Invisible div to ensure automatic scroll to the bottom */}
        <div ref={notificationEndRef} />
      </ul>
    </div>
  );
};

export default NotificationSection;
