const serverUrl = "http://localhost:3000";

const usernameInput = document.getElementById("usernameInput");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const messagesContainer = document.getElementById("messages");
const errorMessage = document.getElementById("errorMessage");

async function getMessages() {
  const response = await fetch(`${serverUrl}/messages`);

  if (!response.ok) {
    console.error("Server returned:", response.status);
    return;
  }

  const messages = await response.json();

  messagesContainer.innerHTML = "";

  messages.forEach((message) => {
    const messageElement = document.createElement("p");

    messageElement.textContent = `${message.username}: ${message.text}`;

    messagesContainer.appendChild(messageElement);
  });
}

async function sendMessage() {
  const username = usernameInput.value.trim();
  const messageText = messageInput.value.trim();

 
  if (username === "") {
    errorMessage.textContent = "Please enter your name.";
    return;
  }

  if (messageText === "") {
    errorMessage.textContent = "Please enter a message.";
    return;
  }

  errorMessage.textContent = "";

  
  const response = await fetch(`${serverUrl}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      text: messageText,
    }),
  });
   if (!response.ok) {
    const error = await response.json();
    errorMessage.textContent = error.error;
    return;
  }

  await getMessages();

  messageInput.value = "";
  usernameInput.value = "";
}

sendButton.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

getMessages();

setInterval(getMessages, 1000);