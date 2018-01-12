window.onload = function () {
    // создаем соединение
    const socket = io();

    document.forms.push.onsubmit = function () {
      socket.send(this.message.value);
      return false;
    }
    
    socket.on('message', (data) => {
      const message = data;
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
  
    });
}