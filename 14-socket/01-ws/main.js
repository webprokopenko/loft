window.onload = function () {
    // создаем соединение
    const ws = new WebSocket('ws://localhost:8080');
  
    document.forms.push.onsubmit = function () {
      ws.send(this.message.value);
      return false;
    }
  
    ws.onmessage = function (event) {
      const message = JSON.parse(event.data);
      let text = '';
  
      switch (message.type) {
        case 'info':
          {
            text = message.message
            break;
          }
        case 'message':
          {
            text = `${message.author} : ${message.message}`;
            break;
          }
        default:
          {
            alert(message.message);
            break;
          }
      }
  
      const result = document.getElementById('subscribe');
      const messageElem = document.createElement('div');
      messageElem.textContent = text;
      result.appendChild(messageElem);
  
    }
  
  }