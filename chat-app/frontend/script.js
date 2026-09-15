async function getMessages() {
  const response = await fetch("http://172.17.64.211:3000/messages");

  const messages = await response.json();

  console.log(messages);
}

getMessages();