import React, { useState, useEffect } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import TaskModal from '../components/TaskModal';
import DeleteModal from '../components/DeleteModal';
import ViewModal from '../components/ViewModal';
import TaskColumn from '../components/TaskColumn';
import SearchAndSortControls from '../components/SearchAndSortControls';
import { getTasks, updateTask, addTask, deleteTask } from '../services/taskService';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [isModalOpen, setModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isViewModalOpen, setViewModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [tasks, setTasks] = useState({ TODO: [], INPROGRESS: [], DONE: [] });

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getTasks(searchTerm, sortOrder); // Pass searchTerm and sortOrder
                setTasks(data);
            } catch (error) {
                toast.error('Failed to fetch tasks');
            }
        };

        fetchTasks();
    }, [searchTerm, sortOrder]); // Add searchTerm and sortOrder as dependencies

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    const handleOpenModal = (task = null) => {
        setCurrentTask(task);
        setTimeout(() => setModalOpen(true), 100);
    };
    
    const handleCloseModal = () => {
        setModalOpen(false);
        setCurrentTask(null);
    };

    const handleSaveTask = async (task) => {
        try {
            if (task && task._id) {
                // Update existing task
                await updateTask(task._id, task);
                toast.success('Task updated successfully!');
            } else {
                // Add new task
                await addTask(task);
                toast.success('Task added successfully!');
            }
            const data = await getTasks(searchTerm, sortOrder); // Refresh tasks with searchTerm and sortOrder
            setTasks(data);
        } catch (error) {
            toast.error('Failed to save task');
        }
        handleCloseModal();
    };

    const handleOpenDeleteModal = (task) => {
        setCurrentTask(task);
        setDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
        setCurrentTask(null);
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId);
            const data = await getTasks(searchTerm, sortOrder); // Refresh tasks with searchTerm and sortOrder
            setTasks(data);
            toast.success('Task deleted successfully!');
        } catch (error) {
            toast.error('Failed to delete task');
        }
        handleCloseDeleteModal();
    };

    const handleOpenViewModal = (task) => {
        setCurrentTask(task);
        setViewModalOpen(true);
    };

    const handleCloseViewModal = () => {
        setViewModalOpen(false);
        setCurrentTask(null);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Button
                variant="contained"
                color="primary"
                sx={{ mb: 2 }}
                onClick={() => handleOpenModal()}
            >
                Add Task
            </Button>

            <SearchAndSortControls
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
            />

            <Grid container spacing={2}>
                {['TODO', 'INPROGRESS', 'DONE'].map(status => (
                    <Grid item xs={12} sm={4} key={status}>
                        <TaskColumn
                            status={status}
                            tasks={tasks[status].filter(task => task.taskName.toLowerCase().includes(searchTerm.toLowerCase()))}
                            onEdit={handleOpenModal}
                            onDelete={handleOpenDeleteModal}
                            onView={handleOpenViewModal}
                        />
                    </Grid>
                ))}
            </Grid>

            {/* Task Modals */}
            <TaskModal
                open={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveTask}
                task={currentTask || {}}
            />
            <DeleteModal
                open={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onDelete={handleDeleteTask}
                task={currentTask || {}}
            />
            <ViewModal
                open={isViewModalOpen}
                onClose={handleCloseViewModal}
                task={currentTask || {}}
            />
        </Box>
    );
};

export default Home;
