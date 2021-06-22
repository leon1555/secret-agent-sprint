import React from 'react'
import { Link } from 'react-router-dom';

export default function Login() {
    return (
        <>
            <div className='container text-center mt-5'>
                <Link to='/agent' className='btn btn-primary mx-5'>Agent Mode</Link>
                <Link to='/admin' className='btn btn-dark mx-5'>Admin Mode</Link>
            </div>
        </>
    )
}
