import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import { ITodo, useTodoStore } from '../../stores/todo.store';

import styles from './TodoList.module.css';


const useStyles = makeStyles((theme) => ({
    buttonNew: {
        borderColor: '#37ee37',
        backgroundColor: '#f1faf1',
        color: '#37ee37',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: '#37ee37',
            color: '#f1faf1',
        },
    },
    backdrop: {
        dispaly: 'flex',
        flexDirection: 'column',
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    modal__typography: {
        color: '#fff',
    },
    modal__actions: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridColumnGap: '1rem',
    }
}));


function TodoList() {

    const classes = useStyles();

    const {todos, deleteTodo} = useTodoStore();

    const todosNumber = todos.length;

    const history = useHistory();

    const [deleteArray, setDeleteArray] = useState<string[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [completeChecked, setCompleteChecked] = useState<boolean>(false);
    const [incompleteChecked, setIncompleteChecked] = useState<boolean>(false);

    const handleToggle = () => {
        setOpen(!open);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const addTodo = () => {
        history.push('/new');
    };

    const editTodo = (todo: ITodo) => {
        /* history.push('/edit'); */
        history.push('/edit/' + todo.id);
    };

    /* const dTodo = (ids: string[]) => {
        const backdrop = document.querySelector(".backdrop");
        const modal = document.querySelector(".modal");
        const modalYesButton = document.querySelector(".modal__action"); 
        const modalNoButton = document.querySelector(".modal__action__negative"); 
        
        console.log('Delete default has clicked.');
        deleteTodo(ids);
        console.log('The todo has deleted.');
        
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

    }; */

    
    return (
        <div>
            {/* <div className={styles.backdrop}>
                <div className={styles.modal}>
                    <h1 className={styles.modal__title}>Do you really want to delete?</h1>
                    <div className={styles.modal__actions}>
                        <button className={styles.modal__action} type="button">Yes</button>
                        <button className={styles.modal__action__negative} type="button">No</button>
                    </div>
                </div>
            </div> */}

            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                <Typography variant="h4" gutterBottom className={classes.modal__typography}>
                    Do you really want to delete this to-do ?
                </Typography>
                <div className={classes.modal__actions}>
                    <Button
                        startIcon={<DeleteIcon />}
                        size="small"
                        variant="contained"
                        color="secondary"
                        onClick={() => deleteTodo(deleteArray)}
                    >
                        Yes
                    </Button>
                    <Button
                        startIcon={<ClearIcon />}
                        size="small"
                        variant="contained"
                        className={classes.buttonNew}
                        onClick={handleClose}
                    >
                        No
                    </Button>
                </div>
            </Backdrop>

            <h1 className={styles.todo__list__title}>Todo List</h1>
            
            <div className={styles.todo__header}>
                <FormControlLabel 
                    control={
                        <Checkbox
                            size="small"
                            checked={completeChecked}
                            onChange={(event) => setCompleteChecked(event.target.checked)}
                            color="primary"
                        />
                    }
                    label="Complete"
                />

                <FormControlLabel 
                    control={
                        <Checkbox
                            size="small"
                            checked={incompleteChecked}
                            onChange={(event) => setIncompleteChecked(event.target.checked)}
                            color="primary"
                        />
                    }
                    label="Incomplete"
                />

                {/* <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    // className={styles.add__todo}
                    onClick={addTodo}
                >
                    New
                </Button> */}

                <Button
                    startIcon={<AddIcon />}
                    size="small"
                    variant="contained"
                    color="primary"
                    className={classes.buttonNew}
                    // className={styles.add__todo}
                    onClick={addTodo}
                >
                    New
                </Button>
                
                <div className={styles.todo__number}>{todosNumber}</div>
            </div>

            <div className={styles.todo__list__items}>
                {completeChecked && !incompleteChecked ? (
                    // eslint-disable-next-line array-callback-return
                    todos.map(todo => {
                        if(todo.complete === true){
                            return (
                                <React.Fragment key={todo.id}>
                                    <div className={styles.todo__list__item}>
                                        <div>{todo.name}</div>
                                        <div>{todo.dueDate}</div>
                                        <FormControlLabel 
                                            control={
                                                <Checkbox
                                                    size="small"
                                                    checked={todo.complete}
                                                    color="primary"
                                                />
                                            }
                                            label="Complete"
                                        />
                                        <ButtonGroup>
                                            <Button
                                                startIcon={<CreateIcon />}
                                                size="small"
                                                variant="contained"
                                                color="primary"
                                                onClick={() => editTodo(todo)}
                                            >
                                                Edit
                                            </Button>

                                            <Button
                                                startIcon={<DeleteIcon />}
                                                size="small"
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => {
                                                    setDeleteArray([...deleteArray, todo.id]); 
                                                    handleToggle();
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                </React.Fragment>
                            )
                        }
                    })
                ): incompleteChecked && !completeChecked ? (
                    // eslint-disable-next-line array-callback-return
                    todos.map(todo => {
                        if(todo.complete === false){
                            return (
                                <React.Fragment key={todo.id}>
                                    <div className={styles.todo__list__item}>
                                        <div>{todo.name}</div>
                                        <div>{todo.dueDate}</div>
                                        <FormControlLabel 
                                            control={
                                                <Checkbox
                                                    size="small"
                                                    checked={todo.complete}
                                                    color="primary"
                                                />
                                            }
                                            label="Complete"
                                        />
                                        <ButtonGroup>
                                            <Button
                                                startIcon={<CreateIcon />}
                                                size="small"
                                                variant="contained"
                                                color="primary"
                                                onClick={() => editTodo(todo)}
                                            >
                                                Edit
                                            </Button>

                                            <Button
                                                startIcon={<DeleteIcon />}
                                                size="small"
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => {
                                                    setDeleteArray([...deleteArray, todo.id]); 
                                                    handleToggle();
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                </React.Fragment>
                            )
                        }
                    })
                ): todos.map(todo => {
                        return (
                            <React.Fragment key={todo.id}>
                                <div className={styles.todo__list__item}>
                                    <div>{todo.name}</div>
                                    <div>{todo.dueDate}</div>
                                    <FormControlLabel 
                                        control={
                                            <Checkbox
                                                size="small"
                                                checked={todo.complete}
                                                color="primary"
                                            />
                                        }
                                        label="Complete"
                                    />
                                    {/* <div className={styles.complete__container}>
                                        <input
                                            type="checkbox"
                                            id="complete"
                                            checked={todo.complete}
                                        />
                                        <label htmlFor="complete">Complete</label>
                                    </div> */}
                                    <ButtonGroup>
                                            <Button
                                                startIcon={<CreateIcon />}
                                                size="small"
                                                variant="contained"
                                                color="primary"
                                                // className={styles.edit__todo}
                                                onClick={() => editTodo(todo)}
                                            >
                                                Edit
                                            </Button>

                                            <Button
                                                startIcon={<DeleteIcon />}
                                                size="small"
                                                variant="contained"
                                                color="secondary"
                                                // className={styles.delete__todo}
                                                // onClick={() => dTodo(deleteArray = [...deleteArray, todo.id])}
                                                onClick={() => {
                                                    setDeleteArray([...deleteArray, todo.id]); 
                                                    handleToggle();
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </ButtonGroup>
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
