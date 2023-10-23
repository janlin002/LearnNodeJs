const WebSocket = require('ws')
const uuidv4 = require('uuid').v4

const wss1 = new WebSocket.WebSocketServer({ noServer: true });

wss1.on('connection', function connection(ws) {
    ws.on('error', console.error);
  
    // console.log('連線成功')

    const uuid = uuidv4() // 判斷用戶
    ws.uuid = uuid

    const user = {
      context: 'user',
      uuid
    }

    // 發訊息給用戶 (只能是字串)
    ws.send(JSON.stringify(user))

    // 監聽使用者傳遞的訊息
    ws.on('message', (message) => {
      const msg = JSON.parse(message)

      const newMessage = {
        context: 'message',
        uuid,
        content: msg.content
      }

      // 回傳
      // ws.send(JSON.stringify(newMessage))
      sendAllUser(newMessage)
    })

    // 推播給其他用戶
    function sendAllUser(msg){
      wss1.clients.forEach(function (client) {
        // 推播給非自己以外的使用者
        if (client.readyState === WebSocket.OPEN && client.uuid !== msg.uuid) {
          client.send(JSON.stringify(msg));
        }
      });
    }
    
  });

  module.exports = wss1