const express = require('express')
const {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasksController')
const router = express.Router()

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getSingleTask).patch(updateTask).delete(deleteTask)

module.exports = router
