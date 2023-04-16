const ws = new WebSocket(`https://api.openai.com/v1/api/ws/chat`);
ws.addEventListener('open', function (event) {
   console.log("开启webscoket");
   
});
ws.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});