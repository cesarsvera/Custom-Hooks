import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";


export const useTodo = () => {

    const initialState = [
        // {
        //     id: new Date().getTime(),
        //     decription: 'Recolectar la pieda del Alma',
        //     done: false
        // },
        

    ]

    const init = ()=>{
        return JSON.parse(localStorage.getItem('todos')) || [];
    }

    const [todos, dispatch] = useReducer(todoReducer, initialState, init);

    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])
    
    
    const handleNewTodo = (todo) =>{
        
        const action = {
            type: '[TODO] add Todo',
            payload: todo
        }

        dispatch(action);
    }

    const handleDeleteTodo = (id)=>{
        dispatch({
            type: '[TODO] remove Todo',
            payload: id
        })
    }

    const handleToggleTodo = (id)=>{
        dispatch({
            type: '[TODO] toggle Todo',
            payload: id
        })
    }

    


  return {
    
    todos,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
    todosCount: todos.length,
    pendingTodosCount: (todos.filter(todo=>!todo.done)).length

  }
}
