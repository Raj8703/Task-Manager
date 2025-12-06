import { useDispatch, useSelector } from "react-redux";
import { toggleStatus } from "../redux/taskSlice";

export default function TaskItem({ task }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex justify-between items-center p-3 bg-white rounded shadow">
      <p
        className={`${
          task.status === "completed" ? "line-through text-gray-500" : ""
        }`}
      >
        {task.text}
      </p>

      <button
        onClick={() => dispatch(toggleStatus({ user, id: task.id }))}
        className={`px-3 py-1 rounded ${
          task.status === "pending" ? "bg-yellow-500" : "bg-green-600"
        } text-white`}
      >
        {task.status === "pending" ? "Mark Done" : "Completed"}
      </button>
    </div>
  );
}
