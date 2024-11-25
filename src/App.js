import React, { useState, useEffect } from "react";
import amisLogo from './amis2024.png';
import FloatingButtons from "./component/FloatingButtons";
import VCDashboard from "./component/VCdashboard";
import Sidebar from "./component/Sidebar";


const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const [notifications] = useState([
    { id: 1, text: "Notification 1: Your task is due tomorrow.", date: new Date() },
    { id: 2, text: "Notification 2: Your profile is 80% complete.", date: new Date() },
    { id: 3, text: "Notification 3: System maintenance on Sunday.", date: new Date() },
    { id: 4, text: "Notification 4: System maintenance on Sunday.", date: new Date() },
    { id: 5, text: "Notification 5: System maintenance on Sunday.", date: new Date() },
    { id: 6, text: "Notification 6: System maintenance on Sunday.", date: new Date() },
    { id: 7, text: "Notification 7: System maintenance on Sunday.", date: new Date() },
  ]);


  const images = [
    "https://via.placeholder.com/800x400?text=Event+1",
    "https://via.placeholder.com/800x400?text=Event+2",
    "https://via.placeholder.com/800x400?text=Event+3",
    "https://via.placeholder.com/800x400?text=Event+4",
  ];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden sm:block fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-md z-50">
          <Sidebar />
        </div>

        <div className="flex-1 sm:ml-16">
          {/* Main Content */}
          <nav className="w-full py-4 px-8 flex justify-between items-center bg-gray-200 dark:bg-gray-800 shadow-md">
      <img src={amisLogo} alt="amislogo" className="h-9" />

      


      {/* Profile dropdown on larger screens */}
      <div className="relative hidden sm:flex items-center">
        {/* Button to toggle dark mode */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="  hidden md:block px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded-md shadow-md transition-transform hover:scale-105 mr-4"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
        <span className="mr-4">Alex Murphy</span>
        <button onClick={() => setMenuOpen(!menuOpen)} className="relative">
          <i className="fas fa-bell mr-4"></i> {/* Notification Bell */}
        </button>
        <button onClick={() => setMenuOpen(!menuOpen)} className="relative">
          <i className="fas fa-envelope mr-4"></i> {/* Messages Icon */}
        </button>

        {/* Dropdown menu for profile settings */}
        {menuOpen && (
          <div className="absolute right-0 top-4 mt-2 w-48 bg-white dark:bg-gray-700 shadow-lg rounded-md z-10">
            <ul className="p-2">
              <li className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">Profile</li>
              <li className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">Settings</li>
              <li className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">Logout</li>
            </ul>
          </div>
        )}
      </div>

      {/* Profile section on smaller screens */}
      <div className="sm:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-xl font-semibold">
          Alex Murphy
        </button>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="absolute right-0 top-12 mt-2 w-48 bg-white dark:bg-gray-700 shadow-lg rounded-md z-10">
            <ul className="p-2">
              <li className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">Notification</li>
              <li className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">Messages</li>
              <li className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">Profile</li>
              <li className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">Settings</li>
              <li className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? "Light Mode" : "Dark Mode"}
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>

          <main className="flex-grow grid grid-cols-1 sm:grid-cols-4 gap-4 p-4">
            {/* Carousel Section */}
            <div
              className="col-span-1 sm:col-span-3 bg-white dark:bg-gray-800 rounded-md shadow-md p-4 mb-0"
              style={{ height: "500px" }}
            >
              <h1 className="text-3xl font-bold mb-4">Upcoming Events</h1>
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <div
                  className="flex w-full transition-transform duration-500"
                  style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                    height: "400px",
                  }}
                >
                  {images.map((image, index) => (
                    <div key={index} className="min-w-full h-full rounded-md">
                      <img
                        src={image}
                        alt={`Event ${index + 1}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  ))}
                </div>
                {/* Previous and Next Buttons */}
                <button
                  onClick={handlePrevious}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-200"
                >
                  &#9664;
                </button>
                <button
                  onClick={handleNext}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-200"
                >
                  &#9654;
                </button>
              </div>
            </div>

            {/* Notification Section */}
            <div
              className="col-span-1 bg-white dark:bg-gray-800 rounded-md shadow-md p-4 mb-0"
              style={{ height: "500px" }}
            >
              <h2 className="text-xl font-bold mb-4 sticky top-0 bg-white dark:bg-gray-800 z-10 p-2">
                Notifications
              </h2>
              <ul className="space-y-2 overflow-auto" style={{ maxHeight: "calc(100% - 48px)" }}>
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
              </ul>
            </div>

          </main>

          {/* Column Section with four Divs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex-1 h-[250px] bg-white dark:bg-gray-800 rounded-md shadow-md flex relative overflow-hidden group"
              >
                {/* Left Section */}
                <div className="w-full sm:w-1/2 p-4 border-r border-gray-300 dark:border-gray-700">
                  <h2 className="text-lg font-bold">Header {item}</h2>
                  <p className="text-sm mt-2">This is some sample data.</p>
                  <p className="text-sm mt-1">More details go here.</p>
                </div>

                {/* Right Section */}
                <div className="w-full sm:w-1/2 flex flex-col justify-evenly p-4">
                  <p className="text-base font-semibold">Row 1: Value {item * 10}</p>
                  <p className="text-base font-semibold">Row 2: Value {item * 20}</p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-blue-500 dark:bg-blue-700 bg-opacity-90 text-white p-4 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h2 className="text-xl font-bold">More Information</h2>
                  <p className="text-sm mt-2">Here is additional content revealed on hover.</p>
                  {/* "For More" Button */}
                  <button
                    onClick={() => alert("Navigate to more details!")}
                    className="mt-4 px-4 py-2 bg-white text-blue-500 font-semibold rounded hover:bg-blue-100 transition-colors duration-200"
                  >
                    For More
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Floating Buttons and Dashboard */}
          <FloatingButtons />
          <VCDashboard />

          {/* Footer */}
          <footer className="w-full py-4 bg-gray-300 dark:bg-gray-700 text-center text-sm">
            © 2024 Dashboard. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;
