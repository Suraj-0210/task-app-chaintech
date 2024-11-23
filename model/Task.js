import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date, // Optional bonus feature
    },
    category: {
      type: String, // Optional bonus feature
      enum: ["Work", "Personal", "Shopping", "Others"], // Predefined categories
      default: "Others",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      ref: "User",
      required: [true, "User ID is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically handles `createdAt` and `updatedAt`
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
