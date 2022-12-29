const net = require('net');
const port = 7070;
const host = '127.0.0.1';

// create and start server
const server = net.createServer();
server.listen(port, host, () => {
    console.log('TCP Server is running on port ' + port + '.');
});

// assign connection handler to the server
server.on('connection', onConnectionHandler);

// holds list of connections
let sockets = [];

// connection handler, for each new connection this function will be called
function onConnectionHandler(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    sockets.push(sock);

    // assign handlers to data and close events
    sock.on('data', onDataHandler);
    sock.on('close', onCloseHandler);

    // callback function which is called everytime this connection get data
    function onDataHandler(data) {
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        // write the data back to all the connected, the client will receive it as data from the server
        sockets.forEach(function (sock, index, array) {
            sock.write(sock.remoteAddress + ':' + sock.remotePort + " said " + data + '\n');
        });
    }

    // callback function which is called whenever this connection get closed
    function onCloseHandler(data) {
        let index = sockets.findIndex(function (o) {
            return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
        })
        if (index !== -1) sockets.splice(index, 1);
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    }
}

