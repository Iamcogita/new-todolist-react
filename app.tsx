import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState, useEffect, FC, FormEventHandler } from 'react';

const ToDoList: FC<{ taskList: string[] }> = ({ taskList }) => {
    const todoTasks = taskList.map((task) => (
        <li key={task}>
            <TodoTask name={task} />
        </li>
    ))
    return (
        <ul>
            {todoTasks}
        </ul>
    )
}

function TodoTask(props: { name: string }) {
    const { name } = props;
    const [isDone, setIsDone] = useState(false);
    function setDone() {
        setIsDone(!isDone);
    }
    return (
        <>
            {isDone ? <del>{name}</del> : name}
            <button onClick={setDone}>{isDone ? "undo" : "done"}
            </button>
        </>
    )
}

interface ToDoFormProps {
    onSubmit: FormEventHandler<HTMLFormElement>
}

const ToDoForm: FC<ToDoFormProps> = ({ onSubmit }) => {
    return (
        <form className="taskDiv" onSubmit={onSubmit}>
            <input type="text" placeholder="your task" name="taskName"></input>
            <button type="submit"> add task </button>
        </form>
    )
}

const App = () => {
    const [tasks, setTasks] = useState(["first task"]);

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const newTask = formData.get('taskName');
        if (typeof newTask === "string") {
            setTasks([...tasks, newTask]);
        }
        form.reset();
    }

    return (
        <>
            <div>
                <h1>To Do:</h1>
                <ToDoForm onSubmit={handleSubmit} />
                <ToDoList taskList={tasks} />
            </div>
        </>
    )
};


const rootNode = document.getElementById("reactDiv");
if (rootNode) {
    const root = ReactDOM.createRoot(rootNode)
    root.render(<App />);
}