import React, { useState } from "react";
import { FaHome, FaUniversity, FaUsers, FaMoneyBill, FaBriefcase } from "react-icons/fa";
import Modal from "./Modal";

const MenuItem = ({ Icon, label, onClick }) => (
  <div
    className="flex items-center space-x-4 p-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md transition-all duration-300"
    onClick={onClick}
  >
    <Icon className="text-gray-700 dark:text-gray-300 w-6 h-6" />
    <span className="hidden group-hover:inline-block text-gray-700 dark:text-gray-300">{label}</span>
  </div>
);

const Sidebar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [filters, setFilters] = useState([]);

  const menuItems = [
    { icon: FaHome, label: "Home", modalType: "Home" },
    { icon: FaUniversity, label: "College", modalType: "College" },
    { icon: FaUsers, label: "Students", modalType: "Students" },
    { icon: FaMoneyBill, label: "Finance", modalType: "Finance" },
    { icon: FaBriefcase, label: "Employees", modalType: "Employees" },
  ];

  const handleClick = (modalType) => {
    const modalFilters = getFiltersForModal(modalType);
    setModalType(modalType);
    setFilters(modalFilters);
    setModalOpen(true); // Open the modal
  };

  const getFiltersForModal = (modalType) => {
    // Define filters based on modalType
    switch (modalType) {
      case "Home":
        return ["All", "Active", "Inactive"];
      case "College":
        return ["Department", "Course", "Faculty"];
      case "Students":
        return ["Grade", "Department", "Status"];
      case "Finance":
        return ["Year", "Category", "Amount"];
      case "Employees":
        return ["Role", "Department", "Status"];
      default:
        return [];
    }
  };

  const closeModal = () => {
    setModalOpen(false); // Close the modal
  };

  return (
    <>
      {/* Sidebar */}
      <div className="z-50 group relative w-16 bg-gray-200 dark:bg-gray-800 h-screen flex-shrink-0 transition-all duration-300">
        <div className="absolute left-0 top-0 h-full w-16 group-hover:w-64 bg-gray-200 dark:bg-gray-800 shadow-lg overflow-hidden transition-all duration-300">
          <div className="flex flex-col items-center group-hover:items-start p-4">
            <div className="mb-6">
              <h1 className="text-lg font-bold text-center group-hover:text-left">Menu</h1>
            </div>
            <nav className="space-y-4">
              {menuItems.map((item) => (
                <MenuItem
                  key={item.label}
                  Icon={item.icon}
                  label={item.label}
                  onClick={() => handleClick(item.modalType)}
                />
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          modalType={modalType}
          filters={filters}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default Sidebar;
