import create, { SetState, GetState } from 'zustand';

export interface ITodo {
    id: string,
    name: string,
    dueDate: Date,
    complete: boolean
}

type TodoStore = {
    todos: ITodo[],
    addTodo: (todo: ITodo) => void;
    updateTodo: (todo: ITodo) => void; 
    deleteTodo: (idsToDelete: string[]) => void;
};

export const useTodoStore = create<TodoStore>(
    (
        set: SetState<TodoStore>,
        get: GetState<TodoStore>
    ) => ({
        todos: [],
        addTodo: (newTodo: ITodo) => {
            const {todos} = get();
            set({todos: [...todos, newTodo]});
            /* const {todos} = get()
            todos.push(newTodo)
            set({todos:todos}) */
        },
        updateTodo: (updatedTodo: ITodo) => {
            const {todos} = get();
            const index = todos.findIndex(todo => todo.id === updatedTodo.id);
            if(-1 === index) {
                set({todos: todos});
            }else {
                set({todos: [...todos.slice(0, index), updatedTodo, ...todos.slice(index + 1)]});
            }
        },
        deleteTodo: (ids: string[]) => {
            const {todos} = get();
            for(var i = 0; i < ids.length; i++) {
                set({todos: todos.filter(todo => todo.id !== ids[i])});
            }
        }
    })
)