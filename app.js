const accessKey = 'KzPPxxPzrKMfUFmz_T2u6zyLWXbHKEGk2nPU8Rdwy20';
const searchForm = document.querySelector('form');
const imagesContainer = document.querySelector('.images-container');
const searchInput = document.querySelector('.search-input');
const loadMoreBtn = document.querySelector('.loadMoreBtn');

let page = 1;

const fetchImages = async (query, pageNo) => {
    try {
    if (pageNo === 1) {
        imagesContainer.innerHTML = '';
    }

    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length > 0) {
        data.results.forEach(photo => {
            const imgElement = document.createElement('div');
            imgElement.classList.add('imageDiv');
            imgElement.innerHTML = `<img src = "${photo.urls.regular}">`;

            // Creating overlay
            const overlayElement = document.createElement('div');
            overlayElement.classList.add('overlay');

            // overlay text
            const overlayText = document.createElement('h3');
            overlayText.innerText = `${photo.alt_description}`;
            imgElement.appendChild(overlayElement);
            overlayElement.appendChild(overlayText);

            imagesContainer.appendChild(imgElement);
        });
        if (data.total_pages === pageNo) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    } else {
        imagesContainer.innerHTML = `<h2>No image found.</h2>`;
        if (loadMoreBtn.style.display === 'block') {
            loadMoreBtn.style.display = 'none';
        }
    }
} catch(error) {
    imagesContainer.innerHTML = `<h2>Failed to fetch images. Please try again later.</h2>`
}

}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputText = searchInput.value.trim();

    if(inputText !== '') {
        page = 1;
        fetchImages(inputText, page);
    } else {
        imagesContainer.innerHTML = `<h2>Please enter a search query.</h2>`;
        if (loadMoreBtn.style.display === 'block') {
            loadMoreBtn.style.display = 'none';
        }
    }
});

// load more button functionality
loadMoreBtn.addEventListener('click', () => {
    // e.preventDefault();
    fetchImages(searchInput.value.trim(), ++page);
});