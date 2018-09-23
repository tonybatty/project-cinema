const container = document.querySelector('.container');
const apiValues = {
    url: 'http://www.omdbapi.com/?',
    key: 'f155c772',
    search: 'star+wars',
    searchResults: true,
    page: 1,
    imdbId: '',
}

const generateApiUrl = () => {
    if (apiValues.searchResults === true) {
        return `${apiValues.url}apikey=${apiValues.key}&s=${apiValues.search}*`
    } else {
        console.log("not search results");
        return `${apiValues.url}apikey=${apiValues.key}&i=${apiValues.imdbId}&plot=Full`
    }
}

const getContent = () => {
    console.log(generateApiUrl());

    fetch(generateApiUrl())
        .then(function (response) {
            return response.json();
        })
        .then(function (content) {
            displayContent(content);
            console.log(content);
        })
        .catch(error => {
            displayErrortoUser("unable to get content");
        });

    displayErrorToUser = (errorMessage) => {
        container.innerHTML = `<h4>${errorMessage}<h4>`
    }
}

const displayContent = (content) => {
    console.log(content);
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
        console.log("*****");
        generatedHtml = `
        <div class="movie-info-main" id="">
            <div class="movie-info-main-left">
                <img class="movie-info-main-left__image" src="${content.Poster}">
            </div>
            <div class="movie-info-main-right">
                <h2 class="movie-info-top__title">${content.Title}<span class="movie-info__year"> (${content.Year})</span></h2>
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

const searchMovies = document.querySelector('.search-form')
searchMovies.addEventListener("submit", event => {
    event.preventDefault();
    apiValues.search = (document.querySelector(".search-input").value).replace(/\s+/g, '*+');
    apiValues.searchResults = true;
    console.log(apiValues.search);
    container.innerHTML = "";
    getContent();
})

document.addEventListener("click", function (event) {
    if (event.target.parentNode.parentNode.className === 'movie') {
        event.preventDefault();
        apiValues.imdbId = event.target.parentNode.parentNode.id;
        apiValues.searchResults = false;
        getContent();
    }

});

// getContent();

