import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./ToDoList.css";

export default function ToDoList() {
    const [todos, setTodos] = useState(() => {
        // Load from localStorage
        const savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) : [{ 
            task: "Sample Task", 
            id: uuidv4(), 
            isDone: false,
            dueDate: "",
            priority: "medium",
            category: "general"
        }];
    });
    const [newTodo, setNewTodo] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("medium");
    const [category, setCategory] = useState("general");
    const [filter, setFilter] = useState("all");

    // Save to localStorage whenever todos change
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const addNewTask = () => {
        if (newTodo.trim() === "") return;
        setTodos((prevTodos) => [...prevTodos, { 
            task: newTodo, 
            id: uuidv4(), 
            isDone: false,
            dueDate,
            priority,
            category
        }]);
        setNewTodo("");
        setDueDate("");
    };

    const toggleDone = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
            )
        );
    };

    const deleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    const filteredTodos = todos
        .filter(todo => todo.task.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(todo => {
            if (filter === "completed") return todo.isDone;
            if (filter === "pending") return !todo.isDone;
            return true;
        });

    return (
        <div className="todo-container">
            <h1 className="title">TASKIFY</h1>
            <h3 className="title"> Organize, Prioritize, Achieve</h3>
            
            {/* Search Bar */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            {/* Input Form */}
            <div className="input-container">
                <input
                    placeholder="Add a task"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className="task-input"
                />
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="date-input"
                />
                <select 
                    value={priority} 
                    onChange={(e) => setPriority(e.target.value)}
                    className="priority-select"
                >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                </select>
                <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="category-select"
                >
                    <option value="general">General</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="shopping">Shopping</option>
                </select>
                <button onClick={addNewTask} className="add-task-btn">Add Task</button>
            </div>

            {/* Filter Buttons */}
            <div className="filter-buttons">
                <button 
                    onClick={() => setFilter("all")} 
                    className={`filter-btn ${filter === "all" ? "active" : ""}`}
                >
                    All
                </button>
                <button 
                    onClick={() => setFilter("completed")} 
                    className={`filter-btn ${filter === "completed" ? "active" : ""}`}
                >
                    Completed
                </button>
                <button 
                    onClick={() => setFilter("pending")} 
                    className={`filter-btn ${filter === "pending" ? "active" : ""}`}
                >
                    Pending
                </button>

                {/* //delete all button  */}
                {/* Delete All Button */}
<div className="delete-all-container">
    <button 
        onClick={() => {
            if (window.confirm('Are you sure you want to delete all tasks?')) {
                setTodos([]);
            }
        }} 
        className="delete-all-btn"
    >
        Delete All Tasks 🗑️
    </button>
</div>

            </div>

            {/* Task List */}
            {filteredTodos.length === 0 ? (
                <p className="no-tasks">No tasks found!</p>
            ) : (
                <ul className="task-list">
                    {filteredTodos.map((todo) => (
                        <li key={todo.id} className={`task-item ${todo.isDone ? "completed" : ""} priority-${todo.priority}`}>
                            <div className="task-content">
                                <span className="task-text">{todo.task}</span>
                                <div className="task-details">
                                    {todo.dueDate && <span className="due-date">Due: {todo.dueDate}</span>}
                                    <span className={`category-tag ${todo.category}`}>{todo.category}</span>
                                </div>
                            </div>
                            <div className="task-buttons">
                                <button onClick={() => toggleDone(todo.id)} className="toggle-btn">
                                    {todo.isDone ? "↩️" : "✅"}
                                </button>
                                <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
                                    🗑️
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
