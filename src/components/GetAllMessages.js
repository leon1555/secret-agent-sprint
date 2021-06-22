import React, {useState} from 'react'

export default function GetAllMessages() {

    const [output, setOutput] = useState(<div>Hello</div>);
    async function readAllMessages() {     
        try {
            const response = await fetch('http://localhost:5001/messages')
            let messages = await response.json()
            setOutput(
                <table className="table mt-5">
                    <thead>
                        <tr>
                            <th>Agent ID</th>
                            <th>Date</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                    {messages.map(info => (
                        <tr>
                        <td>{info.agent_id}</td>
                            <td>{info.create_date}</td>
                            <td>{info.message}</td>
                        </tr>

                    ))}
                    </tbody>
                </table>
            )

        }            
        catch (error) {
            console.error(error.message)
        }
};

    return (
        <>
            <button className='btn btn-primary' onClick={readAllMessages}>All Messages</button>
            <div className='output'>{output}</div>
        </>
    )
}
