const apiValues = {
    url: 'http://www.omdbapi.com/?',
    key: 'f155c772',
    search: 'star+wars',
    page: 1,
}

const generateApiUrl = () => {
    return `${apiValues.url}apikey=${apiValues.key}&s=${apiValues.search}`
}

const getContent = () => {
    console.log(generateApiUrl());
    fetch(generateApiUrl())
        .then(function (response) {
            return response.json();
        })
        .then(function (content) {
            displayContent(content);
        })
        .catch(error => {
            console.log("unable to get content");
        });
}

const displayContent = (content) => {
    const container = document.querySelector('.movies');
    content.Search.forEach((item, index) => {
        const markup = `
        <div class="movie">
            <div class="movie__image">
                <img class="image" src="${content.Search[index].Poster}">
            </div>
            <p class="movie__title">${content.Search[index].Title}</p>
            <p class="movie__year">${content.Search[index].Year}</p>
        </div>
        `;
        container.innerHTML += markup;
    })
}

const searchMovies = document.querySelector('.search-form')
searchMovies.addEventListener("submit", event => {
    event.preventDefault();
    console.log((document.querySelector(".search-input").value));
    apiValues.search = (document.querySelector(".search-input").value)
    getContent();
})

getContent();