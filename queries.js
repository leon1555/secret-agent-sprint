const pool = require('./pool');

// ADMINISTRATOR QUERIES //

// Retrieve all messages
const getAllMessages = (request, response) => {
  pool.query('SELECT agent_id, create_date, message FROM stack_intel UNION SELECT agent_id, create_date, message FROM q_intel', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Retrieve all messages written by a particular agent
const getMessagesByAgent = (request, response) => {
    const agent_id = parseInt(request.params.agent_id)
    pool.query('SELECT agent_id, structure_id, create_date, message FROM stack_intel WHERE agent_id = $1 UNION SELECT agent_id, structure_id, create_date, message FROM q_intel WHERE agent_id = $1;', [agent_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
};

// Retrieve all messages read by a particular agent
const getMessagesRead = (request, response) => {
    pool.query('SELECT agent_id, create_date, message, read_date FROM read_messages;', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
};


// Retrieve all messages by dead-drop
const getMessagesByDeadDrop = (request, response) => {
    const structure_id = parseInt(request.params.structure_id)
    pool.query('SELECT structure_id, agent_id, create_date, message FROM stack_intel WHERE structure_id = $1 UNION SELECT structure_id, agent_id, create_date, message FROM q_intel WHERE structure_id = $1;', [structure_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
};
// AGENT QUERIES

const addDestroyedMessage = (request, response) => {
  const { agent_id, structure_id, message, create_date, read_date } = request.body
  pool.query('INSERT INTO read_messages (agent_id, structure_id, message, create_date, read_date) VALUES ($1, $2, $3, $4, $5)', [agent_id, structure_id, message, create_date, read_date], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send('Message added!')
  })
}

// QUERIES WITH STACK

// Post a new urgent message (to the stack table)
const createUrgentMessage = (request, response) => {
    const { agent_id, structure_id, message, create_date } = request.body
    pool.query('INSERT INTO stack_intel (agent_id, structure_id, message, create_date) VALUES ($1, $2, $3, $4)', [agent_id, structure_id, message, create_date], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send('Message added!')
    })
  }

// Add a read date and id of reading agent (stack)
const retrievalStampUrgent = (request, response) => {
  const { read_date, read_agent_id, log_id } = request.body
  pool.query(
    'UPDATE stack_intel SET read_date = $1, read_agent_id = $2 WHERE log_id = $3',
    [read_date, read_agent_id, log_id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send('Message retrieved!')
    }
  )
}

// Delete message (stack)
const deleteMessageUrgent = (request, response) => {
  const log_id = parseInt(request.params.log_id)
  pool.query('DELETE FROM stack_intel WHERE log_id = $1', [log_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send('Message eliminated!')
  })
}

// Read urgent (latest) message (stack)
// const getAllMessages = (request, response) => {
//   pool.query('SELECT agent_id, create_date, message FROM stack_intel UNION SELECT agent_id, create_date, message FROM q_intel', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }
const getUrgentMessage = (request, response) => {
  pool.query('SELECT * FROM stack_intel ORDER BY create_date DESC LIMIT 1', (error, results) => {
    if(error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


// QUERIES WITH QUEUE //

// Post a new archival message (to the queue table)
const createArchivalMessage = (request, response) => {
  const { agent_id, structure_id, message, create_date } = request.body
  pool.query('INSERT INTO q_intel (agent_id, structure_id, message, create_date) VALUES ($1, $2, $3, $4)', [agent_id, structure_id, message, create_date], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send('Message added!')
  })
}

// Add a read date and id of reading agent (queue)
const retrievalStampArchival = (request, response) => {
  const { read_date, read_agent_id, log_id } = request.body
  pool.query(
    'UPDATE queue_intel SET read_date = $1, read_agent_id = $2 WHERE log_id = $3',
    [read_date, read_agent_id, log_id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send('Message retrieved!')
    }
  )
}

// Delete message (queue)
const deleteMessageArchival = (request, response) => {
  const log_id = parseInt(request.params.log_id);
  pool.query('DELETE FROM q_intel WHERE log_id = $1', [log_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send('Message eliminated!')
  })
}

// Read archival (oldest) message (queue)
const getArchivalMessage = (request, response) => {
  pool.query('SELECT * FROM q_intel ORDER BY create_date LIMIT 1', (error, results) => {
    if(error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
    getAllMessages,
    getMessagesByAgent,
    getMessagesRead,
    getMessagesByDeadDrop,
    createUrgentMessage,
    createArchivalMessage,
    retrievalStampUrgent,
    deleteMessageUrgent,
    retrievalStampArchival,
    deleteMessageArchival,
    getUrgentMessage,
    getArchivalMessage,
    addDestroyedMessage
};

