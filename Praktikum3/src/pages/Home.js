import React, { useState } from "react";
import BookFilter from "../components/BookFilter";
import Tasks from "../components/Tasks";

const Home = () => {
  const [filter, setFilter] = useState("All");
  const [status, setStatus] = useState("All");

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-400 mb-6">
          Task Manager
        </h1>

        {/* Pakai BookFilter */}
        <BookFilter
          filter={filter}
          onFilterChange={setFilter}
          status={status}
          onStatusChange={setStatus}
        />

        <Tasks filter={filter} status={status} />
      </div>
    </div>
  );
};

export default Home;
