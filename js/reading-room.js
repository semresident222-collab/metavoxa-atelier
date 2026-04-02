document.addEventListener('DOMContentLoaded', () => {
    renderShelves();
    setupFilters();
});

function renderShelves(filter = 'all') {
    const container = document.getElementById('shelves');
    container.innerHTML = '';
    
    libraryData.forEach(theme => {
        const shelf = document.createElement('div');
        shelf.className = 'floating-shelf';
        shelf.innerHTML = `
            <div class="shelf-header">
                <h2>${theme.theme}</h2>
                <p class="shelf-desc">${theme.description}</p>
            </div>
            <div class="books-row">
                ${theme.books
                    .filter(book => filter === 'all' || book.category === filter)
                    .map(book => createBookCard(book))
                    .join('')}
            </div>
        `;
        container.appendChild(shelf);
    });
}

function createBookCard(book) {
    const isClickable = book.category === 'research' || book.category === 'essays';
    const tag = book.category === 'books' ? '📖' : book.category === 'research' ? '🔬' : '✍️';
    
    return `
        <div class="book-spine ${book.category}" ${isClickable && book.url ? `onclick="window.open('${book.url}', '_blank')"` : ''}>
            <div class="book-cover" style="background-image: url('${book.cover}')"></div>
            <div class="book-info">
                <span class="category-tag">${tag}</span>
                <h3>${book.title}</h3>
                <p class="author">${book.author}, ${book.year}</p>
                <p class="reader-note">"${book.readerNote}"</p>
                <p class="recommended-by">— ${book.recommendedBy}</p>
                ${isClickable && book.url ? '<span class="click-hint">Click to read →</span>' : '<span class="click-hint">Find at your library</span>'}
            </div>
        </div>
    `;
}

function setupFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            buttons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderShelves(e.target.dataset.filter);
        });
    });
}
