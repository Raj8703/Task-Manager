import React, { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useSelector, useDispatch } from "react-redux";
import { clearAllForUser } from "../redux/taskSlice";

export default function Dashboard() {
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(null);

  function handleClearAll() {
    if (confirm("Delete ALL your tasks? This cannot be undone.")) {
      dispatch(clearAllForUser(user.id));
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl">Your Tasks</h1>
        <div>
          <button
            onClick={handleClearAll}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Clear All
          </button>
        </div>
      </div>

      <TaskForm editing={editing} setEditing={setEditing} />
      <TaskList setEditing={setEditing} />
    </div>
  );
}
