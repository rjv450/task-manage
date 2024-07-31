// src/services/taskService.js

import apiClient from './api'; 



export const addTask = async (task) => {
  try {
    const response = await apiClient.post('/tasks', task);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add task');
  }
};

export const updateTask = async (taskId, task) => {
  try {
    const response = await apiClient.put(`/tasks/${taskId}`, task);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to edit task');
  }
};
export const deleteTask = async (taskId, task) => {
    try {
      const response = await apiClient.delete(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to edit task');
    }
  };
export const getTasks = async (searchQuery = '',order='') => {
    try {
        const response = await apiClient.get('/tasks', {
            params: { search: searchQuery,order:order } // Add query parameter for search
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};
