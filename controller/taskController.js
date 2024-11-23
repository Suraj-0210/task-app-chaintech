import Task from "../model/Task.js";

/**
 * @swagger
 * /api/task:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the task
 *               description:
 *                 type: string
 *                 description: Description of the task
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 description: Due date of the task
 *               category:
 *                 type: string
 *                 description: Category of the task
 *             required:
 *               - title
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task created successfully"
 *                 task:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     dueDate:
 *                       type: string
 *                     category:
 *                       type: string
 *       400:
 *         description: Bad request (e.g., missing required fields)
 *       500:
 *         description: Internal server error
 */
export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, category } = req.body;
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!title) {
      return res.status(400).json({ message: "Task title is required" });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      category,
      user: userId,
    });
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating task", error: error.message });
  }
};

/**
 * @swagger
 * /api/task:
 *   get:
 *     summary: Get all tasks of the logged-in user
 *     tags:
 *       - Tasks
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   dueDate:
 *                     type: string
 *                   category:
 *                     type: string
 *       400:
 *         description: User ID is required
 *       500:
 *         description: Internal server error
 */
export const getAllTasks = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: error.message });
  }
};

/**
 * @swagger
 * /api/task/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 dueDate:
 *                   type: string
 *                 category:
 *                   type: string
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const task = await Task.findOne({ _id: id, user: userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching task", error: error.message });
  }
};

/**
 * @swagger
 * /api/task/{id}:
 *   put:
 *     summary: Update a task
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *               category:
 *                 type: string
 *               isCompleted:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task updated successfully"
 *                 task:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     dueDate:
 *                       type: string
 *                     category:
 *                       type: string
 *       400:
 *         description: Task cannot be marked as incomplete if already completed
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isCompleted, dueDate, category } = req.body;
    const userId = req.user._id;

    // Find the task belonging to the user
    const task = await Task.findOne({ _id: id, user: userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // If the task is already completed, we cannot mark it as incomplete
    if (task.isCompleted && isCompleted === false) {
      return res
        .status(400)
        .json({ message: "Completed tasks cannot be marked as incomplete." });
    }

    // Update task fields if new values are provided
    task.title = title || task.title;
    task.description = description || task.description;
    task.isCompleted =
      isCompleted !== undefined ? isCompleted : task.isCompleted;
    task.dueDate = dueDate || task.dueDate;
    task.category = category || task.category;

    // Save the updated task
    const updatedTask = await task.save();

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating task",
      error: error.message,
    });
  }
};

/**
 * @swagger
 * /api/task/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const task = await Task.findOneAndDelete({ _id: id, user: userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting task", error: error.message });
  }
};

/**
 * @swagger
 * /api/task/{id}/status:
 *   patch:
 *     summary: Update the status of a task
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isCompleted:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task status updated successfully
 *       400:
 *         description: Cannot mark a completed task as incomplete
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isCompleted } = req.body;
    const userId = req.user._id;

    // Validate the input
    if (isCompleted === undefined) {
      return res
        .status(400)
        .json({ message: "isCompleted field is required." });
    }

    // Find the task and validate ownership
    const task = await Task.findOne({ _id: id, user: userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    // If the task is already completed, prevent marking it as incomplete
    if (task.isCompleted && isCompleted === false) {
      return res
        .status(400)
        .json({ message: "Completed tasks cannot be marked as incomplete." });
    }

    // Update the `isCompleted` field
    task.isCompleted = isCompleted;

    const updatedTask = await task.save();
    res.status(200).json({
      message: "Task status updated successfully.",
      task: updatedTask,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating task status.", error: error.message });
  }
};
