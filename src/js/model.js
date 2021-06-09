import { API_URL, RES_PER_PAGE, KEY } from "./config.js";
import axios from "axios";

export const state = {
  game: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

const createGameObject = function (data) {
  const  game  = data.data;
  return {
    id: game.id,
    name: game.name,
    image: game.background_image,
    date: game.released,
    description: game.description,
  };
};

export const loadGame = async function (id) {
  try {
    const data = await axios.get(`${API_URL}/${id}?&key=${KEY}`);
    state.game = createGameObject(data);

    console.log(state.game);
  } catch (err) {
    console.error(`${err}`);
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await axios.get(`${API_URL}?search=${query}&key=${KEY}`);
    console.log(data);

    state.search.results = data.data.results.map((rec) => {
      return {
        id: rec.id,
        name: rec.name,
        rdate: rec.released,
        image: rec.background_image,
      };
    });
    console.log(state.search.results);
  } catch (err) {
    console.error(`${err}`);
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; //0
  const end = page * state.search.resultsPerPage; //9

  return state.search.results.slice(start, end);
};
