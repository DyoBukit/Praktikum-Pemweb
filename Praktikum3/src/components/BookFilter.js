import React from "react";

const BookFilter = ({ filter, onFilterChange, status, onStatusChange }) => {
  return (
    <div className="flex gap-4 mb-6">

      <select
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="bg-gray-800 px-4 py-2 rounded-lg focus:outline-none"
      >
        <option value="All">All</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="bg-gray-800 px-4 py-2 rounded-lg focus:outline-none"
      >
        <option value="All">All</option>
        <option value="Done">Done</option>
        <option value="Pending">Pending</option>
      </select>

    </div>
  );
};

export default BookFilter;
