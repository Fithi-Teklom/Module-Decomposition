const quoteElement = document.querySelector("#quote");
const button = document.querySelector("#quote-button");

button.addEventListener("click", async () => {
    const response = await fetch("http://127.0.0.1:3000");
    const quote = await response.text();

    quoteElement.textContent = quote;
});