const net = require('net');
const client = new net.Socket();
const port = 7070;
const host = '127.0.0.1';

client.connect(port, host, onConnectHandler);
client.on('data', onDataHandler);
client.on('close', onCloseHandler);

function onConnectHandler() {
    console.log('Connected');
    client.write("Hello From Client " + client.address().address);
}

function onDataHandler(data) {
    console.log('Server Says : ' + data);
    client.destroy(); // kill client after server's response and closes the connection
}

function onCloseHandler() {
    console.log('Connection closed');
}