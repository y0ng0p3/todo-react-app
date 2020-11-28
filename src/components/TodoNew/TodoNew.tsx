import React from 'react'
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import ClearIcon from '@material-ui/icons/Clear';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import * as uuid from 'uuid';

import styles from './TodoNew.module.css';
import { useTodoStore } from '../../stores/todo.store';

    
function TodoNew() {
    const {todos, addTodo} = useTodoStore();

    const history = useHistory();
    
    const initialValues = {
        id: '',
        name: '',
        dueDate: '2020-11-27',
        complete: false
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('Required !'),
        dueDate: Yup.string().required('Required !').nullable(),
        complete: Yup.boolean()
    })
  
    const onSubmit = (values: any, onSubmitProps: any) => {
        setTimeout(() => {
            values.id = uuid.v4();
            addTodo(values);
            onSubmitProps.setSubmitting(false);
            history.push("/");
        }, 3000);
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });
    
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


    return (
        <div className={styles.formik}>
            <h1 className={styles.form__title}>Add a new todo</h1>
            <div className={styles.todo__number}>{todos.length}</div>
            <form onSubmit={formik.handleSubmit} className={styles.form}>
                {/* <div className={styles.form__control}>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter the to-do name."
                        {...formik.getFieldProps('name')}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? <div className={styles.error}>{formik.errors.name}</div> : null}
                </div> */}
                <div className={styles.form__control}>
                    <TextField 
                        size="small"
                        id="name"
                        label="Name" 
                        {...formik.getFieldProps('name')}
                        value={formik.values.name}
                        helperText={formik.touched.name && formik.errors.name ? <div className={styles.error}>{formik.errors.name}</div> : null}
                        variant="outlined" 
                    />
                </div>
                
                {/* <div className={styles.form__control}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="dueDate"
                            label="Due Date"
                            format="dd/MM/yyyy"
                            {...formik.getFieldProps('dueDate')}
                            value={formik.values.dueDate}
                            helperText={formik.touched.dueDate && formik.errors.dueDate ? <div className={styles.error}>{formik.errors.dueDate}</div> : null}
                            onChange={(date) => {formik.values.dueDate = date}}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </div> */}
                <div className={styles.form__control}>
                    <TextField
                        size="small"
                        id="dueDate"
                        type="date"
                        label="Due Date"
                        {...formik.getFieldProps('dueDate')}
                        value={formik.values.dueDate}
                        helperText={formik.touched.dueDate && formik.errors.dueDate ? <div className={styles.error}>{formik.errors.dueDate}</div> : null}
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                
                  
                {/* <div className={styles.form__control}>
                    <label htmlFor="dueDate">Due Date</label>
                    <input
                        id="dueDate"
                        type="date"
                        {...formik.getFieldProps('dueDate')}
                    />
                    {formik.touched.dueDate && formik.errors.dueDate ? <div className={styles.error}>{formik.errors.dueDate}</div> : null}
                </div> */}

                <div className={styles.form__control}>
                    <FormControlLabel 
                        control={
                            <Checkbox
                                size="small"
                                {...formik.getFieldProps('complete')}
                                checked={formik.values.complete}
                                color="primary"
                            />
                        }
                        label="Complete"
                    />
                </div>

                <div className={styles.form__control}>
                    <Button
                        startIcon={<ClearIcon />}
                        size="small"
                        variant="contained"
                        color="secondary"
                        className={styles.cancel}
                        onClick={formik.handleReset}
                    >
                        Cancel
                    </Button>

                    <Button
                        endIcon={<SendIcon />}
                        // size="small"
                        variant="contained"
                        type="submit"
                        color="primary"
                        disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}
                        onClick={handleClickQuery}
                    >
                        Create
                    </Button>
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

export default TodoNew

