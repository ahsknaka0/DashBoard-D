import React, { useState } from "react";

const ExploreMoreInformation = () => {
  const [showMoreInfo, setShowMoreInfo] = useState(
    Array(4).fill(false) // Initialize with all cards closed
  );

  const toggleShowMore = (index) => {
    const newShowMoreInfo = [...showMoreInfo];
    newShowMoreInfo[index] = !newShowMoreInfo[index];
    setShowMoreInfo(newShowMoreInfo);
  };

  const infoData = [
    { title: "Students", content: "Current: 12,000", moreInfo: "Additional student details..." },
    { title: "Employees", content: "Faculty & Staff: 2,500", moreInfo: "Employee demographics and more..." },
    { title: "Research and Innovation", content: "Active Projects: 120", moreInfo: "Details on ongoing research projects..." },
    { title: "Financial Overview", content: "Annual Budget: $50M", moreInfo: "Detailed financial breakdown and more..." },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 shadow-md rounded-md col-span-1 lg:col-span-2">
      <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
        Explore More Information
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {infoData.map((info, index) => (
          <div
            key={index}
            className="bg-gray-200 dark:bg-gray-700 p-4 rounded-md relative group hover:shadow-lg transition-shadow h-[200px] overflow-hidden"
          >
            <h3 className="text-md font-semibold text-gray-900 dark:text-white">{info.title}</h3>
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">{info.content}</p>
            {/* Show More Button */}
            <div className="absolute bottom-2 right-2">
              <button
                onClick={() => toggleShowMore(index)}
                className="bg-cyan-800 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {showMoreInfo[index] ? "Show Less" : "Show More"}
              </button>
            </div>
            {/* Collapsible More Information */}
            {showMoreInfo[index] && (
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {info.moreInfo}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMoreInformation;
