document.addEventListener('DOMContentLoaded', function() {
    const fetchButton = document.getElementById('fetch-book-info');
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const descriptionInput = document.getElementById('description');
    const pagesInput = document.getElementById('pages');
    const coverUrlInput = document.getElementById('coverUrl');
    const searchResults = document.createElement('div');
    searchResults.className = 'search-results';
    titleInput.parentNode.insertBefore(searchResults, titleInput.nextSibling);
    const bookForm = document.getElementById('book-form');
    const addBookButton = document.getElementById('add-book-button');

    let timeoutId;
    let books = [];

    const sampleBooks = [
        {
            title: "Der Herr der Ringe",
            author: "J.R.R. Tolkien",
            description: "Ein episches Fantasy-Abenteuer",
            pages: "1200",
            coverUrl: "https://images-na.ssl-images-amazon.com/images/P/0618640150.01.L.jpg",
            genre: "fantasy",
            rating: 5,
            notes: ""
        },
        {
            title: "Harry Potter und der Stein der Weisen",
            author: "J.K. Rowling",
            description: "Der erste Band der beliebten Fantasy-Reihe",
            pages: "335",
            coverUrl: "https://images-na.ssl-images-amazon.com/images/P/0747532699.01.L.jpg",
            genre: "fantasy",
            rating: 4,
            notes: ""
        },
        {
            title: "1984",
            author: "George Orwell",
            description: "Eine dystopische Vision der Zukunft",
            pages: "328",
            coverUrl: "https://images-na.ssl-images-amazon.com/images/P/0451524934.01.L.jpg",
            genre: "science-fiction",
            rating: 5,
            notes: ""
        },
        {
            title: "Der Alchimist",
            author: "Paulo Coelho",
            description: "Eine spirituelle Reise der Selbstfindung",
            pages: "192",
            coverUrl: "https://images-na.ssl-images-amazon.com/images/P/0061122416.01.L.jpg",
            genre: "fiction",
            rating: 4,
            notes: ""
        },
        {
            title: "Die Verwandlung",
            author: "Franz Kafka",
            description: "Eine surreale Erzählung über Entfremdung",
            pages: "96",
            coverUrl: "https://images-na.ssl-images-amazon.com/images/P/1557427666.01.L.jpg",
            genre: "fiction",
            rating: 5,
            notes: ""
        },
        {
            title: "Der Name der Rose",
            author: "Umberto Eco",
            description: "Ein historischer Kriminalroman",
            pages: "656",
            coverUrl: "https://images-na.ssl-images-amazon.com/images/P/0156001314.01.L.jpg",
            genre: "mystery",
            rating: 4,
            notes: ""
        },
        {
            title: "Eine kurze Geschichte der Zeit",
            author: "Stephen Hawking",
            description: "Eine Einführung in die moderne Physik",
            pages: "272",
            coverUrl: "https://images-na.ssl-images-amazon.com/images/P/0553380168.01.L.jpg",
            genre: "non-fiction",
            rating: 4,
            notes: ""
        },
        {
            title: "Die Säulen der Erde",
            author: "Ken Follett",
            description: "Ein historischer Roman über den Bau einer Kathedrale",
            pages: "1076",
            coverUrl: "https://images-na.ssl-images-amazon.com/images/P/0451166892.01.L.jpg",
            genre: "fiction",
            rating: 5,
            notes: ""
        },
        {
            title: "Der Schatten des Windes",
            author: "Carlos Ruiz Zafón",
            description: "Ein geheimnisvoller Roman im Barcelona der Nachkriegszeit",
            pages: "565",
            coverUrl: "https://images-na.ssl-images-amazon.com/images/P/0143034901.01.L.jpg",
            genre: "mystery",
            rating: 4,
            notes: ""
        },
        {
            title: "Steve Jobs",
            author: "Walter Isaacson",
            description: "Die autorisierte Biografie des Apple-Gründers",
            pages: "656",
            coverUrl: "https://images-na.ssl-images-amazon.com/images/P/1451648537.01.L.jpg",
            genre: "biography",
            rating: 4,
            notes: ""
        },
        {
            title: "Dune",
            author: "Frank Herbert",
            description: "Ein Science-Fiction-Epos",
            pages: "896",
            coverUrl: "https://images-na.ssl-images-amazon.com/images/P/0441172717.01.L.jpg",
            genre: "science-fiction",
            rating: 5,
            notes: ""
        },
        {
            title: "Die Tribute von Panem",
            author: "Suzanne Collins",
            description: "Ein dystopischer Jugendroman",
            pages: "384",
            coverUrl: "https://images-na.ssl-images-amazon.com/images/P/0439023483.01.L.jpg",
            genre: "science-fiction",
            rating: 4,
            notes: ""
        },
        {
            title: "Der Medicus",
            author: "Noah Gordon",
            description: "Ein historischer Roman über einen jungen Arzt",
            pages: "768",
            coverUrl: "https://images-na.ssl-images-amazon.com/images/P/0140620036.01.L.jpg",
            genre: "fiction",
            rating: 5,
            notes: ""
        },
        {
            title: "Das Parfum",
            author: "Patrick Süskind",
            description: "Die Geschichte eines Mörders im Paris des 18. Jahrhunderts",
            pages: "320",
            coverUrl: "https://images-na.ssl-images-amazon.com/images/P/0375725849.01.L.jpg",
            genre: "fiction",
            rating: 4,
            notes: ""
        },
        {
            title: "Die unendliche Geschichte",
            author: "Michael Ende",
            description: "Ein fantastisches Abenteuer",
            pages: "448",
            coverUrl: "https://images-na.ssl-images-amazon.com/images/P/0140386335.01.L.jpg",
            genre: "fantasy",
            rating: 5,
            notes: ""
        },
        {
            title: "Der Hobbit",
            author: "J.R.R. Tolkien",
            description: "Die Vorgeschichte zum Herrn der Ringe",
            pages: "400",
            coverUrl: "https://images-na.ssl-images-amazon.com/images/P/0618260307.01.L.jpg",
            genre: "fantasy",
            rating: 5,
            notes: ""
        },
        {
            title: "Der Da Vinci Code",
            author: "Dan Brown",
            description: "Ein Thriller über religiöse Symbole und Geheimnisse",
            pages: "489",
            coverUrl: "https://images-na.ssl-images-amazon.com/images/P/0307474275.01.L.jpg",
            genre: "mystery",
            rating: 4,
            notes: ""
        },
        {
            title: "Die Physiker",
            author: "Friedrich Dürrenmatt",
            description: "Eine Komödie über Wissenschaft und Verantwortung",
            pages: "112",
            coverUrl: "https://images-na.ssl-images-amazon.com/images/P/0802144276.01.L.jpg",
            genre: "fiction",
            rating: 4,
            notes: ""
        },
        {
            title: "Der kleine Prinz",
            author: "Antoine de Saint-Exupéry",
            description: "Eine poetische Erzählung über Freundschaft",
            pages: "96",
            coverUrl: "https://images-na.ssl-images-amazon.com/images/P/0156012197.01.L.jpg",
            genre: "fiction",
            rating: 5,
            notes: ""
        },
        {
            title: "Das Bildnis des Dorian Gray",
            author: "Oscar Wilde",
            description: "Ein Roman über Schönheit und Moral",
            pages: "272",
            coverUrl: "https://images-na.ssl-images-amazon.com/images/P/0141439574.01.L.jpg",
            genre: "fiction",
            rating: 4,
            notes: ""
        },
        {
            title: "Die Blechtrommel",
            author: "Günter Grass",
            description: "Ein Klassiker der deutschen Nachkriegsliteratur",
            pages: "589",
            coverUrl: "https://images-na.ssl-images-amazon.com/images/P/0679725318.01.L.jpg",
            genre: "fiction",
            rating: 5,
            notes: ""
        },
        {
            title: "Sofies Welt",
            author: "Jostein Gaarder",
            description: "Eine Reise durch die Geschichte der Philosophie",
            pages: "544",
            coverUrl: "https://images-na.ssl-images-amazon.com/images/P/0374530718.01.L.jpg",
            genre: "fiction",
            rating: 4,
            notes: ""
        }
    ];

    // Suche nach Büchern während der Eingabe
    titleInput.addEventListener('input', function() {
        clearTimeout(timeoutId);
        searchResults.innerHTML = '';
        
        if (this.value.length < 2) return;

        timeoutId = setTimeout(async () => {
            try {
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(this.value)}&maxResults=5`);
                const data = await response.json();

                if (data.items) {
                    data.items.forEach(item => {
                        const book = item.volumeInfo;
                        const div = document.createElement('div');
                        div.className = 'search-result-item';
                        
                        div.innerHTML = `
                            <img src="${book.imageLinks?.thumbnail || 'https://via.placeholder.com/40x60?text=No+Cover'}" 
                                 alt="${book.title} von ${book.authors?.[0] || 'Unbekannter Autor'}" 
                                 title="${book.title} von ${book.authors?.[0] || 'Unbekannter Autor'}"
                                 class="search-result-cover">
                        `;

                        div.addEventListener('click', () => {
                            titleInput.value = book.title;
                            authorInput.value = book.authors?.[0] || '';
                            coverUrlInput.value = book.imageLinks?.thumbnail?.replace('http:', 'https:') || '';
                            searchResults.innerHTML = '';
                        });

                        searchResults.appendChild(div);
                    });
                }
            } catch (error) {
                console.error('Fehler bei der Suche:', error);
            }
        }, 300);
    });

    // Verstecke Suchergebnisse wenn außerhalb geklickt wird
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-results') && !e.target.closest('#title')) {
            searchResults.innerHTML = '';
        }
    });

    fetchButton.addEventListener('click', async function() {
        const title = titleInput.value;
        if (!title) {
            alert('Bitte geben Sie einen Buchtitel ein');
            return;
        }

        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}`);
            const data = await response.json();

            if (data.items && data.items[0]) {
                const book = data.items[0].volumeInfo;
                
                if (book.authors) {
                    authorInput.value = book.authors[0];
                }
                if (book.description) {
                    descriptionInput.value = book.description;
                }
                if (book.pageCount) {
                    pagesInput.value = book.pageCount;
                }
                if (book.imageLinks && book.imageLinks.thumbnail) {
                    coverUrlInput.value = book.imageLinks.thumbnail.replace('http:', 'https:');
                }
            } else {
                alert('Keine Buchinformationen gefunden');
            }
        } catch (error) {
            console.error('Fehler beim Abrufen der Buchinformationen:', error);
            alert('Fehler beim Abrufen der Buchinformationen');
        }
    });

    // Event-Listener für den Button zum Hinzufügen eines neuen Buches
    addBookButton.addEventListener('click', function() {
        bookForm.style.display = bookForm.style.display === 'none' ? 'block' : 'none';
    });

    // Lade Bücher aus localStorage
    const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
    storedBooks.forEach(book => {
        books.push(book);
        displayBook(book);
    });

    // Event-Listener für das Formular
    document.getElementById('book-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const book = {
            title: titleInput.value,
            author: authorInput.value,
            coverUrl: coverUrlInput.value || 'https://via.placeholder.com/300x400?text=Kein+Cover',
            description: '',  // Leerer String statt Formulareingabe
            pages: '',       // Leerer String statt Formulareingabe
            genre: 'others', // Standardwert statt Formulareingabe
            rating: 0,
            notes: ''
        };

        books.push(book);
        displayBook(book);
        this.reset();

        // Speichere die Bücher im localStorage
        localStorage.setItem('books', JSON.stringify(books));
    });

    // Funktion zum Anzeigen eines Buches
    function displayBook(book) {
        const bookList = document.getElementById('book-list');
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        
        bookCard.innerHTML = `
            <div class="content-wrapper">
                <img src="${book.coverUrl || 'https://via.placeholder.com/300x400?text=Kein+Cover'}" 
                     alt="Cover von ${book.title}">
                <h3>${book.title}</h3>
                <button class="delete-btn" onclick="deleteBook(this, book)">Löschen</button>
                <div class="author">von ${book.author}</div>
                <div class="rating-container">
                    <label>Bewertung:</label>
                    <div class="star-rating">
                        <span class="star" data-rating="1">★</span>
                        <span class="star" data-rating="2">★</span>
                        <span class="star" data-rating="3">★</span>
                        <span class="star" data-rating="4">★</span>
                        <span class="star" data-rating="5">★</span>
                    </div>
                </div>
                <div class="description">${book.description || 'Keine Beschreibung verfügbar'}</div>
                <div class="details">
                    <p>Seiten: ${book.pages || 'Unbekannt'}</p>
                    <div class="genre-container">
                        <label for="genre-edit">Genre:</label>
                        <select class="genre-edit">
                            <option value="fiction" ${book.genre === 'fiction' ? 'selected' : ''}>Fiktion</option>
                            <option value="non-fiction" ${book.genre === 'non-fiction' ? 'selected' : ''}>Sachbuch</option>
                            <option value="fantasy" ${book.genre === 'fantasy' ? 'selected' : ''}>Fantasy</option>
                            <option value="biography" ${book.genre === 'biography' ? 'selected' : ''}>Biografie</option>
                            <option value="science-fiction" ${book.genre === 'science-fiction' ? 'selected' : ''}>Science Fiction</option>
                            <option value="mystery" ${book.genre === 'mystery' ? 'selected' : ''}>Krimi</option>
                            <option value="others" ${book.genre === 'others' ? 'selected' : ''}>Andere</option>
                        </select>
                    </div>
                </div>
                <div class="notes-container">
                    <label>Meine Notizen:</label>
                    <textarea class="notes-edit">${book.notes || ''}</textarea>
                </div>
            </div>
        `;

        // Sternebewertung Handler
        setupStarRating(bookCard, book);
        
        // Genre-Änderung Handler
        setupGenreEdit(bookCard, book);
        
        // Notizen Handler
        setupNotesEdit(bookCard, book);
        
        // Click Handler für Expand/Collapse
        bookCard.addEventListener('click', function(e) {
            if (!e.target.closest('.notes-edit') && 
                !e.target.closest('.delete-btn') && 
                !e.target.closest('.genre-edit') &&
                !e.target.closest('.star-rating')) {
                document.querySelectorAll('.book-card.expanded').forEach(card => {
                    if (card !== this) card.classList.remove('expanded');
                });
                this.classList.toggle('expanded');
            }
        });
        
        // Füge das neue Buch am Anfang der Liste ein
        bookList.insertBefore(bookCard, bookList.firstChild);
        updateStats();

        // Swipe-Event hinzufügen
        let startX;
        bookCard.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        bookCard.addEventListener('touchmove', (e) => {
            const currentX = e.touches[0].clientX;
            const diffX = startX - currentX;

            // Wenn nach links gewischt wird
            if (diffX > 50) {
                const confirmDelete = confirm("Möchten Sie dieses Buch wirklich löschen?");
                if (confirmDelete) {
                    bookCard.remove();
                    const index = books.indexOf(book);
                    if (index > -1) {
                        books.splice(index, 1);
                    }
                    updateStats();
                }
            }
        });
    }

    // Hilfsfunktionen für die Event Handler
    function setupStarRating(bookCard, book) {
        const stars = bookCard.querySelectorAll('.star');
        const starRating = bookCard.querySelector('.star-rating');
        
        function updateStars(rating) {
            stars.forEach(star => {
                const starRating = parseInt(star.dataset.rating);
                star.classList.toggle('active', starRating <= rating);
            });
            book.rating = rating;
        }
        
        updateStars(book.rating || 0);
        
        starRating.addEventListener('click', (e) => {
            if (e.target.classList.contains('star')) {
                e.stopPropagation();
                updateStars(parseInt(e.target.dataset.rating));
            }
        });
        
        starRating.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('star')) {
                const rating = parseInt(e.target.dataset.rating);
                stars.forEach(star => {
                    const starRating = parseInt(star.dataset.rating);
                    star.classList.toggle('hover', starRating <= rating);
                });
            }
        });
        
        starRating.addEventListener('mouseout', () => {
            stars.forEach(star => star.classList.remove('hover'));
            updateStars(book.rating || 0);
        });
    }

    function setupGenreEdit(bookCard, book) {
        const genreSelect = bookCard.querySelector('.genre-edit');
        genreSelect.addEventListener('change', (e) => {
            e.stopPropagation();
            book.genre = e.target.value;
            updateStats();
        });
    }

    function setupNotesEdit(bookCard, book) {
        const notesEdit = bookCard.querySelector('.notes-edit');
        notesEdit.addEventListener('input', (e) => {
            e.stopPropagation();
            book.notes = e.target.value;
        });
    }

    // Suche in den angezeigten Büchern
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const bookCards = document.querySelectorAll('.book-card');
        
        bookCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const author = card.querySelector('.author').textContent.toLowerCase();
            const matches = title.includes(searchTerm) || author.includes(searchTerm);
            card.style.display = matches ? '' : 'none';
        });
    });

    // Genre-Filter
    const filterGenre = document.getElementById('filter-genre');
    filterGenre.addEventListener('change', function() {
        const selectedGenre = this.value;
        const bookCards = document.querySelectorAll('.book-card');
        
        bookCards.forEach(card => {
            const genreSelect = card.querySelector('.genre-edit');
            const bookGenre = genreSelect.value;
            
            if (selectedGenre === 'all' || selectedGenre === bookGenre) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });

    const statsSection = document.getElementById('stats');
    const toggleStatsButton = document.getElementById('toggle-stats-button');

    // Event-Listener für den Button zum Anzeigen der Statistiken
    toggleStatsButton.addEventListener('click', function() {
        statsSection.style.display = statsSection.style.display === 'none' ? 'block' : 'none';
    });

    // Löschen-Funktion
    window.deleteBook = function(button, book) {
        const card = button.closest('.book-card');
        if (card) {
            card.remove(); // Sofortiges Löschen ohne Bestätigung
            const index = books.indexOf(book);
            if (index > -1) {
                books.splice(index, 1);
            }
            updateStats();

            // Aktualisiere den localStorage
            localStorage.setItem('books', JSON.stringify(books));
        }
    };
});

// Globale Funktionen
function updateStats() {
    const books = Array.from(document.querySelectorAll('.book-card')).map(card => {
        const genreSelect = card.querySelector('.genre-edit');
        return { genre: genreSelect ? genreSelect.value : 'others' };
    });

    document.getElementById('total-books').textContent = `Gesamtanzahl der Bücher: ${books.length}`;

    const genreCounts = books.reduce((counts, book) => {
        counts[book.genre] = (counts[book.genre] || 0) + 1;
        return counts;
    }, {});

    Object.keys(genreCounts).forEach(genre => {
        const element = document.getElementById(`${genre}-count`);
        if (element) {
            element.textContent = genreCounts[genre] || 0;
        }
    });
}
