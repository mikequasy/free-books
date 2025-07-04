document.addEventListener('DOMContentLoaded', () => {
    const ebooksContainer = document.getElementById('ebooks-container');
    const baseURL = "https://github.com/mikequasy/free-books/blob/"; // Your base URL

    function displayErrorMessage(message) {
        ebooksContainer.innerHTML = `<p class="error-message">${message}</p>`;
    }

    fetch('ebooks.json')
        .then(response => {
            if (!response.ok) {
                // Check for HTTP errors
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(ebooks => {
            // Clear the loading message
            ebooksContainer.innerHTML = '';

            if (ebooks.length === 0) {
                ebooksContainer.innerHTML = '<p class="loading-message">No ebooks found.</p>';
                return;
            }

            ebooks.forEach(ebook => {
                const ebookCard = document.createElement('div');
                ebookCard.classList.add('ebook-card');

                // Construct image URL relative to the base URL
                const imageUrl = `${baseURL}${ebook.image}`;

                ebookCard.innerHTML = `
                    <img src="${imageUrl}" alt="${ebook.title} Cover">
                    <div class="ebook-info">
                        <h2>${ebook.title}</h2>
                        <p>${ebook.description}</p>
                        <a href="${ebook.downloadLink}" class="download-button" download>Download Ebook</a>
                    </div>
                `;
                ebooksContainer.appendChild(ebookCard);
            });
        })
        .catch(error => {
            console.error('Error loading ebook data:', error);
            displayErrorMessage(`Failed to load ebooks. Please check the JSON file and your internet connection. Error: ${error.message}`);
        });
});
