var message = document.getElementById('message'),
    handle =  document.getElementById('handle'),
    feedback =  document.getElementById('feedback'),
    output  =    document.getElementById('output'),
    btn = document.getElementById('send');


var socket = io.connect("http://localhost:3000/");

btn.addEventListener('click',function(e){
  socket.emit('chat',{
    message:message.value,
    handle:handle.value
  });
  message.value = "";
});

message.addEventListener('keypress',function(e){
  socket.emit('typing', handle.value);
})



socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ':  </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
