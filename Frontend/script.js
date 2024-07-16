// script.js

let responding = false;
const API_KEY = 'AIzaSyAJ2kfQBtMhNlwDF1sk7jXNeXKtq2pojwk'; // Replace with your Google API key
const CSE_ID = 'e338de760acbb4c31'; // Replace with your Custom Search Engine ID

function sendMessage() {
  const userInput = document.getElementById('userInput');
  const message = userInput.value.trim();

  if (message !== '' && !responding) {
    responding = true;
    disableSendButton();

    appendMessage(message, 'sent');
    userInput.value = '';

    simulateTypingAnimation();

    // Perform Google search
    searchGoogle(message)
      .then((searchResults) => {
        appendMessage(searchResults, 'received');
        responding = false;
        enableSendButton();
      })
      .catch((error) => {
        console.error('Error searching Google:', error);
        const errorMessage = 'Sorry, I encountered an error while searching Google.';
        appendMessage(errorMessage, 'received');
        responding = false;
        enableSendButton();
      })
      .finally(() => {
        removeTypingAnimation();
      });
  }
}

function appendMessage(message, type) {
  const chatbox = document.getElementById('chatbox');
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', type === 'sent' ? 'sent' : 'received');
  messageElement.innerHTML = type === 'sent' ? `You: ${message}` : message;
  chatbox.appendChild(messageElement);

  // Scroll to bottom of chatbox
  chatbox.scrollTop = chatbox.scrollHeight;
}

function simulateTypingAnimation() {
  const typingIndicator = document.createElement('div');
  typingIndicator.classList.add('typing-indicator');
  typingIndicator.innerHTML = '<span></span><span></span><span></span>';
  const chatbox = document.getElementById('chatbox');
  chatbox.appendChild(typingIndicator);
}

function searchGoogle(query) {
  return new Promise((resolve, reject) => {
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${API_KEY}&cx=${CSE_ID}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.items && data.items.length > 0) {
          const firstResult = data.items[0];
          const title = firstResult.title;
          const snippet = firstResult.snippet;
          const link = firstResult.link;
          const searchResults = `<strong>${title}</strong><br>${snippet}<br><a href="${link}" target="_blank">Read more</a>`;
          resolve(searchResults);
        } else {
          reject(new Error('No results found'));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function removeTypingAnimation() {
  const typingIndicator = document.querySelector('.typing-indicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

function disableSendButton() {
  const sendButton = document.querySelector('button');
  sendButton.disabled = true;
}

function enableSendButton() {
  const sendButton = document.querySelector('button');
  sendButton.disabled = false;
}
