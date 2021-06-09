import View from "./Views.js";

class GameView extends View {
  _parentElement = document.querySelector(".game");
  _message = "";

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  _generateMarkup() {
    return `
        <figure class="game__fig">
        <img src="${this._data.image}" alt="${this._data.name}" class="game__img" />
        <h1 class="game__title">
          <span>${this._data.name}</span>
        </h1>
      </figure>
      <div class= "game__des-container">
      <div class= "game__description">
        ${this._data.description}
      </div>

      <div class="game__details">
        <div class="game__info">
          <svg class="game__info-icon">\
            <use href="./assets/icons/icons.svg#icon-profile"></use>
          </svg>
          <span class="game__info-data game__info-data--year">${this._data.date}</span>
        </div>

      </div> 
        `;
  }
}

export default new GameView();
