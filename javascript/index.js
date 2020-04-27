import { Search } from './search.js';
import { WordSearch } from './wordsearch.js';
import { SearchHistory } from './searchhistory.js';
import { searchUrl, trendingUrl, apiKey, format, searchWordPrefix } from './config.js';




/**
 * 
 * uses WordSearch class object to fetch gifs from url 
 * and then displayes found gifs 
 * 
 * @param {SearchHistory} searchHistory used to save new word to localstorage
 */
async function searchGif(searchHistory) {
    const word = document.getElementsByClassName("search-word")[0].value;
    const search = new WordSearch(searchUrl + apiKey + format + searchWordPrefix, word);
    const searchRes = await search.search();
    if (searchRes) {
        searchHistory.save(word);
        search.displayFoundObjects(searchRes, "gif-items", "gif-item", "gif-rating")
    }

}

/**
 * uses Search class object to fetch trending gifs from url
 * and displayes found gifs
 */

async function trendingGif() {
    const search = new Search(trendingUrl + apiKey + "&fmt=json&limit=10");
    const searchRes = await search.search();
    search.displayFoundObjects(searchRes, "gif-items", "gif-item", "gif-rating")
}



//display already searched names
const searchHistory = new SearchHistory();
searchHistory.displaySearchHistory();

// add event listener to trending button
const trending = document.getElementById("trending");
trending.addEventListener("click", () => { trendingGif() });


//add event listener to search button
const submit = document.getElementById("search");
submit.addEventListener("click", () => { searchGif(searchHistory) });