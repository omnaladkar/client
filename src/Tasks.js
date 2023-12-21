import { useState, useEffect } from "react";
import {
    addTask,
    getTasks,
    updateTask,
    deleteTask,
} from "./services/taskServices";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getTasks();
                setTasks(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        setCurrentTask(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const originalTasks = tasks;
        try {
            const { data } = await addTask({ task: currentTask });
            const updatedTasks = [...originalTasks, data];
            setTasks(updatedTasks);
            setCurrentTask("");
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = async (taskId) => {
        const originalTasks = [...tasks];
        try {
            const updatedTasks = originalTasks.map((task) => {
                if (task._id === taskId) {
                    return { ...task, completed: !task.completed };
                }
                return task;
            });
            setTasks(updatedTasks);
            await updateTask(taskId, { completed: !updatedTasks.completed });
        } catch (error) {
            setTasks(originalTasks);
            console.log(error);
        }
    };

    const handleDelete = async (taskId) => {
        const originalTasks = [...tasks];
        try {
            const updatedTasks = originalTasks.filter((task) => task._id !== taskId);
            setTasks(updatedTasks);
            await deleteTask(taskId);
        } catch (error) {
            setTasks(originalTasks);
            console.log(error);
        }
    };

    return {
        tasks,
        currentTask,
        handleChange,
        handleSubmit,
        handleUpdate,
        handleDelete,
    };
};

export default Tasks;
