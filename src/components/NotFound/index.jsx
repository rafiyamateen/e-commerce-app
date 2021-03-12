import React from 'react'
import './NotFound.css'
import notFound from './../../assets/images/notFound.png'

const NotFound = () => {
    return (
        <div id='notFound'>
            <h2>Oops!  Path not found</h2>
            <h1>404
            <img src={notFound} alt='Path Not Found' />
            </h1>
        </div>
    )
}
export default NotFound