
var server = require('ws').Server;
var s = new server({ port: 5001 });

s.on("connection", function (ws) {
    ws.on("message", function (message) {
        console.log("Received: " + message);

        message = JSON.parse(message);

        if (message.type === "name") {
            ws.personName = message.data;
            return;
        }

        s.clients.forEach(function (client) {
            if (client === ws) return;
            client.send(JSON.stringify({
                name: ws.personName,
                data: message.data
            }));
        });

        // ws.send("From server: " + message);
    });

    ws.on("close", function () {
        console.log("I lost a client");
    });
});