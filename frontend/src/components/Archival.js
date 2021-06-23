import React, { useState } from "react";

export default function Archival() {
  let d = new Date();
  let dString = d.toISOString();

  const [showOutput, setShowOutput] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [destroyedMessage, setDestroyedMessage] = useState(<div></div>);
  const [agentId, setAgentId] = useState(99);
  const [structureId, setStructureId] = useState(1);
  const [responseMessage, setResponseMessage] = useState("");
  const [secretMessage, setSecretMessage] = useState("RED RUM");

  // RADIO BUTTON SELECTION HANDLERS
  function radioHandlerStructure(e) {
    setStructureId(e.target.value);
  }
  function radioHandlerAgent(e) {
    setAgentId(e.target.value);
  }

  function composeMessage() {
    setShowOutput(false);

    // The following is rendered when the "Compose Message" button is clicked
    setShowInput(true);
  }

  async function sendMessage(evt, agent_id, structure_id, message) {
    evt.preventDefault();
    console.log("structure id: ", structureId);
    console.log("agent id: ", agentId);
    try {
      const sendMessageResponse = await fetch(
        "http://localhost:5001/messages/archival/compose",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            agent_id: agent_id,
            structure_id: structure_id,
            message: message,
            create_date: dString,
          }),
        }
      );
    } catch (error) {
      console.error(error.message);
    }
  }

  async function deleteMessage(
    e,
    id,
    agent_id,
    structure_id,
    message,
    create_date
  ) {
    e.preventDefault();
    // the initial fetch posts the displayed message to the 'read_messages' table before the second fetch deletes the message from the queue table.
    try {
      const destroyedTableResponse = await fetch(
        "http://localhost:5001/messages/destroyed",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            agent_id: agent_id,
            structure_id: structure_id,
            message: message,
            create_date: create_date,
            read_date: dString,
          }),
        }
      );
    } catch (error) {
      console.error(error.message);
    }

    try {
      const response = await fetch(
        `http://localhost:5001/messages/archival/${id}`,
        {
          method: "DELETE",
        }
      );

      setDestroyedMessage("Message destroyed!");
      setShowOutput(true);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function readMessage() {
    try {
      setShowInput(false);
      const response = await fetch("http://localhost:5001/messages/archival");
      let messageArray = await response.json();
      console.log(messageArray);
      setResponseMessage(messageArray[0]);
      setShowOutput(true);
      setDestroyedMessage(<div></div>);
    } catch (error) {
      console.error(error.message);
    }
  }

  let input_html = null;

  if(showInput){
    input_html =   <>
        {/* AGENT ID RADIO SELECTORS */}
        <div
          className="radio-form text-center mt-5"
          onChange={radioHandlerAgent}
        >
          <h5>Which is your agent ID?</h5>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              value="7"
              name="agent-id"
              className="form-check-input"
              id="radioA"
            />
            <label className="form-check-label" htmlFor="radioA">
              7
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              value="8"
              name="agent-id"
              className="form-check-input"
              id="radioB"
            />
            <label className="form-check-label" htmlFor="radioB">
              8
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              value="24"
              name="agent-id"
              className="form-check-input"
              id="radioC"
            />
            <label className="form-check-label" htmlFor="radioC">
              24
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              value="86"
              name="agent-id"
              className="form-check-input"
              id="radioD"
            />
            <label className="form-check-label" htmlFor="radioD">
              86
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              value="99"
              name="agent-id"
              className="form-check-input"
              id="radioE"
            />
            <label className="form-check-label" htmlFor="radioE">
              99
            </label>
          </div>
        </div>

        {/* STRUCTURE ID RADIO SELECTORS */}
        <div
          className="radio-form text-center mt-4"
          onChange={radioHandlerStructure}
        >
          <h5>
            Select the ID of the structure into which you want to drop the
            messsage:
          </h5>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              value="1"
              name="structure-id"
              className="form-check-input"
              id="radio1"
            />
            <label className="form-check-label" htmlFor="radio1">
              1
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              value="2"
              name="structure-id"
              className="form-check-input"
              id="radio2"
            />
            <label className="form-check-label" htmlFor="radio2">
              2
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              value="3"
              name="structure-id"
              className="form-check-input"
              id="radio3"
            />
            <label className="form-check-label" htmlFor="radio3">
              3
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              value="4"
              name="structure-id"
              className="form-check-input"
              id="radio4"
            />
            <label className="form-check-label" htmlFor="radio4">
              4
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              value="5"
              name="structure-id"
              className="form-check-input"
              id="radio5"
            />
            <label className="form-check-label" htmlFor="radio5">
              5
            </label>
          </div>
        </div>

        {/* MESSAGE FIELD */}
        <div className="text-center mt-4">
          <h5>Message:</h5>
          <input
            type="text"
            size="70"
            id="message-text"
            placeholder="Message text"
          ></input>
        </div>
        <div className="text-center">

          <button
            className="btn btn-success mt-5"
            onClick={(evt) =>
              sendMessage(evt, agentId, structureId, secretMessage)
            }
          >
            Send Message
          </button>
        </div>
      </> 
  }


  return (
    <div>
      <h2 className="text-center mt-4">AGENT MODE</h2>
      <h3 className="text-center mt-4">Message Archive</h3>
      <div className="mt-5 text-center">
        <button className="btn btn-primary mx-3" onClick={composeMessage}>
          Compose Message
        </button>
        <button className="btn btn-warning mx-3" onClick={readMessage}>
          Read Message
        </button>
      </div>
      <div>{input_html}</div>
      {/* The following is rendered only after the "Read Message" button has been clicked */}
      {showOutput &&
        (destroyedMessage === "Message destroyed!" ? (
          <h5 className="text-center mt-5">
            Message Destroyed! (well, moved to the "Read Messages" table :-D)
          </h5>
        ) : (
          <div className='text-center'>
            <div className="m-5">
              <h5>Agent ID: {responseMessage.agent_id}</h5>
              <h5>Structure ID: {responseMessage.structure_id}</h5>
              <h5 className="mt-4">Message: {responseMessage.message}</h5>
            </div>
            <button
              className="btn btn-danger mt-5"
              onClick={(evt) =>
                deleteMessage(
                  evt,
                  responseMessage.log_id,
                  responseMessage.agent_id,
                  responseMessage.structure_id,
                  responseMessage.message,
                  responseMessage.create_date
                )
              }
            >
              Done and Destroy
            </button>
          </div>
        ))}
    </div>
  );
}
