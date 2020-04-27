import { Search } from "./search.js";


/**
 * extends Search class 
 * searches given word 
 */
class WordSearch extends Search {
    constructor(url, word) {
        super(url);
        this.word = word;
    }

    async search() {
        if (this.word) {
            const responce = await fetch(this.url + this.word);
            const searchResult = await responce.json();
            return searchResult.data;
        }
        return null;
    }


}

export { WordSearch };