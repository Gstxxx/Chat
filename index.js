document.addEventListener('DOMContentLoaded', () => {
    const toggleChatButton = document.getElementById('toggle-chat');
    const chatBox = document.getElementById('chat-box');
    const chatIcon = document.getElementById('chat-icon');
    const messageInput = document.getElementById('message-input');
    const sendMessageButton = document.getElementById('send-message');
    const messagesContainer = document.getElementById('messages');
    const sendSound = document.getElementById('send-sound');

    // Load saved messages
    const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    savedMessages.forEach(message => addMessageToChat(message.text, message.type));

    toggleChatButton.addEventListener('click', () => {
        chatBox.classList.toggle('open');
        chatIcon.classList.toggle('fa-comments');
        chatIcon.classList.toggle('fa-times');
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
            addMessageToChat(message, 'sent');
            saveMessage(message, 'sent');
            messageInput.value = '';
            playSendSound();
        }
    }

    function addMessageToChat(message, type) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.classList.add('message', type);

        if (type === 'sent') {
            const statusElement = document.createElement('span');
            statusElement.classList.add('message-status');
            statusElement.innerHTML = '<i class="fas fa-clock"></i>';
            messageElement.appendChild(statusElement);

            setTimeout(() => {
                statusElement.innerHTML = '<i class="fas fa-check-double"></i>';
            }, 600);

            setTimeout(() => {
                statusElement.querySelector('i').style.color = 'blue';
            }, 750);
        }

        messagesContainer.appendChild(messageElement);
        setTimeout(() => {
            messageElement.classList.add('show'); // Add the show class to trigger the fade-in animation
        }, 10); // Slight delay to allow DOM insertion before animation starts

        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function saveMessage(message, type) {
        savedMessages.push({ text: message, type });
        localStorage.setItem('messages', JSON.stringify(savedMessages));
    }

    function playSendSound() {
        sendSound.currentTime = 0;
        sendSound.play();
    }
});
