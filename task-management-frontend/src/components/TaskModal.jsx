import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { addTask, updateTask } from '../services/taskService'; // Adjust the path as needed

const TaskModal = ({ open, onClose, onSave, task = {} }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [errors, setErrors] = useState({ name: '', desc: '' });

  useEffect(() => {
    // Set input values when task prop changes
    setTaskName(task.taskName || '');
    setTaskDesc(task.desc || '');
  }, [task]);

  const handleSave = async () => {
    let valid = true;
    const newErrors = { name: '', desc: '' };

    if (!taskName.trim()) {
      newErrors.name = 'Task name is required';
      valid = false;
    }
    if (!taskDesc.trim()) {
      newErrors.desc = 'Description is required';
      valid = false;
    }

    if (valid) {
      try {
        if (task._id) {
          // Edit task
          await updateTask(task._id, { taskName, taskDesc });
          toast.success('Task updated successfully!');
        } else {
          // Add new task
          await addTask({ taskName, taskDesc });
          toast.success('Task added successfully!');
        }
        onSave(); // Notify parent component of the save
        setTaskName('');
        setTaskDesc('');
        setErrors({ name: '', desc: '' });
      } catch (error) {
        toast.error(error.message || 'An error occurred');
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{task._id ? 'Edit Task' : 'Add Task'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Task Name"
          fullWidth
          variant="outlined"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          value={taskDesc}
          onChange={(e) => setTaskDesc(e.target.value)}
          error={!!errors.desc}
          helperText={errors.desc}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModal;
