import { WordSearch } from './wordsearch.js';
import { searchUrl, trendingUrl, apiKey, format, searchWordPrefix } from './config.js';



/**
 * class that is responsible for saving and 
 * displaying searched words 
 */
export class SearchHistory {
    constructor() {
        // default values for search history
        this._defaultValues = ["Internet Cats", "Meme's", "Typing", "Space", "Rick and Morty"];
    }

    /**
     * saves given word to localStorage and adds new search element 
     * to dom
     * @param {string} key word that we want to save in localStorage
     */
    save(key) {
        const currentElement = localStorage.getItem(key);
        if (!currentElement && !this._defaultValues.includes(key)) {
            localStorage.setItem(key, key);
            this._update(key);
        }
    }
    /**
     * removes all saved words from localStorage
     */
    clear() {
        localStorage.clear;
        this.displaySearchHistory();
    }


    /**
     * function that displayes to dom default words 
     * and all the word from localStorage 
     */
    displaySearchHistory() {
        const parent = document.getElementsByClassName("history-items")[0];
        this._displayDefaultValues(parent);
        this._displaySearchedValues(parent);
    }


    /**
     * remove button element's listener function
     * @param {*} event 
     * @param {*} grandParent element from which we want to remove children
     * @param {*} word used to remove key value pair from localStorage
     */
    _removeFunction(event, grandParent, word) {
        grandParent.removeChild(event.currentTarget.parentNode);
        localStorage.removeItem(word);
        const gifItems = document.getElementsByClassName("gif-items")[0];
        gifItems.textContent = "";
    }


    /**
     * responssible for creating and adding new history item to dom
     * @param {string} key word that was searched
     */
    _update(key) {
        const parent = document.getElementsByClassName("history-items")[0];
        const currElem = this._createHistoryItem(key, parent);
        parent.appendChild(currElem);
    }


    /**
     * displays all words saved in localStorage
     */
    _displaySearchedValues() {
        const items = { ...localStorage };
        for (let property in items) {
            this._update(property);
        }
    }

    /**
     * displayes default values of search history
     */
    _displayDefaultValues() {

        for (const word of this._defaultValues) {
            this._update(word);
        }
    }

    /**
     * function we want to call when clicked on history-button
     * @param {string} name key word that is used to fetch corresponding data
     */
    async _findGifs(name) {
        const search = new WordSearch(searchUrl + apiKey + format + searchWordPrefix, name);
        const searchRes = await search.search();
        search.displayFoundObjects(searchRes, "gif-items", "gif-item", "gif-rating")
    }

    /**
     * 
     * @param {string} word used to create new search history element
     * @param {*} parent created history item is added to parent
     */
    _createHistoryItem(word, parent) {
        const historyItem = document.createElement("div");
        historyItem.className = "history-item";
        const searchedItem = this._createSearchedItem(word);
        // add event listener to searched item
        searchedItem.addEventListener("click", () => { this._findGifs(word) });
        const removeButton = this._createRemoveButton();
        // add event listener for remove button
        removeButton.addEventListener("click", (event) => { this._removeFunction(event, parent, word) });
        historyItem.appendChild(searchedItem);
        historyItem.appendChild(removeButton);
        return historyItem;
    }
    /**
     * creates new button for given word
     * @param {*} word 
     */
    _createSearchedItem(word) {
        const searchedItem = document.createElement("button");
        searchedItem.className = "button history-button";
        searchedItem.innerHTML = word;
        return searchedItem;
    }
    /**
     * creates remove button
     */
    _createRemoveButton() {
        const removeButton = document.createElement("button");
        removeButton.className = "remove-button";
        removeButton.innerHTML = 'x';
        return removeButton;
    }

}