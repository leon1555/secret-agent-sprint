import React from 'react'

export default function GetAllMessages() {
    let allMessages;     
    async () => {
        try {
            const response = await fetch('http://localhost:5001/messages')
            allMessages = await response.json()
            console.log(allMessages)
        }
                    
        catch (error) {
            console.error(error.message)
        }
    };
    return (
        <>
        <table className="table mt-5 text-center">
        <thead>
            <tr>
                <th>Agent ID</th>
                <th>Date</th>
                <th>Message</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
        </table>
        </>
    )
}
