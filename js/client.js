const socket = io("http://localhost:8000");


const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

let audio = new Audio('notification.mp3');


const Name = prompt("Enter Your Name To Join");


const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'right'){
        audio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'left');
    socket.emit('send', message);
    messageInput.value = '';
})

socket.emit('new-user-joined', Name);

socket.on('user-joined', Name=>{
    append(`${Name} joined the chat`,'right')
})

socket.on('receive', data=>{
    append(`${data.Name} : ${data.message}`,'right')
})

socket.on('left', Name=>{
    append(`${Name} left the chat`, 'right')
})