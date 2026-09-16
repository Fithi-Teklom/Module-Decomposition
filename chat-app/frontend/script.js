async function getMessages() {
  const response = await fetch("http://172.17.64.211:3000/messages");

  const messages = await response.json();

  const messagesContainer = document.getElementById("messages");

  messagesContainer.innerHTML = "";

  messages.forEach((message) => {
    const messageElement = document.createElement("p");

    messageElement.textContent = message.text;

    messagesContainer.appendChild(messageElement);
  });
}

getMessages();

const messageInput = document.getElementById("messageInput");

sendButton.addEventListener("click", async () => {
  const messageText = messageInput.value;

  await fetch("http://172.17.64.211:3000/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: messageText,
    }),
  });
  await getMessages();
  messageInput.value = "";
});
setInterval(getMessages, 1000);
