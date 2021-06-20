const db = require('./queries')
const cors = require('cors');
const express = require('express');
const app = express();
const port = 5001;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (request, response) => {
    response.json({info: 'Node.js, Express, and Postgres API'})
});

app.get('/messages', db.getAllMessages);
app.get('/messages/:agent_id', db.getMessagesByAgent);
app.get('/messages/read/:read_agent_id', db.getMessagesReadByAgent);
app.get('/messages/structure/:structure_id', db.getMessagesByDeadDrop);
app.post('/messages/urgent', db.createUrgentMessage);
app.post('/messages/archival', db.createArchivalMessage);
app.put('/messages/urgent/:log_id', db.retrievalStampUrgent);
app.delete('/messages/urgent/:log_id', db.deleteMessageUrgent);
app.put('/messages/urgent/writeover/:log_id', db.writeOverMessageUrgent);
app.put('/messages/archival/:log_id', db.retrievalStampArchival);
app.delete('/messages/archival/:log_id', db.deleteMessageArchival);
app.put('/messages/archival/writeover/:log_id', db.writeOverMessageArchival);

app.listen(port, ()=> {
    console.log(`App running on port ${port}.`)
});
