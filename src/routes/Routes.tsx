import React, { lazy } from 'react'

import { Route, Switch } from 'react-router-dom';

const TodoNew = lazy(() => import('../components/TodoNew/TodoNew'));
const TodoList = lazy(() => import('../components/TodoList/TodoList'));
const TodoEdit = lazy(() => import('../components/TodoEdit/TodoEdit'));

function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={TodoList}/>
            <Route path="/list" component={TodoList} />
            <Route path="/new" component={TodoNew}/>
            {/* <Route path="/edit" component={TodoEdit}/> */}
            <Route path="/edit/:id" component={TodoEdit}/>
        </Switch>
    )
}

export default Routes
