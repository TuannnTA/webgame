fetch('gamesList.json')
  .then(res => res.json())
  .then(gameIds => {
    const gameListContainer = document.getElementById('game-list');
    gameListContainer.innerHTML = '';

    // Dùng Promise.all để đợi tất cả fetch xong
    return Promise.all(
      gameIds.map(id =>
        fetch(`game/${id}/data.json`)
          .then(res => res.json())
          .then(game => ({ id, ...game }))
          .catch(() => null) // Nếu lỗi thì trả null
      )
    ).then(games => {
      games
        .filter(game => game) // bỏ những cái fetch lỗi
        .forEach(game => {
          const card = document.createElement('div');
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
          gameListContainer.appendChild(card);
        });
    });
  });
