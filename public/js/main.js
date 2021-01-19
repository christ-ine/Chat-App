const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const socket = io();

//Message from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    //Scroll down when new message is sent
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Get message text
    const msg = e.target.elements.msg.value

    //Emit message to server
    socket.emit('chatMessage', msg)

    //Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

//output message to DOM
function outputMessage(message){
    const div = document.createElement('div')
    div.classList.add('message');
    div.innerHTML = `<p class="meta">User <span>time</span></p>
    <p class="text">
     ${message}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div)
}