const ws = require('ws');
const mysql = require('mysql');

const server = new ws.Server({ port: 2607 });

server.on('connection', function(client) {
    console.log('User is here');

    let connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "articles"
    });

    connection.connect();

    connection.query('SELECT * FROM articles', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        client.send(JSON.stringify(results));
      });

    client.on('close', function(ws) {
        console.log('User has left');

        connection.end();
    })

    client.on('message', function incoming(data) {
        server.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === ws.OPEN) {
              client.send(data);
            }
        });
    })
})