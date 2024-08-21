const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 }); // Start WebSocket server on port 3000

wss.on('connection', (ws) => {
    console.log('New client connected');
    console.log('Total connected clients:', wss.clients.size);

    ws.on('message', (message) => {
        // Convert the Buffer to a string
        const messageString = message.toString('utf-8');
        console.log('Received message:', messageString);

        // Broadcast the message to all clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                console.log('Sending message to a client:', messageString);
                client.send(messageString);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        console.log('Total connected clients:', wss.clients.size);
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

