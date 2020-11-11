import React from 'react'
import { useHistory } from 'react-router-dom';

import './todoList.css';


function TodoList() {

    const history = useHistory();

    const todoList = [
        { id: 1, name: 'React', date: null, complete: 'Complete' },
        { id: 2, name: 'React', date: null, complete: 'Incomplete' },
    ];

    const checkboxListOptions = [
        {key: 'Complete', value: 'complete'},
        {key: 'Incomplete', value: 'incomplete'}
    ];

        const addTodo = () => {
        history.push('/new');
    }

    const editTodo = () => {
        history.push('/edit');
    }

    const deleteTodo = () => {
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
                    {checkboxListOptions.map(option => {
                        return (
                            <React.Fragment key={option.key}>
                                <input
                                    type="checkbox"
                                    id={option.value}
                                    value={option.value}
                                />
                                <label htmlFor={option.value}>{option.key}</label>
                            </React.Fragment>
                        )
                    })
                    }
                </div>
                <button type="button" className="add__todo" onClick={addTodo}>New</button>
                <div className="todo__number">{todoList.length}</div>
            </div>

            <div className="todo--list__items">
                {todoList.map(todo => {
                    return (
                        <React.Fragment key={todo.id}>
                            <div className="todo--list__item">
                                <div>{todo.name}</div>
                                <div>{todo.date}</div>
                                <input
                                    type="checkbox"
                                    id="complete"
                                    value={todo.complete}
                                />
                                <label htmlFor="complete">{todo.complete}</label>
                                <button type="button" className="edit__todo" onClick={editTodo}>Edit</button>
                                <button type="button" className="delete__todo" onClick={deleteTodo} >Delete</button>
                            </div>
                        </React.Fragment>
                    )
                })
                }
            </div>
        </div>
    )
}

export default TodoList
