import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

import { ITodo, useTodoStore } from '../../stores/todo.store';

import './todoList.css';


function TodoList() {
    let deleteArray: string[] = [];

    const {todos, deleteTodo} = useTodoStore();

    const history = useHistory();

    const [completeChecked, setCompleteChecked] = useState<boolean>(false)
    const [incompleteChecked, setIncompleteChecked] = useState<boolean>(false)

    const addTodo = () => {
        history.push('/new');
    }

    const editTodo = (todo: ITodo) => {
        /* history.push('/edit'); */
        history.push('/edit/' + todo.id);
    }

    const dTodo = (ids: string[]) => {
        const backdrop = document.querySelector(".backdrop");
        const modal = document.querySelector(".modal");
        const modalYesButton = document.querySelector(".modal__action"); 
        const modalNoButton = document.querySelector(".modal__action--negative"); 
        
        backdrop?.classList.add("open");
        modal?.classList.add("open");

        backdrop?.addEventListener("click", function () {
            modal?.classList.remove("open");
            backdrop.classList.remove("open");
        });

        modalNoButton?.addEventListener("click", function() {
            modal?.classList.remove("open");
            backdrop?.classList.remove("open");
        });
        
        modalYesButton?.addEventListener("click", function() {
            modal?.classList.remove("open");
            backdrop?.classList.remove("open");
            history.push('/list');
            deleteTodo(ids);
        });

    }
    


    return (
        <div>
            <div className="backdrop"></div>
            <div className="modal">
                <h1 className="modal__title">Do you really want to delete?</h1>
                <div className="modal__actions">
                    <button className="modal__action" type="button">Yes</button>
                    <button className="modal__action--negative" type="button">No</button>
                </div>
            </div>

            <h1 className="todo--list__title">Todo List</h1>

            <div className="todo--header">
                <div className="todo--header__checkbox">
                    <input
                        type="checkbox"
                        id="complete"
                        checked={completeChecked}
                        onChange={(event) => setCompleteChecked(event.target.checked)}
                    />
                    <label htmlFor="complete">Complete</label>
                </div>

                <div className="todo--header__checkbox">
                    <input
                        type="checkbox"
                        id="incomplete"
                        checked={incompleteChecked}
                        onChange={(event) => setIncompleteChecked(event.target.checked)}
                    />
                    <label htmlFor="incomplete">Incomplete</label>
                </div>

                <button type="button" className="add__todo" onClick={addTodo}>New</button>
                <div className="todo__number">{todos.length}</div>
            </div>

            <div className="todo--list__items">
                {completeChecked && !incompleteChecked ? (
                    todos.map(todo => {
                        if(todo.complete === true){
                            return (
                                <React.Fragment key={todo.id}>
                                    <div className="todo--list__item">
                                        <div>{todo.name}</div>
                                        <div>{todo.dueDate}</div>
                                        <div className="complete--container">
                                            <input
                                                type="checkbox"
                                                id="complete"
                                                checked={todo.complete}
                                            />
                                            <label htmlFor="complete">Complete</label>
                                        </div>
                                        <button type="button" className="edit__todo" onClick={() => editTodo(todo)}>Edit</button>
                                        <button type="button" className="delete__todo" onClick={() => dTodo(deleteArray = [...deleteArray, todo.id])}>Delete</button>
                                    </div>
                                </React.Fragment>
                            )
                        }
                    })
                ): incompleteChecked && !completeChecked ? (
                    todos.map(todo => {
                        if(todo.complete === false){
                            return (
                                <React.Fragment key={todo.id}>
                                    <div className="todo--list__item">
                                        <div>{todo.name}</div>
                                        <div>{todo.dueDate}</div>
                                        <div className="complete--container">
                                            <input
                                                type="checkbox"
                                                id="complete"
                                                checked={todo.complete}
                                            />
                                            <label htmlFor="complete">Complete</label>
                                        </div>
                                        <button type="button" className="edit__todo" onClick={() => editTodo(todo)}>Edit</button>
                                        <button type="button" className="delete__todo" onClick={() => dTodo(deleteArray = [...deleteArray, todo.id])}>Delete</button>
                                    </div>
                                </React.Fragment>
                            )
                        }
                    })
                ): todos.map(todo => {
                        return (
                            <React.Fragment key={todo.id}>
                                <div className="todo--list__item">
                                    <div>{todo.name}</div>
                                    <div>{todo.dueDate}</div>
                                    <div className="complete--container">
                                        <input
                                            type="checkbox"
                                            id="complete"
                                            checked={todo.complete}
                                        />
                                        <label htmlFor="complete">Complete</label>
                                    </div>
                                    <button type="button" className="edit__todo" onClick={() => editTodo(todo)}>Edit</button>
                                    <button type="button" className="delete__todo" onClick={() => dTodo(deleteArray = [...deleteArray, todo.id])}>Delete</button>
                                </div>
                            </React.Fragment>
                        )
                    })
                }
            </div>
                

            {/* <div className="todo--list__items">
                {todos.map(todo => {
                    return (
                        <React.Fragment key={todo.id}>
                            <div className="todo--list__item">
                                <div>{todo.name}</div>
                                <div>{todo.dueDate}</div>
                                <div className="complete--container">
                                    <input
                                        type="checkbox"
                                        id="complete"
                                        checked={todo.complete}
                                    />
                                    <label htmlFor="complete">Complete</label>
                                </div>
                                <button type="button" className="edit__todo" onClick={() => editTodo(todo)}>Edit</button>
                                <button type="button" className="delete__todo" onClick={() => dTodo(deleteArray = [...deleteArray, todo.id])}>Delete</button>
                            </div>
                        </React.Fragment>
                    )
                })
                }
            </div> */}
        </div>
    )
}

export default TodoList
