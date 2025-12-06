import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleComplete, deleteTask } from "../redux/taskSlice";

export default function TaskList({ setEditing }) {
  const tasks = useSelector((s) => s.tasks);
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("all");

  const myTasks = tasks.filter((t) => t.userId === user.id);
  const filtered = myTasks.filter((t) => {
    if (filter === "all") return true;
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className="px-3 py-1 border rounded"
          >
            All
          </button>
          <button
            onClick={() => setFilter("pending")}
            className="px-3 py-1 border rounded"
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("completed")}
            className="px-3 py-1 border rounded"
          >
            Completed
          </button>
        </div>
        <div className="text-sm">Total: {myTasks.length}</div>
      </div>

      {filtered.length === 0 && (
        <div className="p-4 border rounded bg-white">No tasks yet</div>
      )}

      <ul className="space-y-3">
        {filtered.map((t) => (
          <li
            key={t.id}
            className="p-3 border rounded flex justify-between items-start gap-3 bg-white"
          >
            <div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => dispatch(toggleComplete(t.id))}
                />
                <h4
                  className={`${
                    t.completed ? "line-through text-gray-500" : ""
                  } font-semibold`}
                >
                  {t.title}
                </h4>
                <span className="text-xs ml-2 px-2 py-1 border rounded text-sm">
                  {t.priority}
                </span>
              </div>
              {t.description && <p className="text-sm mt-1">{t.description}</p>}
              {t.dueDate && (
                <div className="text-xs mt-1">
                  Due: {t.dueDate.slice(0, 10)}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setEditing(t)}
                className="px-3 py-1 border rounded"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (confirm("Delete this task?")) dispatch(deleteTask(t.id));
                }}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
