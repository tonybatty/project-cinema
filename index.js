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
    console.log(content);
    const movieItems = document.querySelectorAll('.movies-item')
    console.log("******" + content.Search[0].Poster);

    movieItems.forEach((item, index) => {
        const image = item.querySelector('.image');
        image.src = content.Search[index].Poster;
        
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