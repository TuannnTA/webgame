const searchInput = document.getElementById("searchInput");
const container = document.getElementById("game-list");

// Lấy danh sách game
const gameList = await fetch("gamesList.json").then((res) => res.json());

// Tải từng game từ data.json
const games = await Promise.all(
  gameList.map(async (id) => {
    try {
      const res = await fetch(`game/${id}/data.json`);
      const data = await res.json();
      return { ...data, id };
    } catch (err) {
      console.warn(`Không thể tải game "${id}"`, err);
      return null;
    }
  })
);

function renderGames(filter = "") {
  container.innerHTML = "";
  games
    .filter((game) => game && game.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach((game) => {
      const card = document.createElement("div");
      card.className = "bg-white shadow rounded overflow-hidden hover:shadow-lg transition";
      card.innerHTML = `
        <a href="game/${game.id}/index.html">
          <img src="${game.img}" alt="${game.name}" class="w-full h-48 object-cover">
          <div class="p-4">
            <h2 class="text-lg font-semibold">${game.name}</h2>
            <p class="text-sm text-gray-600 mt-1">${game.desc}</p>
          </div>
        </a>
      `;
      container.appendChild(card);
    });
}

renderGames();
searchInput.addEventListener("input", (e) => renderGames(e.target.value));
