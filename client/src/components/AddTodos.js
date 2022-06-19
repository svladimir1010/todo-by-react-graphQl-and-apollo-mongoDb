import React, { useContext, useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_TODO, UPDATE_TODO } from '../graphql/Mutation'
import { GET_TODO, GET_TODOS } from '../graphql/Query'
import moment from 'moment'
import { TodoContext } from '../TodoContext'

const AddTodos = () => {
    const { selectedId, setSelectedId } = useContext( TodoContext )
    const [ addTodo ] = useMutation( ADD_TODO )
    const [ updateTodo ] = useMutation( UPDATE_TODO )
    const formInputRef = useRef()
    const [ todo, setTodo ] = useState( {
        title: '',
        detail: '',
        date: '',
    } )

    const { loading, error, data } = useQuery( GET_TODO, {
        variables: { id: selectedId }, onCompleted: async data =>
            await setTodo( {
                ...data.getTodo,
                date: moment( data.getTodo.date ).format( 'yyyy-MM-DD' ),
            } ),
    } )

    useEffect( () => {
        const checkIfClickedOutside = e => {
            if( !formInputRef.current.contains( e.target ) ) {
                console.log( 'Outside input area' )
                setSelectedId( 0 )
                setTodo( { title: '', detail: '', date: '' } )
            } else console.log( 'Inside input area' )
        }
        document.addEventListener( 'mousedown', checkIfClickedOutside )
        return () => document.removeEventListener( 'mousedown', checkIfClickedOutside )
    }, [] )

    const onSubmit = async e => {
        e.preventDefault()
        if( !todo.title ) {
            alert( 'Пожалйста введите заголовок!' )
            return
        }
        if( !selectedId ) {
            await addTodo( {
                variables: {
                    title: todo.title,
                    detail: todo.detail,
                    date: todo.date,
                }, refetchQueries: [
                    { query: GET_TODOS },
                ],
            } )
        } else {
            await updateTodo( {
                variables: {
                    id: selectedId,
                    title: todo.title,
                    detail: todo.detail,
                    date: todo.date,
                }, refetchQueries: [
                    { query: GET_TODOS },
                ],
            } )
        }
        setTodo( { title: '', detail: '', date: '' } )
        e.target.reset()
    }

    return (
        <form ref={ formInputRef } onSubmit={ onSubmit }>
            <div className="mb-3">
                <label className="form-label">Title </label>
                {/*/!*<pre>{ JSON.stringify( todo, null, '\t' ) }</pre>*!/         для отладки*/ }
                <input type="text" className="form-control" placeholder="Enter title"
                       value={ todo?.title }
                       onChange={ e => setTodo( { ...todo, title: e.target.value } ) }
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Detail</label>
                <input type="text" className="form-control" placeholder="Enter detail"
                       value={ todo?.detail }
                       onChange={ e => setTodo( { ...todo, detail: e.target.value } ) }
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Date</label>
                <input required type="date" className="form-control"
                       value={ todo.date }
                       onChange={ e => setTodo( { ...todo, date: e.target.value } ) }
                />
            </div>
            <button type="submit" className="btn btn-primary">
                { !selectedId
                    ? 'Add Task'
                    : 'Update Task' }
            </button>
        </form>
    )
}

export default AddTodos
