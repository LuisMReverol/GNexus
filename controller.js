// "start": "webpack serve --open --config webpack.dev.js",
// "build": "webpack --config webpack.prod.js"
import * as model from "./src/js/model.js";
import searchView from "./src/js/views/searchView.js";
import resultsView from "./src/js/views/resultsView.js";
import gameView from "./src/js/views/gameView.js";

const controlGame = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id)

    if (!id) return;

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1) Loading Game
    await model.loadGame(id);
    
    // 2) Rendering Game
    gameView.render(model.state.game);
  } catch (err) {
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
  gameView.addHandlerRender(controlGame);
};

init();
