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
app.get('/messages/agent/:agent_id', db.getMessagesByAgent);
app.get('/messages/read', db.getMessagesRead);
app.get('/messages/structure/:structure_id', db.getMessagesByDeadDrop);
app.get('/messages/urgent', db.getUrgentMessage);
app.get('/messages/archival', db.getArchivalMessage);

app.post('/messages/urgent/compose', db.createUrgentMessage);
app.post('/messages/archival/compose', db.createArchivalMessage);
app.post('/messages/destroyed', db.addDestroyedMessage);

app.put('/messages/urgent/:log_id', db.retrievalStampUrgent);
app.put('/messages/archival/:log_id', db.retrievalStampArchival);

app.delete('/messages/urgent/:log_id', db.deleteMessageUrgent);
app.delete('/messages/archival/:log_id', db.deleteMessageArchival);

app.listen(port, ()=> {
    console.log(`App running on port ${port}.`)
});
