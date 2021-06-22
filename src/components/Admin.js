import React, { useState } from "react";

export default function Admin() {
    
  const [output, setOutput] = useState(<div></div>);
  const [agentId, setAgentId] = useState(86);
  const [structureId, setStructureId] = useState(1);

  // Retrieve all messages (from stack and queue) (activated from Main Menu)
  async function getAllMessages() {
    try {
      const response = await fetch("http://localhost:5001/messages");
      let messages = await response.json();
      setOutput(
        <>
          <h3 className="text-center mt-5">All Messages</h3>
          <table className="table mt-5">
            <thead>
              <tr>
                <th>Agent ID</th>
                <th>Date</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((info) => (
                <tr>
                  <td>{info.agent_id}</td>
                  <td>{info.create_date}</td>
                  <td>{info.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    } catch (error) {
      console.error(error.message);
    }
  }

  // Get all messages dropped in a particular structure (activated from modal)

  async function getByStructure() {
    try {
      const response = await fetch(
        `http://localhost:5001/messages/structure/${structureId}`
      );
      let messages = await response.json();
      console.log(messages);
      setOutput(
        <>
          <h3 className="text-center mt-5">{`Messages dropped in Structure ID #${structureId}`}</h3>
          <table className="table mt-5">
            <thead>
              <tr>
                <th>Agent ID</th>
                <th>Date</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((info) => (
                <tr>
                  <td>{info.agent_id}</td>
                  <td>{info.create_date}</td>
                  <td>{info.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    } catch (error) {
      console.error(error.message);
    }
  }
  // Get messages created by a particular agent (activated from modal)
  async function getByAgentId() {
    try {
      const response = await fetch(
        `http://localhost:5001/messages/agent/${agentId}`
      );
      let messages = await response.json();
      console.log(messages);
      setOutput(
        <>
          <h3 className="text-center mt-5">{`Messages from Agent ID #${agentId}`}</h3>
          <table className="table mt-5">
            <thead>
              <tr>
                <th>Structure ID</th>
                <th>Date</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((info) => (
                <tr>
                  <td>{info.structure_id}</td>
                  <td>{info.create_date}</td>
                  <td>{info.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    } catch (error) {
      console.error(error.message);
    }
  }

  // get "destroyed messages (already read)
  async function getMessagesRead() {
    try {
      const response = await fetch("http://localhost:5001/messages/read");
      let messages = await response.json();
      setOutput(
        <table className="table mt-5">
          <thead>
            <tr>
              <th>Agent ID</th>
              <th>Message</th>
              <th>Date</th>
              <th>Read</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((info) => (
              <tr>
                <td>{info.agent_id}</td>
                <td>{info.message}</td>
                <td>{info.create_date}</td>
                <td>{info.read_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } catch (error) {
      console.error(error.message);
    }
  }

  // RADIO HANDLERS
  function radioHandlerStructure(e) {
    setStructureId(e.target.value);
  }

  function radioHandlerAgent(e) {
    setAgentId(e.target.value);
  }

  return (
    <>
      <h2 className="text-center mt-4">ADMINISTRATOR MODE</h2>
      <div className="mt-5 text-center">
        <button className="btn btn-primary mx-3" onClick={getAllMessages}>
          All Messages
        </button>
        <button
          className="btn btn-warning mx-3"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#structureModal"
        >
          Messages by Structure
        </button>
        <button
          className="btn btn-success mx-3"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#agentModal"
        >
          Messages by Agent
        </button>

        <button className="btn btn-danger mx-3" onClick={getMessagesRead}>
          Get 'Destroyed' Messages
        </button>
      </div>
      <div className="output">{output}</div>

      {/* STRUCTURE MODAL */}
      <div
        className="modal fade"
        id="structureModal"
        tabindex="-1"
        aria-labelledby="structureModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="structureModalLabel">
                Select Structure ID
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="radio-form" onChange={radioHandlerStructure}>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    value="1"
                    name="structure-id"
                    className="form-check-input"
                    id="radio1"
                  />
                  <label className="form-check-label" for="radio1">
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
                  <label className="form-check-label" for="radio2">
                    2
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    value="3"
                    name="structure-id"
                    className="form-check-input"
                  />
                  <label className="form-check-label" for="radio3">
                    3
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    value="4"
                    name="structure-id"
                    className="form-check-input"
                  />
                  <label className="form-check-label" for="radio4">
                    4
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    value="5"
                    name="structure-id"
                    className="form-check-input"
                  />
                  <label className="form-check-label" for="radio5">
                    5
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={getByStructure}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AGENT MODAL */}
      <div
        className="modal fade"
        id="agentModal"
        tabindex="-1"
        aria-labelledby="agentModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="agentModalLabel">
                Select Agent ID
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="radio-form" onChange={radioHandlerAgent}>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    value="7"
                    name="structure-id"
                    className="form-check-input"
                    id="radio1"
                  />
                  <label className="form-check-label" for="radio1">
                    7
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    value="8"
                    name="structure-id"
                    className="form-check-input"
                    id="radio2"
                  />
                  <label className="form-check-label" for="radio2">
                    8
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    value="24"
                    name="structure-id"
                    className="form-check-input"
                  />
                  <label className="form-check-label" for="radio3">
                    24
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    value="86"
                    name="structure-id"
                    className="form-check-input"
                  />
                  <label className="form-check-label" for="radio4">
                    86
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    value="99"
                    name="structure-id"
                    className="form-check-input"
                  />
                  <label className="form-check-label" for="radio5">
                    99
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={getByAgentId}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
