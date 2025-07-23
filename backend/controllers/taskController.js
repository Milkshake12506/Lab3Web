
const Task = require('../models/Task');

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);     
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi lấy danh sách công việc' });
  }
};

const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const task = new Task({
      title,
      completed: false
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err); 
    res.status(400).json({ error: 'Lỗi khi tạo task', details: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed: true },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: 'Lỗi khi cập nhật task' });
  }
};

const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Đã xoá task' });
  } catch (err) {
    res.status(400).json({ error: 'Lỗi khi xoá task' });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};
