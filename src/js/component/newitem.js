import React, { useState, useEffect } from "react";

const NewItem = () => {
    const [newToDo, setNewToDo] = useState("")
    const [toDosObjets, setToDosObjets] = useState([])
    const [toDos, setToDos] = useState([{
        "label": "",
        "is_done": false,
        "id": ""
    }])
    const todoLabel = []

    function getContacts() {
        fetch("https://playground.4geeks.com/todo/users/margarita1973")
            .then((resp) => { return resp.json() })
            .then((data) => {
                console.dir(data);
                setToDos(data.todos);
            })
            .catch((error) => { console.log("error al cargar contactos", error) })
        console.log(toDos)
    }


    useEffect(() => {

        fetch("https://playground.4geeks.com/todo/users/margarita1973", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: "margarita1973" })
        })
            .then((response) => {
                if (!response.ok) {
                    getContacts();
                }
                return response.json()
            })
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                console.error("Error al cargar la lista:", error);
            })
        getContacts()
    }, []);


    function postToDo() {
        let newPost = {
            label: newToDo,
            is_done: false
        }
        fetch("https://playground.4geeks.com/todo/todos/margarita1973", {
            method: "Post",
            body: JSON.stringify(newPost),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((resp) => { 
                if (resp.ok) {
                    getContacts();
                }
                return resp.json()
                
            })
            .then((data) => { console.log(data) })
            .catch((error) => { return error })
    }

    function deleteToDo(todoId) {
        const actualizeList = toDos.filter((todo) => todo.id !== todoId)
        setToDos(actualizeList);

        fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
            method: "Delete",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((resp) => { return resp.json() })
            .then((data) => { console.log(data) })
            .catch((error) => { return error })
    }

    function deleteList(list) {
        list.map((todo) => {
            fetch(`https://playground.4geeks.com/todo/todos/${todo.id}`, {
                method: "Delete",
                headers: { "Content-Type": "application/json" }
            })
                .then((response) => { return response.json() })
                .catch((error) => { console.log(error) })
        })
    }

    function itemleft() {
        let items = 0;
        items = toDos.length;
        return items
    }

    return (
        <div>
            <div id="todolist" className="todolist-body m-auto z-3 container border border-secondary-subtle p-0  ">
                <input id="input" className="form-control  px-5 py-3" placeholder="what's need to be done?" onChange={
                    (e) => { setNewToDo(e.target.value) }}
                    onKeyDown={(e) => { if (e.key == "Enter" && newToDo !== "") { postToDo(newToDo);  e.target.value = ""; setNewToDo("") } }}
                />
                <ul className="list-group">
                    {toDos.map((todo, i) => {
                        return (
                            <li className="list-group-item text-start px-5 py-3"> {todo.label}
                                <button type="button" className="btn-close position-absolute end-0 me-2"
                                    onClick={() => deleteToDo(todo.id)}></button>
                            </li>)
                    })}
                </ul>
                <p className="counter"> {itemleft()} items left</p>
            </div>
            <div className=" m-5 justify-items-end">
                <button className="btn btn-outline-secondary" onClick={() => { deleteList(toDos); setToDos([]) }}>
                    Borrar todas las tareas </button>
            </div>

        </div>
    )
}
export default NewItem;


