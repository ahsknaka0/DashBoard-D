import React, { useState } from "react";
import { FaRobot, FaBookOpen } from "react-icons/fa";

const FloatingButtons = () => {
  const [showFact, setShowFact] = useState(false);

  const handleChatClick = () => {
    alert("Chat/AI Assistant feature coming soon!");
  };

  const handleFactClick = () => {
    setShowFact((prev) => !prev);
  };

  return (
    <div className="fixed bottom-8 right-8 flex flex-col space-y-4 z-50">
      {/* Chat/AI Assistant Button */}
      <button
        onClick={handleChatClick}
        className="w-16 h-16 bg-blue-500 text-white rounded-full shadow-lg flex justify-center items-center hover:bg-blue-600 transition duration-200"
        title="Chat/AI Assistant"
      >
        <FaRobot size={24} />
      </button>

      {/* Historical Facts Button */}
      <button
        onClick={handleFactClick}
        className="w-16 h-16 bg-green-500 text-white rounded-full shadow-lg flex justify-center items-center hover:bg-green-600 transition duration-200"
        title="Historical Facts"
      >
        <FaBookOpen size={24} />
      </button>

      {/* Fact Display */}
      {showFact && (
        <div className=" border-2 border-lime-800 absolute bottom-20 right-20 w-64 bg-slate-400 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold">Did You Know?</h3>
          <p className="text-sm mt-2">
            G. L. Bajaj College, established in 2005, is one of the leading
            educational institutions in India, known for its academic excellence
            and state-of-the-art infrastructure.
          </p>
        </div>
      )}
    </div>
  );
};

export default FloatingButtons;
