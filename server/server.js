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
        let db = {
            type: "db",
            data: results
        }
        client.send(JSON.stringify(db));
      });

    client.on('close', function(ws) {
        console.log('User has left');
    })

    client.on('message', function incoming(message) {
        server.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === ws.OPEN) {
                let response = JSON.parse(message);
              if (response.type == "deletion") {
                  console.log(response);
                  connection.query('DELETE FROM articles WHERE id=' + response.data, function (error, result, fields) {
                    if (error) throw error;
                  });
              }
              if (response.type = "add") {
                  let properties = JSON.parse(response.data);
                  connection.query('INSERT INTO articles SET author="' + properties.author + '", category="' + properties.category + '", title="' + properties.title + '"', function (error, result, fields) {
                    if (error) throw error;
                  });
              }
            }
        });
    })
})