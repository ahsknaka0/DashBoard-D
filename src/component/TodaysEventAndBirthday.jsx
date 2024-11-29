import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Modal Component (Ensure it's styled correctly)
const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-sm sm:max-w-md md:max-w-3xl lg:max-w-6xl xl:max-w-7xl w-full max-h-[500px] overflow-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 p-2"
        >
          {/* SVG Close Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

const TodaysEventAndBirthday = ({ isOpen, onClose }) => {
  const [birthdays, setBirthdays] = useState([
    { id: 1, name: 'John Doe', wished: false },
    { id: 2, name: 'Jane Smith', wished: false },
    { id: 3, name: 'Zack', wished: false },
    { id: 4, name: 'Tom Smith', wished: false },
    { id: 5, name: 'Marcus Jade', wished: false },
    { id: 6, name: 'Gigi', wished: false },
  ]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [customWish, setCustomWish] = useState('');
  const [randomWish, setRandomWish] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  // Pre-generated birthday wishes
  const preGeneratedWishes = [
    'Wishing you a day filled with happiness and a year filled with joy!',
    'Happy Birthday! May your day be as amazing as you are!',
    'Here’s to another year of laughter, joy, and adventure!',
    'May this year bring you lots of love and success. Happy Birthday!',
    'Wishing you all the best today and always. Happy Birthday!',
  ];

  // Today's events constant
  const todaysEvents = [
    'Team meeting at 10 AM',
    'Code review at 2 PM',
    'Workshop on React at 4 PM',
    'Networking event at 6 PM',
    'Company party at 8 PM',
  ];

  const toggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const sendWish = (isCustom) => {
    if (selectedIds.length === 0) {
      toast.warn('Please select at least one person!');
      return;
    }

    const wishText = isCustom ? customWish : randomWish;
    const updatedBirthdays = birthdays.map((person) =>
      selectedIds.includes(person.id)
        ? { ...person, wished: true }
        : person
    );

    setBirthdays(updatedBirthdays);
    setSelectedIds([]);
    setCustomWish('');
    setRandomWish('');
    setIsCustom(false);
    onClose(); // Close the modal after sending wishes
    toast.success(`Wishes sent successfully: "${wishText}"`);
  };

  // Generate a random pre-generated wish
  const getRandomWish = () => {
    const randomIndex = Math.floor(Math.random() * preGeneratedWishes.length);
    setRandomWish(preGeneratedWishes[randomIndex]);
    setIsCustom(false); // Switch to pre-generated wish mode
  };

  if (!isOpen) return null; // Do not render if modal is closed

  return (
    <Modal onClose={onClose}>
      <div className="p-4">
        <h2 className="flex items-center justify-center text-xl font-semibold mb-4">Today's Events and Birthdays</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Events Section with Scroll */}
          <div className="p-4 border rounded-lg shadow max-h-[250px] overflow-auto">
            <h3 className="text-lg font-medium mb-2">Today's Events</h3>
            <ul>
              {todaysEvents.map((event, index) => (
                <li key={index}>
                  <span className="font-bold">EVENT {index + 1}:</span> {event}
                </li>
              ))}
            </ul>

          </div>

          {/* Birthdays Section */}
          <div className="p-4 border rounded-lg shadow max-h-[250px] overflow-auto">
            <h3 className="text-lg font-medium mb-2">Today's Birthdays</h3>
            <ul>
              {birthdays.map((person) => (
                <li
                  key={person.id}
                  className={`flex items-center justify-between p-2 ${person.wished ? 'opacity-50' : ''
                    }`}
                >
                  <span>{person.name}</span>
                  {!person.wished ? (
                    <input
                      type="checkbox"
                      onChange={() => toggleSelection(person.id)}
                      checked={selectedIds.includes(person.id)}
                    />
                  ) : (
                    <span className="text-green-600 font-medium">Wished</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Buttons for Wishing */}
        <div className="flex justify-end space-x-4 mt-4">
          <button
            className="px-4 w-1/2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={getRandomWish} // Get a random pre-generated wish
            disabled={selectedIds.length === 0}
          >
            Use Pre-Generated Wish
          </button>
          <button
            className="px-4 w-1/2 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => setIsCustom(true)} // Allow custom wish input
            disabled={selectedIds.length === 0}
          >
            Send Custom Wish
          </button>
        </div>

        {/* Display Random Wish or Custom Wish Input */}
        {isCustom && (
          <div className="mt-4">
            <textarea
              className="w-full p-2 border rounded-md"
              placeholder="Write a custom wish..."
              value={customWish}
              onChange={(e) => setCustomWish(e.target.value)}
            ></textarea>
          </div>
        )}
        {!isCustom && randomWish && (
          <div className="mt-4 p-2 border rounded-md">
            <p>{randomWish}</p>
          </div>
        )}

        {/* Send Wish Button */}
        <div className="flex justify-end space-x-4 mt-4">
          <button
            className="px-4 w-full py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={() => sendWish(isCustom)} // Send the appropriate wish
            disabled={
              selectedIds.length === 0 ||
              (!isCustom && !randomWish) ||
              (isCustom && customWish.trim() === '')
            }
          >
            Send Wish
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TodaysEventAndBirthday;
