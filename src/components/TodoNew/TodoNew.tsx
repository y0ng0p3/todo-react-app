import React from 'react'
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { CircularProgress } from '@material-ui/core';

import './todoNew.css';

    const initialValues = {
        name: '',
        dueDate: null,
        complete: false
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('Required !'),
        dueDate: Yup.date().required('Required !').nullable(),
        complete: Yup.boolean()
    })

    const validate = (values: { name: any; dueDate: any}) => {
        let errors = { name: '', dueDate: '' };

        if(!values.name) {
            errors.name = 'Required !';
        }

        if(!values.dueDate) {
            errors.dueDate = 'Required !';
        }

        return errors;
    }

    
    
    
function TodoNew() {
    const history = useHistory();
    
    
    const onSubmit = (values: any, onSubmitProps: any) => {
            setTimeout(() => {
                console.log('Form date', values);
                onSubmitProps.setSubmitting(false);
                history.push("/list");
        }, 3000);
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        // validate
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

    /* const onSubmit = (values, onSubmitProps) => {

        console.log('Form data', values);
        setTimeout(() => {
            onSubmitProps.setSubmitting(false);
            history.push("/list");
        }, 3000);

    }; */

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
        <form onSubmit={formik.handleSubmit} className='new-form'>
            <div className='new-form__control'>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    {...formik.getFieldProps('name')}
                />
                {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
            </div>

            <div className='new-form__control'>
                <label htmlFor="dueDate">Due Date</label>
                <input
                    id="dueDate"
                    type="text"
                    {...formik.getFieldProps('dueDate')}
                />
                {formik.touched.dueDate && formik.errors.dueDate ? <div className="error">{formik.errors.dueDate}</div> : null}
            </div>

            <div className='new-form__control'>
                <input
                    id="complete"
                    type="checkbox"
                    {...formik.getFieldProps('complete')}
                />
                <label htmlFor="complete">Complete</label>
            </div>
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
        </form>
    )
}

export default TodoNew
