import React from 'react'
import { Link } from 'react-router-dom'

export default function Agent() {
    return (
        <>
            <h2 className="text-center mt-4">AGENT MODE</h2>
            <div className='mt-5 text-center'>
                <Link to='/agent/urgent' className='btn btn-primary'>Urgent</Link>
                <Link to='/agent/archival' className='btn btn-warning'>Archival</Link>
            </div>
        </>
    )
}
