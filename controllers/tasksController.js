const Tasks = require('../models/Task')
const asyncWrapper = require('../middlewares/async')
const { createCustomError } = require('../error/custom-error')
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Tasks.find({}).sort('name')
  res.status(200).json({ tasks, amount: tasks.length })
})
const getSingleTask = asyncWrapper(async (req, res, next) => {
  // Alias
  const { id: taskID } = req.params
  const task = await Tasks.findById(taskID)
  if (!task) {
    return next(
      createCustomError(`There Is No Task With That ID ${taskID}`, 404)
    )
  }
  res.status(200).json({ task })
})
const createTask = asyncWrapper(async (req, res) => {
  const task = await Tasks.create(req.body)
  res.status(201).json({ task })
})
const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await Tasks.findByIdAndUpdate(taskID, req.body, {
    new: true,
    runValidators: true,
  })
  if (!task) {
    return next(
      createCustomError(`There Is No Task With That ID ${taskID}`, 404)
    )
  }
  res.status(200).json({ task })
})
const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await Tasks.findByIdAndDelete(taskID)
  if (!task) {
    return next(
      createCustomError(`There Is No Task With That ID ${taskID}`, 404)
    )
  }
  res.status(200).json({ task })
})

module.exports = {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
}
