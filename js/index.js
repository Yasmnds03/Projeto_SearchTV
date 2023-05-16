const API_URL = "https://api.tvmaze.com/search/shows?";
const $ = document.getElementById.bind(document);

const toggleFavorite = (id) => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const index = favorites.indexOf(id);

  if (index === -1) {
    favorites.push(id);
  } else {
    favorites.splice(index, 1);
  }

  const starImage = document.querySelector(`.star-${id}`);

  if (starImage.src.endsWith("empty_star.png")) {
    starImage.src = "img/yellow_star.png";
  } else if (starImage.src.endsWith("yellow_star.png")) {
    starImage.src = "img/empty_star.png";
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
};

const isFavorite = (id) => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  return favorites.includes(id);
};

window.onload = () => {
  const shows = JSON.parse(localStorage.getItem("shows"));
  if (shows.length !== 0) {
    shows.forEach((item) => {
      const image = item.show.image;

      const formatedShow = {
        id: item.show.id,
        name: item.show.name,
        imageUrl: image ? image.medium : "/img/noimage.png",
      };

      printCard(formatedShow);
    });
  }
};

const searchShows = (event) => {
  localStorage.removeItem("shows");

  event.preventDefault();

  const query = $("query").value;

  if (query.trim()) {
    $("not-found-message").style.display = "none";

    const loadingAnimation = `
        <img src="/img/loading.gif" alt="Procurando...">
    `;
    $("shows-area").innerHTML = loadingAnimation;

    fetch(API_URL + new URLSearchParams({ q: query })).then((response) =>
      response.json().then((results) => {
        $("shows-area").innerHTML = "";

        if (results.length === 0) {
          console.log("Nenhum resultado");
          $("not-found-message").style.display = "block";
          return;
        }

        localStorage.setItem("shows", JSON.stringify(results));

        results.forEach((r) => {
          const { show } = r;
          const { id, name, image } = show;

          const imageUrl = image ? image.medium : "/img/noimage.png";

          const newShow = {
            id,
            name,
            imageUrl,
          };

          printCard(newShow);
        });
      })
    );
  }
};

const printCard = (show) => {
  const posterId = `poster-${show.id}`;
  const titleId = `title-${show.id}`;

  const showCard = `
        <div class="show-card">
          <a href="/details.html?id=${show.id}">
            <img id="${posterId}" src="${show.imageUrl}" alt="${show.name}">
          </a>

          <a href="/details.html?id=${show.id}">
            <h3 id="${titleId}">${show.name}</h3>
          </a>
		  <button" onclick="toggleFavorite(${show.id})">
		  	<img class="star-${show.id}" src="${
    isFavorite(show.id) ? "img/yellow_star.png" : "img/empty_star.png"
  }" style="height: 30px; width: 30px;" />
		  </button>
          </div>
          
    `;

  const showsArea = $("shows-area");
  showsArea.insertAdjacentHTML("beforeend", showCard);
};
