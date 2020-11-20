>import React from "react"
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { CircularProgress } from '@material-ui/core';

import './todoEdit.css';
import { useTodoStore } from "../../stores/todo.store";

    
function TodoEdit(props: { match: { params: { id: any; }; }; }) {
    const {todos, updateTodo} = useTodoStore();

    const history = useHistory();

    const todo_id = props.match.params.id;

    let todoToEdit;
    
    const retrieveTodo= () => {
        let todo
        for(var i = 0; i < todos.length; i++) {
            if(todos[i].id === todo_id) {
                todo = todos[i];
            }
        }
        return todo;
    }
    
    todoToEdit = retrieveTodo()!;
    
    const initialValues = {
        id: todoToEdit.id,
        name: todoToEdit.name,
        dueDate: todoToEdit.dueDate,
        complete: todoToEdit.complete
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('Required !'),
        dueDate: Yup.date().required('Required !').nullable(),
        complete: Yup.boolean()
    })

    
    const onSubmit = (values: any, onSubmitProps: any) => {
            setTimeout(() => {
                console.log('updated data', values);
                updateTodo(values);
                onSubmitProps.setSubmitting(false);
                history.push("/list");
        }, 3000);
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    console.log('Formik errors', formik.errors);
    
    const [query, setQuery] = React.useState('idle');
    const timerRef = React.useRef();

    React.useEffect(
        () => () => {
            clearTimeout(timerRef.current);
        },
        [],
    );

    const handleClickQuery = () => {
        clearTimeout(timerRef.current);

        if (query !== 'idle') {
            setQuery('idle');
            return;
        }

        setQuery('progress');
        setTimeout(() => {
            setQuery('success');
        }, 3000);
    };

    console.log('todoToEdit', todoToEdit);

    return (
        <div className="formik">
            <h1 className="form__title">Edit the "{formik.values.name}" todo</h1>
            <div className="todo__number">{todos.length}</div>
            <form onSubmit={formik.handleSubmit} className='form'>
                <div className='form__control'>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        {...formik.getFieldProps('name')}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
                </div>

                {console.log('formik', formik)}

                <div className='form__control'>
                    <label htmlFor="dueDate">Due Date</label>
                    <input
                        id="dueDate"
                        type="date"
                        {...formik.getFieldProps('dueDate')}
                    />
                    {formik.touched.dueDate && formik.errors.dueDate ? <div className="error">{formik.errors.dueDate}</div> : null}
                </div>

                <div className='form__control'>
                    <input
                        id="complete"
                        type="checkbox"
                        {...formik.getFieldProps('complete')}
                        checked={formik.values.complete}
                    />
                    <label htmlFor="complete">Complete</label>
                </div>

                <div className="form__control">
                    <button type="button" className="cancel" onChange={formik.handleReset}>Cancel</button>
                    <button 
                        type="submit"
                        disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}
                        onClick={handleClickQuery}
                    >
                        Save
                    </button>
                    {formik.isSubmitting && (
                        <div>
                            <CircularProgress />
                        </div>
                    )}
                </div>
            </form>
        </div>
    )
}

export default TodoEdit
