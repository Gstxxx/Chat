document.addEventListener('DOMContentLoaded', () => {
    const toggleChatButton = document.getElementById('toggle-chat');
    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');
    const sendMessageButton = document.getElementById('send-message');
    const messagesContainer = document.getElementById('messages');

    // Load saved messages
    const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    savedMessages.forEach(message => addMessageToChat(message));

    toggleChatButton.addEventListener('click', () => {
        chatBox.classList.toggle('open');
    });

    sendMessageButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            addMessageToChat(message);
            saveMessage(message);
            messageInput.value = '';
        }
    }

    function addMessageToChat(message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messagesContainer.appendChild(messageElement);
    }

    function saveMessage(message) {
        savedMessages.push(message);
        localStorage.setItem('messages', JSON.stringify(savedMessages));
    }
});
