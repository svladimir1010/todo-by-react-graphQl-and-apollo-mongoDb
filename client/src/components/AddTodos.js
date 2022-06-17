import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_TODO } from '../graphql/Mutation'
import { GET_TODOS } from '../graphql/Query'
import moment from 'moment'

const AddTodos = () => {

    const [ todo, setTodo ] = useState( {
        title: '',
        detail: '',
        date: '',
    } )

    const [ addTodo ] = useMutation( ADD_TODO )
    const onSubmit = async e => {
        e.preventDefault()
        await addTodo( {
            variables: {
                title: todo.title,
                detail: todo.detail,
                date: todo.date,
            }, refetchQueries: [
                { query: GET_TODOS },
            ],
        } )
    }
    return (
        <form onSubmit={ onSubmit }>
            <div className="mb-3">
                <label>Title</label>
                {/*<pre>{ JSON.stringify( todo, null, '\t' ) }</pre>*/}
                <input type="text" className="form-control" placeholder="Enter title"
                       value={ todo.title }
                       onChange={ e => setTodo( { ...todo, title: e.target.value } ) }
                />
            </div>
            <div className="mb-3">
                <label>Detail</label>
                <input type="text" className="form-control" placeholder="Enter detail"
                       value={ todo.detail }
                       onChange={ e => setTodo( { ...todo, detail: e.target.value } ) }
                />
            </div>
            <div className="mb-3">
                <label>Date</label>
                <input required type="date" className="form-control" placeholder="yyyy-MM-dd"
                       onChange={ e => setTodo( { ...todo, date: moment( e.target.value ).format( 'DD.MMM.YYYY' ) } ) }
                />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default AddTodos
