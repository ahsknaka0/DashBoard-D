import React from "react";

const Modal = ({ modalType, filters, closeModal }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-md shadow-lg w-96">
        <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">{modalType} Filters</h2>
        <div className="space-y-4 mt-4">
          {filters.map((filter, index) => (
            <div key={index} className="flex items-center space-x-2">
              <label className="text-gray-700 dark:text-gray-300">{filter}:</label>
              <select className="p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md">
                <option value="all">{`Select ${filter}`}</option>
                {/* Add more filter options here if needed */}
              </select>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button onClick={closeModal} className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500">
            Close
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
