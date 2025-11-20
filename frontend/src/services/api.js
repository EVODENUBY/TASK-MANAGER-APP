import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

// Fetch all tasks
export const getTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Create a new task
export const createTask = async (taskData) => {
  try {
    const response = await axios.post(API_URL, taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

// Update task status
export const updateTaskStatus = async (id, status) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating task status:', error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id; // Return the deleted task ID
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
