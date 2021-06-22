import React, { useState } from 'react';

export default function Urgent() {
    let d = new Date();
    let dString = d.toISOString();

    const [input, setInput] = useState('');
    const [output, setOutput] = useState([]);
    const [agentId, setAgentId] = useState(99);

    function composeMessage(){
        setInput(
            <>
            <div></div>
            <input type='text-field'></input>
            </>
        )
    }

    async function deleteMessage(id) {
        // an initial fetch call to the displayed message to copy it to the 'destroyed' messages table before deletion from the stack table.

        try {
            const response = await fetch(`http://localhost:5001/messages/urgent/${id}`, {
                method: 'DELETE'
            });
            setOutput(
                <h5 className='text-center mt-5'>Message Destroyed!</h5>
                )
        }   catch (error) {
                console.error(error.message)
            }
        }

    async function readMessage(e) {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/messages/urgent')
            let messageArray = await response.json()
            console.log(messageArray);
            let message = messageArray[0];
            setOutput(
                <>
                <div className='m-5'>
                    <h5>Agent ID: {message.agent_id}</h5>
                    <h5>Structure ID: {message.structure_id}</h5>
                    <h5 className='mt-4'>Message: {message.message}</h5>
                </div>
                <button className='btn btn-danger mt-5' onClick={deleteMessage}>Done/Destroy</button>
                </>
            )
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div>
            <h2 className="text-center mt-4">AGENT MODE</h2>
            <h3 className="text-center mt-4">Urgent Message Service</h3>
            <div className='mt-5 text-center'>
                <button className='btn btn-primary mx-3' onClick={composeMessage}>Compose Message</button>
                <button className='btn btn-warning mx-3' onClick={readMessage} >Read Message</button>
            </div>
            <div>{input}</div>
            <div>{output}</div>
        </div>
    )
}

    ///////// IGNORE ///////
    // async function postDestroyedMessage() {
    //     try {
    //         const response = await fetch('http://localhost:5001/messages/urgent')
    //         let messageArray = await response.json()
    //         console.log(messageArray);
    //         let message = messageArray[0];

    //         const responseTwo = await fetch ('http://localhost:5001/messages/destroyed', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: {
    //                     agent_id: message.agent_id,
    //                     structure_id: message.structure_id,
    //                     message: message.message,
    //                     create_date: message.create_date,
    //                     read_date: dString
    //             }
    //         })
    //     }
    // }
    
