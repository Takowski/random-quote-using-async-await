const loader = document.createElement('div');
loader.textContent = 'Loading...';
document.body.appendChild(loader);

const quoteBtn = document.createElement('button');
quoteBtn.textContent = 'Generate Random Quote';
document.body.appendChild(quoteBtn);

const quoteContainer = document.createElement('div');
document.body.appendChild(quoteContainer);

async function fetchQuote() {
    try {
        const response = await fetch('https://thatsthespir.it/api');
        if (!response.ok) {
            throw new Error('Failed to fetch quote');
        }
        const data = await response.json();
        const quoteHtml = `
            <div>
                <img src="${data.photo}" alt="${data.author}">
                <p>${data.quote}</p>
                <p>- ${data.author}</p>
                <p> Total quotes${data.total_quotes}</p>
            </div>
        `;
        quoteContainer.innerHTML = quoteHtml;
    } catch (error) {
        console.error(error);
        quoteContainer.textContent = 'Failed to fetch quote';
    } finally {
        loader.remove();
    }
}

quoteBtn.addEventListener('click', fetchQuote);
window.addEventListener('load', fetchQuote);