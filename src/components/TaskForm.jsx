import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../redux/taskSlice";

export default function TaskForm({ editing, setEditing }) {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");

  useEffect(() => {
    if (editing) {
      setTitle(editing.title || "");
      setDescription(editing.description || "");
      setDueDate(editing.dueDate ? editing.dueDate.slice(0, 10) : "");
      setPriority(editing.priority || "medium");
    }
  }, [editing]);

  function resetForm() {
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("medium");
    setEditing(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!user) return alert("Please login");
    if (!title.trim()) return alert("Title is required");

    if (editing) {
      dispatch(
        updateTask({
          id: editing.id,
          changes: { title, description, dueDate: dueDate || null, priority },
        })
      );
      resetForm();
      return;
    }

    dispatch(
      addTask({
        title,
        description,
        dueDate: dueDate || null,
        priority,
        userId: user.id,
      })
    );
    resetForm();
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded mb-4 bg-white">
      <h3 className="text-lg mb-2">{editing ? "Edit Task" : "Add New Task"}</h3>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        className="w-full p-2 border rounded mb-2"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 border rounded mb-2"
      />
      <div className="flex gap-2 mb-2">
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">
          {editing ? "Update" : "Add"}
        </button>
        {editing && (
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
