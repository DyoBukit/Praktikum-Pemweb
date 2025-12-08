import React from "react";

const dummyTasks = [
  { id: 1, title: "Read Book", category: "Personal", status: "Done" },
  { id: 2, title: "Work Project", category: "Work", status: "Pending" },
  { id: 3, title: "Buy Groceries", category: "Personal", status: "Pending" },
  { id: 4, title: "Team Meeting", category: "Work", status: "Done" },
];

const Tasks = ({ filter, status }) => {
  const filtered = dummyTasks.filter((task) => {
    return (
      (filter === "All" || task.category === filter) &&
      (status === "All" || task.status === status)
    );
  });

  return (
    <div className="space-y-3 mt-6">
      {filtered.map((task) => (
        <div
          key={task.id}
          className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-400">{task.category}</p>
          </div>
          <span
            className={`px-3 py-1 text-xs rounded-lg ${
              task.status === "Done"
                ? "bg-green-600"
                : "bg-yellow-500 text-black"
            }`}
          >
            {task.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
