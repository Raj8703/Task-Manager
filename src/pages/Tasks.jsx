import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";
import TaskItem from "../components/TaskItem";

export default function Tasks() {
  const { user } = useSelector((state) => state.auth);
  const tasks = useSelector((state) => state.tasks[user] || []);

  const dispatch = useDispatch();
  const [text, setText] = useState("");

  return (
    <div className="p-6 space-y-4 max-w-xl mx-auto">
      <div className="flex gap-2">
        <input
          className="border p-2 flex-1 rounded"
          placeholder="Add new task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => {
            if (text.trim() !== "") dispatch(addTask({ user, text }));
            setText("");
          }}
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {tasks.map((t) => (
          <TaskItem key={t.id} task={t} />
        ))}
      </div>
    </div>
  );
}
