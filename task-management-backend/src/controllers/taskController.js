import Task from '../models/Task.js';

export const createTask = async (req, res) => {
    try {

        const { taskName, taskDesc } = req.body;
        console.log(taskName, taskDesc);
        let status = 1

        const newTask = new Task({ taskName: taskName, desc: taskDesc, status });

        await newTask.save();

        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getTasks = async (req, res) => {
    try {
        const { search = '', sortBy = 'createdAt', order = 'asc' } = req.query;
        const searchCriteria = search ? { taskName: { $regex: search, $options: 'i' } } : {};


        const sortCriteria = {};
        if (['asc', 'desc'].includes(order.toLowerCase())) {
            sortCriteria[sortBy] = order.toLowerCase() === 'asc' ? 1 : -1;
        }


        const todoData = await Task.find({ ...searchCriteria, status: 1 }).sort(sortCriteria);
        const inprogressData = await Task.find({ ...searchCriteria, status: 2 }).sort(sortCriteria);
        const doneData = await Task.find({ ...searchCriteria, status: 3 }).sort(sortCriteria);


        const groupedTasks = {
            TODO: todoData,
            INPROGRESS: inprogressData,
            DONE: doneData
        };

        // Send grouped tasks in the response
        res.json(groupedTasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { taskName, taskDesc, status } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(taskId, { taskName: taskName, desc: taskDesc, status }, { new: true });
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        await Task.findByIdAndDelete(taskId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
