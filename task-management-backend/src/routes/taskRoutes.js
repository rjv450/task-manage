import express from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController.js';

const router = express.Router();

router.post('/tasks', createTask);
router.get('/tasks', getTasks);
router.put('/tasks/:taskId', updateTask);
router.delete('/tasks/:taskId', deleteTask);

export default router;
