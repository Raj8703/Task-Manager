import { createSlice, nanoid } from "@reduxjs/toolkit";

const persisted = JSON.parse(localStorage.getItem("tm_tasks") || "[]");

const tasksSlice = createSlice({
  name: "tasks",
  initialState: persisted,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.push(action.payload);
        localStorage.setItem("tm_tasks", JSON.stringify(state));
      },
      prepare({ title, description, dueDate, priority, userId }) {
        return {
          payload: {
            id: nanoid(),
            title,
            description,
            dueDate: dueDate || null,
            priority: priority || "medium",
            completed: false,
            userId,
            createdAt: new Date().toISOString(),
          },
        };
      },
    },
    toggleComplete(state, action) {
      const t = state.find((s) => s.id === action.payload);
      if (t) t.completed = !t.completed;
      localStorage.setItem("tm_tasks", JSON.stringify(state));
    },
    deleteTask(state, action) {
      const idx = state.findIndex((s) => s.id === action.payload);
      if (idx !== -1) state.splice(idx, 1);
      localStorage.setItem("tm_tasks", JSON.stringify(state));
    },
    updateTask(state, action) {
      const { id, changes } = action.payload;
      const t = state.find((s) => s.id === id);
      if (t) Object.assign(t, changes);
      localStorage.setItem("tm_tasks", JSON.stringify(state));
    },
    clearAllForUser(state, action) {
      const userId = action.payload;
      const remaining = state.filter((t) => t.userId !== userId);
      localStorage.setItem("tm_tasks", JSON.stringify(remaining));
      return remaining;
    },
  },
});

export const {
  addTask,
  toggleComplete,
  deleteTask,
  updateTask,
  clearAllForUser,
} = tasksSlice.actions;
export default tasksSlice.reducer;
