const container = document.querySelector('.container');

// Stores values to generate API URL
const apiValues = {
    url: 'http://www.omdbapi.com/?',
    key: 'f155c772',
    search: 'star+wars',
    searchResults: true,
    page: 1,
    imdbId: '',
}

// Generates the API URL from apiValues
const generateApiUrl = () => {
    if (apiValues.searchResults === true) {
        return `${apiValues.url}apikey=${apiValues.key}&s=${apiValues.search}*`
    } else {
        return `${apiValues.url}apikey=${apiValues.key}&i=${apiValues.imdbId}&plot=Full`
    }
}

// fetches content from API then calls displayContent to display on page
const getContent = () => {

    fetch(generateApiUrl())
        .then(function (response) {
            return response.json();
        })
        .then(function (content) {
            displayContent(content);
        })
        .catch(error => {
            displayErrortoUser("unable to get content");
        });

    displayErrorToUser = (errorMessage) => {
        container.innerHTML = `<h4>${errorMessage}<h4>`
    }
}

// Generates HTML with the content fetched from the API and displays it on the page
const displayContent = (content) => {
    let generatedHtml = '';
    if (apiValues.searchResults === true) {
        content.Search.forEach((item, index) => {
            let markup = `
        <a class="movie" id="${content.Search[index].imdbID}" href="#">
            <div class="movie__image">
                <img class="image" src="${content.Search[index].Poster}">
            </div>
            <div class="movie__info">
                <p class="movie__title">${content.Search[index].Title}</p>
                <p class="movie__year">${content.Search[index].Year}</p>
            </div>
        </a>
        `;
            generatedHtml += markup;
        })
    } else {
        generatedHtml = `
        <div class="movie-info-main" id="${content.imdbID}">
            <div class="movie-info-main-left">
                <img class="movie-info-main-left__image" src="${content.Poster}">
            </div>
            <div class="movie-info-main-right">
                <div class="movie-info-top__title" id="${content.Title}">
                    <h2>${content.Title}&nbsp;<span class="movie-info__year">(${content.Year})</span></h2>
                    <a href="#">
                        <img class="favorite" data-movie-id="${content.imdbID}" src="images/favorite.png">
                    </a>
                </div>
                <h3 class="movie-info-top__rating">${content.Rated} - ${content.Genre} - ${content.Runtime}</h3>
                <div class="movie-info-ratings">
                    <div class="movie-info-ratings__left">
                        <p>${content.Ratings[0].Value}</p>
                        <h3>${content.Ratings[0].Source}</h3>
                    </div>
                    <div class="movie-info-ratings__middle">
                        <p>${content.Ratings[1].Value}</p>
                        <h3>${content.Ratings[1].Source}</h3>
                    </div>
                    <div class="movie-info-ratings__right">
                        <p>${content.Ratings[2].Value}</p>
                        <h3>${content.Ratings[2].Source}</h3>
                    </div>
                </div>
                <p class="movie-info-main__plot">${content.Plot}</p>
                
            </div>
        </div>
        <div class="movie-info-bottom">
            <p class="movie-info-bottom__plot">${content.Plot}</p>
            <h4 class>Release Date</h4>
            <p class="movie-info-bottom__release-date">${content.Released}</p>
            <h4 class>Director</h4>
            <p class="movie-info-bottom__director">${content.Director}</p>
            <h4 class>Main Cast</h4>
            <p class="movie-info-bottom__release-date">${content.Actors}</p>
            <h4 class>Box Office</h4>
            <p class="movie-info-bottom__release-date">${content.BoxOffice}</p>
        </div>
        `;
    }
    container.innerHTML = generatedHtml;
}

// Displays favorites menu with favorites saved in local storage
const displayFavorites = () => {
    const dropdownMenu = document.querySelector('.dropdown-content');
    dropdownMenu.innerHTML = `<a class="favorites-title">Favorites</a>`;
    for (let i = 0; i < localStorage.length; ++i) {
        let favId = localStorage.key(i);
        let favName = localStorage.getItem(localStorage.key(i));
        dropdownMenu.innerHTML += `
        <div class="favorite-row">
            <a href="#">${favName}</a>
            <a class="delete-btn" id="${favId}" href="#">
                <img src="images/delete.png">
            </a>
        </div>
        `;
    }
}

// Event listener for search form
const searchMovies = document.querySelector('.header-container__search')
searchMovies.addEventListener("submit", event => {
    event.preventDefault();
    apiValues.search = (document.querySelector(".search-input").value).replace(/\s+/g, '*+');
    apiValues.searchResults = true;
    container.innerHTML = "";
    getContent();
})

// Event listeners for movies and favourites
document.addEventListener("click", function (event) {
    if (event.target.parentNode.parentNode.className === 'movie') {
        event.preventDefault();
        apiValues.imdbId = event.target.parentNode.parentNode.id;
        apiValues.searchResults = false;
        getContent();
    }

    if (event.target.className === 'favorite') {
        const movieId = event.target.dataset.movieId;
        const movieName = event.target.parentNode.parentNode.id;
        localStorage.setItem(movieId, movieName);
    }

    if (event.target.className === 'favorites-folder') {
        displayFavorites();
    }

    if (event.target.parentNode.className === 'delete-btn') {
        localStorage.removeItem(event.target.parentNode.id);
        displayFavorites();
    }

});

// Toggles favorites menu to display when favourites button clicked
const favoritesButton = document.querySelector(".favorites-button");
const dropdownContent = document.querySelector(".dropdown-content")
favoritesButton.addEventListener("click", function(event) {
    if (dropdownContent.style.display === "none") {
        dropdownContent.style.display = "block";
    } else {
        dropdownContent.style.display = "none";
    }
})

