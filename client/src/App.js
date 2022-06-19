import './App.css'
import { GET_TODOS } from './graphql/Query'
import { useQuery } from '@apollo/client'
import AddTodos from './components/AddTodos'
import Todo from './components/Todo'
import { useState } from 'react'
import { TodoContext } from './TodoContext'
import moment from 'moment'

function App() {
    const [ selectedId, setSelectedId ] = useState( 0 )
    const { loading, error, data } = useQuery( GET_TODOS )

    if( loading ) return 'Loading...'
    if( error ) return `Error! ${ error.message }`

    return (
        <TodoContext.Provider value={ { selectedId, setSelectedId } }>
            <div className="container todo_box">
                <AddTodos/>
                <hr/>
                <div className="list-group">
                    { data?.getTodos.map( todo => (
                        <Todo key={ todo.id }
                              id={ todo.id }
                              title={ todo.title }
                              detail={ todo.detail }
                              date={ moment( todo.date ).format( 'DD.MMM.YYYY' ) }/>

                    ) ) }
                </div>
            </div>
        </TodoContext.Provider>
    )
}

export default App
