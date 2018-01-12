const WebSocket = require('ws');

const webSocketServer = new WebSocket.Server({ port: 8080 });

const clients = [];

webSocketServer.on('connection', ws => {
  const id = clients.length;
  clients[id] = ws;
  console.log(`Hoвoe соединение #${id}`);

  clients[id].send(
    JSON.stringify({
      type: 'hello',
      message: `Приветствуем! ваш идентификатор  ${id}`,
      data: id
    })
  );

  ws.on('message', message => {
    console.log(`Пoлyчeнo сообщение: ${message}`);
    clients.forEach((elem) => {
      elem.send(
        JSON.stringify({ type: 'message', message: message, author: id })
      );
    });
  });

  clients.forEach((elem) => {
    elem.send(
      JSON.stringify({ type: 'info', message: `K нам присоединился #${id}` })
    );
  });

  ws.on('close', () => {
    console.log(`delete ${id}`);
    delete clients[id];
  });

  ws.on('error', err => console.log(err.message));
});