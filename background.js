// Array to cache previously loaded images
const loadedImages = [];

fetch("https://api.quotable.io/random")
    .then(response => response.json())
    .then(data => {
        var quoteElem = document.getElementById("quote");
        quoteElem.textContent = data.content;
    })
    .catch(error => console.error(error));

async function getUnsplashImage() {
    const query = 'nature';
    const perPage = 30; 
    const page = Math.floor(Math.random() * 10) + 1; 

    const url = `https://source.unsplash.com/random/?${query}&per_page=${perPage}&page=${page}`;
    if (loadedImages.includes(url)) {
        return url;
    }

    const response = await fetch(url);
    loadedImages.push(url);

    return response.url;
}

async function setRandomBackgroundImage() {
    const imageUrl = await getUnsplashImage();
    const bodyElem = document.body;
    bodyElem.style.transition = 'background-image 1s ease-in-out';
    bodyElem.style.backgroundImage = `url(${imageUrl})`;
    bodyElem.style.position = 'relative';
    bodyElem.style.overflow = 'hidden';

    const overlayElem = document.createElement('div');
    overlayElem.classList.add('overlay');
    bodyElem.appendChild(overlayElem);
}

setRandomBackgroundImage();