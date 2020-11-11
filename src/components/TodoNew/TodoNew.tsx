import React from 'react'
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { CircularProgress } from '@material-ui/core';

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

/*const onSubmit = (values, onSubmitProps) => {
        setTimeout(() => {
            console.log('Form date', values);
            onSubmitProps.setSubmitting(false);
            history.push("/list");
    }, 3000);
 */
function TodoNew() {

    const history = useHistory();

    const formik = useFormik({
        initialValues,
        onSubmit: (values, onSubmitProps) => {
            setTimeout(() => {
                console.log('Form date', values);
                onSubmitProps.setSubmitting(false);
                history.push("/list");
        }, 3000);
        },
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
            </div>

            <div className='new-form__control'>
                <label htmlFor="dueDate">Due Date</label>
                <input
                    id="dueDate"
                    type="text"
                    {...formik.getFieldProps('dueDate')}
                />
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
