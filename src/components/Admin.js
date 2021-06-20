import React, { useState } from 'react';

export default function Admin() {
    
    const [adminTable, setadminTable] = useState([]);

    // function getAllMessages

    async function getAllMessages() {     
            try {
                const response = await fetch('http://localhost:5001/messages')
                let allMessages = await response.json()
                console.log(allMessages);
                (setadminTable(allMessages));
                return adminTable

            }            
            catch (error) {
                console.error(error.message)
            }
    };

    // function getByStructure
    async function getByStructure() {     
        try {
            const response = await fetch('http://localhost:5001/messages/structure/1')
            let allMessages = await response.json()
            console.log(allMessages);
            (setadminTable(allMessages));
            return adminTable

        }            
        catch (error) {
            console.error(error.message)
        }
    };
    // function getByAgentID
    async function getByAgentId() {     
        try {
            const response = await fetch('http://localhost:5001/messages/86')
            let allMessages = await response.json()
            console.log(allMessages);
            (setadminTable(allMessages));
            return adminTable

        }            
        catch (error) {
            console.error(error.message)
        }
    };

    // function getByAgentReadID
    async function getByAgentReadId() {     
        try {
            const response = await fetch('http://localhost:5001/messages/read/86')
            let allMessages = await response.json()
            console.log(allMessages);
            (setadminTable(allMessages));
            return adminTable
        }            
        catch (error) {
            console.error(error.message)
        }
    };

    // function output() {
    //     console.log(`hello ${allMessages}`)
    //     allMessages.map(info => {
    //     <tr key={info.agent_id}>
    //         <td>{info.create_date}</td>
    //         <td>{info.message}</td>
    //     </tr>
    //     })
    // }
    // useEffect (() => {getAllMessages()}, []);

    return (
        <>
            <h2 className="text-center mt-5">Administrator</h2>
            <button className='btn btn-primary' onClick={getAllMessages}>List All Messages</button>
            <button className='btn btn-warning' onClick={getByStructure}>List Messages by Structure</button>
            <input type='text'></input>
            <button className='btn btn-success' onClick={getByAgentId}>List Messages by Agent</button>
            <input type='text'></input>
            <button className='btn btn-danger' onClick={getByAgentReadId}>List Messages Read by Agent</button>
            <input type='text'></input>

        </>
    )
}
