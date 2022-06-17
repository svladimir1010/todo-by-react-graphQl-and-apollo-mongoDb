import './App.css'
import { GET_TODOS } from './graphql/Query'
import { useQuery } from '@apollo/client'
import AddTodos from './components/AddTodos'
import Todo from './components/Todo'

function App() {
    const { loading, error, data } = useQuery( GET_TODOS )
    console.log( data )

    if( loading ) return 'Loading...'
    if( error ) return `Error! ${ error.message }`

    return (
        <div className="container todo_box">
            <AddTodos/>
            <hr/>
            <div className="list-group">
                { data?.getTodos.map( todo => (
                    <Todo key={ todo.id }
                          id={ todo.id }
                          title={ todo.title }
                          detail={ todo.detail }
                          date={ todo.date }/>
                ) ) }
            </div>
        </div>
    )
}

export default App
